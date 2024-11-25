import {
  FC,
  useState,
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { STORAGE_KEY } from "src/utils/constants";
import { TabsEnum } from "src/utils/enums";

type TabsContext = {
  tabs: TabsEnum;
  showChatBoxList: boolean;
  showChatDetail: boolean;
  showContactList: boolean;
  showContactInfo: boolean;
  setTabs: React.Dispatch<React.SetStateAction<TabsEnum>>;
  setShowChatBoxList: React.Dispatch<React.SetStateAction<boolean>>;
  setShowChatDetail: React.Dispatch<React.SetStateAction<boolean>>;
  setShowContactList: React.Dispatch<React.SetStateAction<boolean>>;
  setShowContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TabsContext = createContext<TabsContext>({} as TabsContext);

interface Props {
  children: ReactNode;
}

export const TabsProvider: FC<Props> = ({ children }) => {
  const [tabs, setTabs] = useState(TabsEnum.CHAT);
  const [showChatBoxList, setShowChatBoxList] = useState(true);
  const [showChatDetail, setShowChatDetail] = useState(true);
  const [showContactList, setShowContactList] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  return (
    <TabsContext.Provider
      value={{
        tabs,
        setTabs,
        showChatBoxList,
        setShowChatBoxList,
        showChatDetail,
        setShowChatDetail,
        showContactList,
        setShowContactList,
        showContactInfo,
        setShowContactInfo,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);

  if (!context) throw new Error("It's must be in TabsProvider");

  return context;
};
