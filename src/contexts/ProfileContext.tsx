import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";

type ProfileContext = {
  // userId: string;
  profileId: string;
  fullname: string;
  avatar: string;
//   setUserId: React.Dispatch<React.SetStateAction<string>>;
  setProfileId: React.Dispatch<React.SetStateAction<string>>;
  setFulname: React.Dispatch<React.SetStateAction<string>>;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
};

export const ProfileContext = createContext<ProfileContext>(
  {} as ProfileContext
);

interface Props {
  children: ReactNode;
}

export const ProfileProvider: FC<Props> = ({ children }) => {
  // const [userId, setUserId] = useState('');
  const [profileId, setProfileId] = useState("");
  const [fullname, setFulname] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const profileId = localStorage.getItem("profileId");
    if (profileId) {
      setProfileId(profileId);
    }

    const fullname = localStorage.getItem("fullname");
    if (fullname) {
      setFulname(fullname);
    }

    const avatar = localStorage.getItem("avatar");
    if (avatar) {
      setAvatar(avatar);
    }
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profileId,
        setProfileId,
        fullname,
        setFulname,
        avatar,
        setAvatar,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);

  if (!context) throw new Error("It's must be in ProfileProvider");
  return context;
};
