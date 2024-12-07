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
import { FC, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { friendAPI } from "src/api";
import { groupAPI } from "src/api/group.api";
import { useFriendList } from "src/contexts/FriendContext";
import { useGroupList } from "src/contexts/GroupContext";
import { CreateGroupDto } from "src/types/api/dto";
import { FriendResponse } from "src/types/api/response/friend";

const CreateGroupForm = ({
  handleClose,
  data,
}: {
  handleClose: any;
  data: FriendResponse[];
}) => {
  const [selectedFriend, setSelectedFriend] = useState([]);
  const groupListContext = useGroupList();
  const [groupInfo, setGroupInfo] = useState({
    name: "",
    description: "",
    user_ids: [],
  } as CreateGroupDto);
  const queryClient = useQueryClient();

  const { friendList } = useFriendList();

  // const options = friendList.map((option) => {
  //   const firstLetter =
  //     option.fullname !== "" ? option.fullname[0].toUpperCase() : "";
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //     ...option,
  //   };
  // });

  const options = useMemo(() => {
    if (data && data.length > 0) {
      const mappedOptions = data.map((option) => {
        const firstLetter =
          option.to_user_profile.profile[0].fullname !== ""
            ? option.to_user_profile.profile[0].fullname[0].toUpperCase()
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
    selectedFriend.map((i) => selectedFriendID.push(i.to_user_profile.id));
    setGroupInfo((prev) => ({ ...prev, user_ids: selectedFriendID }));
  }, [selectedFriend]);

  const handleCreateGroup = () => {
    createGroup.mutate(groupInfo);
    handleClose();
  };

  const createGroup = useMutation(groupAPI.createGroup, {
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
        label="Tên nhóm"
        variant="standard"
        onChange={handleChangeSearch}
      />
      <Autocomplete
        multiple
        id="group-members"
        disableCloseOnSelect
        options={
          options &&
          options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))
        }
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.to_user_profile.profile[0].fullname}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Thành viên"
            placeholder="Thêm thành viên"
          />
        )}
        onChange={(event, value) => setSelectedFriend(value)}
      ></Autocomplete>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button onClick={handleClose}>Quay lại</Button>
        <Button type="submit" variant="contained" onClick={handleCreateGroup}>
          Tạo nhóm
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
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["GetFriendList"],
    queryFn: friendAPI.friendList,
    select: (res) => res.data,
    enabled: false,
  });
  
  useEffect(() => {
    console.log(props.open)
    if (props.open) {
      refetch();
    }
  }, [props.open]);

  return (
    <Dialog fullWidth maxWidth="xs" open={props.open}>
      <DialogTitle>Tạo nhóm 1</DialogTitle>
      <Divider />
      <DialogContent>
        <CreateGroupForm data={data} handleClose={props.handleClose} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
