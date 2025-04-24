import {
  Autocomplete,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { FC, useEffect, useMemo, useState, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI } from "src/api";
import { groupAPI } from "src/api/group.api";
import { useFriendList } from "src/contexts/FriendContext";
import { useGroupList } from "src/contexts/GroupContext";
import { CreateGroupDto } from "src/types/api/dto";
import { FriendResponse } from "src/types/api/response/friend";
import { LanguageContext } from "src/language/LanguageProvider";
import { User } from "src/types/entities";
import { useAuth } from "src/contexts/AuthContext";
import { chatAPI } from "src/api/chat.api";

const CreateGroupForm = ({
  handleClose,
  data,
}: {
  handleClose: any;
  // data: FriendResponse[]; fix - tran
  data: User[]
}) => {
  const { userId } = useAuth();
  const { t } = useContext(LanguageContext);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const groupListContext = useGroupList();
  const [groupInfo, setGroupInfo] = useState({
    type: "group",
    name: "",
    description: "",
    participants: [],
  } as CreateGroupDto);
  const queryClient = useQueryClient();

  const { friendList } = useFriendList();

  // const options = friendList.map((option) => {
  //   const firstLetter =
  //     option.username !== "" ? option.username[0].toUpperCase() : "";
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //     ...option,
  //   };
  // });

  const options = useMemo(() => {
    if (data && data.length > 0) {
      const mappedOptions = data.map((option) => {
        // const firstLetter =
        //   option.to_user_profile.profile[0].username !== ""
        //     ? option.to_user_profile.profile[0].username[0].toUpperCase()
        //     : "";

        const firstLetter =
          option.username !== ""
            ? option.username[0].toUpperCase()
            : "";

        return {
          firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
          ...option,
        };
      });

      return mappedOptions;
    }
  }, [data]);

  const handleChangeSearch = (e) => {
    setGroupInfo((prev) => ({
      ...prev,
      name: e.target.value,
      description: `Create ${e.target.value} group`,
    }));
  };

  useEffect(() => {
    const selectedFriendID = [];
    selectedFriend.map((i) => selectedFriendID.push(Number(i.id)));
    setGroupInfo((prev) => ({ ...prev, participants: selectedFriendID }));
  }, [selectedFriend]);

  const handleCreateGroup = () => {
    const updatedParticipants = groupInfo.participants.includes(Number(userId))
      ? groupInfo.participants
      : [...groupInfo.participants, Number(userId)];

    const group_info = {
      ...groupInfo,
      participants: updatedParticipants,
      creator_id: Number(userId),
    };

    if (updatedParticipants.length <= 2) {
      enqueueSnackbar("Nhóm phải có ít nhất 3 thành viên", {
        variant: "warning",
      });
      return;
    }

    createGroup.mutate(group_info);
    handleClose();
  };

  const createGroup = useMutation(chatAPI.createChat, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["GetListGroupByUser"]);
      enqueueSnackbar(`Tạo nhóm ${groupInfo.name} thành công`, {
        variant: "success",
      });
    },
    onError: (error: any) => {
      enqueueSnackbar(
        `Tạo nhóm ${groupInfo.name} không thành công - ${error}`,
        {
          variant: "warning",
        }
      );
    },
  });

  const getGroupList = useMutation(groupAPI.groupList, {
    onSuccess: (response) => {
      console.log(response.data);
      if (response.data.count > 0) {
        const responseGroupList = [];
        response.data.groups.forEach((e) => {
          responseGroupList.push({
            id: e.group.id,
            name: e.group.name,
            avatar: e.group.avatar,
            group_members: [...e.group.group_members],
            owner_id: e.group.owner_id,
          });
        });
        groupListContext.setGroupList([...responseGroupList]);
        groupListContext.setCount(response.data.count);
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error, { variant: "error" });
    },
  });

  return (
    <Stack spacing={3}>
      <TextField
        id="group-name"
        label={t.group_name}
        variant="standard"
        onChange={handleChangeSearch}
      />
      <Autocomplete
        multiple
        id="group-members"
        disableCloseOnSelect
        options={
          Array.isArray(options)
            ? options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
            : []
        }
        groupBy={(option) => option.firstLetter}
        // getOptionLabel={(option) => option.to_user_profile.profile[0].username}
        getOptionLabel={(option) => option.username}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={t.group_member}
            placeholder="Thêm thành viên"
          />
        )}
        onChange={(event, value) => setSelectedFriend(value)}
      ></Autocomplete>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button onClick={handleClose}>{t.back}</Button>
        <Button type="submit" variant="contained" onClick={handleCreateGroup}>
          {t.create_group}
        </Button>
      </Stack>
    </Stack>
  );
};
interface CreateGroupProps {
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateGroup: FC<CreateGroupProps> = (props) => {
  const { t } = useContext(LanguageContext);
  // const { isLoading, data, refetch } = useQuery({
  //   queryKey: ["GetFriendList"],
  //   queryFn: friendAPI.friendList,
  //   select: (res) => res.data,
  //   enabled: false,
  // });
  const { isLoading, data, refetch } = useQuery({ // fix - tran
    queryKey: ["GetFriendList", '1'],
    queryFn: () => friendAPI.searchFriend(""),
    select: (res) => res.data,
    // enabled: !!userId, // chỉ chạy nếu có userId
  });


  useEffect(() => {
    console.log(props.open)
    if (props.open) {
      refetch();
    }
  }, [props.open]);

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open} transitionDuration={0}>
      <DialogTitle>{t.create_group}</DialogTitle>
      <Divider />
      <DialogContent>
        <CreateGroupForm data={data} handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
