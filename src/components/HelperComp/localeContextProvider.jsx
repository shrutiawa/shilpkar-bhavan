// localeContextProvider.js
import React, { createContext, useState } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("en-US");
  const [loggedIn, setLoggedIn] = useState("");

  const handleAuthChange = () => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, loggedIn, handleAuthChange }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
