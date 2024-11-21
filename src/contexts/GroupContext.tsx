import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useState,
  } from "react";
  
  interface GroupMember {
    id: string;
    fullname: string;
    avatar: string;
  }
  
  interface GroupListContext {
    groupList: GroupMember[];
    setGroupList: React.Dispatch<React.SetStateAction<GroupMember[]>>;
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  }
  
  export const GroupListContext = createContext<GroupListContext>(
    {} as GroupListContext
  );
  
  interface Props {
    children: ReactNode;
  }
  
  export const GroupListProvider: FC<Props> = ({ children }) => {
    const [groupList, setGroupList] = useState([
      { id: "", fullname: "", avatar: "" },
    ] as GroupMember[]);

    const [count, setCount] = useState<number>(null);
  
    return (
      <GroupListContext.Provider value={{ groupList, setGroupList, count, setCount }}>
        {children}
      </GroupListContext.Provider>
    );
  };
  export const useGroupList = () => {
    const context = useContext(GroupListContext);
  
    if (!context) throw new Error("It's must be in FriendSendProvider");
  
    return context;
  };
// export {}