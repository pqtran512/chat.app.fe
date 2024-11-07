import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  styled,
  Typography,
} from "@mui/material";
import { FC } from "react";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 30,
  height: 30,
  border: `2px solid ${theme.palette.background.paper}`,
}));

interface GroupProps {
  id: number;
  avatar: string[];
  name: string;
}

const Group: FC<GroupProps> = (props) => {
  return (
    <Box>
      <Button
        key={props.id}
        size="large"
        sx={{ justifyContent: "left", width: "100%"}}
      >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<SmallAvatar alt="Remy Sharp" src={props.avatar[0]} />}
        >
          <Avatar alt="Travis Howard" src={props.avatar[1]} />
        </Badge>
        <Typography variant="h4" sx={{marginLeft: 3}}>{props.name}</Typography>
      </Button>
      <Divider />
    </Box>
  );
};

export default Group;
