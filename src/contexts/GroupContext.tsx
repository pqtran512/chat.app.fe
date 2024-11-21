import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
    useState,
  } from "react";
  
  interface Group {
    id: string;
    name: string;
    avatar: string;
  }
  
  interface GroupListContext {
    groupList: Group[];
    setGroupList: React.Dispatch<React.SetStateAction<Group[]>>;
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
      { id: "", name: "", avatar: "" },
    ] as Group[]);

    const [count, setCount] = useState<number>(0);
  
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