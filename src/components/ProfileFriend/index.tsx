import { FC } from "react";

interface ProfileFriendProps {
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileFriend: FC<ProfileFriendProps> = () => {
    console.log("show Friend group")
    return (
        <></>
    )
}

export default ProfileFriend;