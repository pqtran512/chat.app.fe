import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

interface FriendSentRespone {
  id: string;
  username: string;
  avatar: string;
}

interface FriendSentContext {
  friendSentList: FriendSentRespone[];
  setFriendSentList: React.Dispatch<React.SetStateAction<FriendSentRespone[]>>;
  friendReceivedList: FriendSentRespone[];
  setFriendReceivedList: React.Dispatch<
    React.SetStateAction<FriendSentRespone[]>
  >;
}

export const FriendRequestContext = createContext<FriendSentContext>(
  {} as FriendSentContext
);

interface Props {
  children: ReactNode;
}

export const FriendSentProvider: FC<Props> = ({ children }) => {
  const [friendSentList, setFriendSentList] = useState([
    { id: "", username: "", avatar: "" },
  ] as FriendSentRespone[]);
  const [friendReceivedList, setFriendReceivedList] = useState([
    { id: "", username: "", avatar: "" },
  ] as FriendSentRespone[]);

  return (
    <FriendRequestContext.Provider
      value={{
        friendSentList,
        setFriendSentList,
        friendReceivedList,
        setFriendReceivedList,
      }}
    >
      {children}
    </FriendRequestContext.Provider>
  );
};
export const useFriendRequest = () => {
  const context = useContext(FriendRequestContext);

  if (!context) throw new Error("It's must be in FriendSendProvider");

  return context;
};

interface FriendListRespone {
  id: string;
  username: string;
  avatar: string;
}

interface FriendListContext {
  friendList: FriendListRespone[];
  setFriendList: React.Dispatch<React.SetStateAction<FriendListRespone[]>>;
}

export const FriendListContext = createContext<FriendListContext>(
  {} as FriendListContext
);

export const FriendListProvider: FC<Props> = ({ children }) => {
  const [friendList, setFriendList] = useState([
    { id: "", username: "", avatar: "" },
  ] as FriendListRespone[]);

  return (
    <FriendListContext.Provider value={{ friendList, setFriendList }}>
      {children}
    </FriendListContext.Provider>
  );
};
export const useFriendList = () => {
  const context = useContext(FriendListContext);

  if (!context) throw new Error("It's must be in FriendListProvider");

  return context;
};
