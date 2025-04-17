import { createContext, FC, ReactNode, useContext, useState } from "react";

interface Member {
  user_id: string;
  profile_id: string;
  username: string;
  avatar: string;
  active: boolean;
}

interface GroupMemberContext {
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}

export const GroupMemberContext = createContext<GroupMemberContext>(
  {} as GroupMemberContext
);

interface Props {
  children: ReactNode;
}

export const GroupMemberProvider: FC<Props> = ({ children }) => {
  const [members, setMembers] = useState([
    { user_id: "", profile_id: "", username: "", avatar: "", active: true },
  ] as Member[]);

  return (
    <GroupMemberContext.Provider value={{ members, setMembers }}>
      {children}
    </GroupMemberContext.Provider>
  );
};

export const useGroupMembers = () => {
    const context = useContext(GroupMemberContext);

    if (!context) throw new Error("It's must be in GroupMemberProvider");

    return context;
}
