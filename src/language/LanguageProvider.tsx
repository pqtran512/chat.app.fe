import React, { ReactNode, useState, createContext } from "react";
import { translations } from "src/language/translations"; 

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: { [key: string]: string }; // t là object chứa các key/value cho từ ngữ
}

export const LanguageContext = createContext<LanguageContextProps>({
  language: "english",
  setLanguage: () => {},
  t: translations["english"],
});

interface Props {
  children: ReactNode;
}

const LanguageProviderWrapper: React.FC<Props> = ({ children }) => {
  const curLanguage = localStorage.getItem("appLanguage") || "english";
  const [language, _setLanguage] = useState<string>(curLanguage);

  const setLanguage = (language: string): void => {
    localStorage.setItem("appLanguage", language);
    _setLanguage(language);
  };

  const t = translations[language as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProviderWrapper;
