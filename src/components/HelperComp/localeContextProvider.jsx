// localeContextProvider.js
import React, { createContext, useState } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("en-US");
  const [loggedIn, setLoggedIn] = useState("");
  const [canAccessOrderConfirm, setCanAccessOrderConfirm] = useState(false);

  const handleAuthChange = () => {
    setLoggedIn(localStorage.getItem("loggedIn") === "true");
  };
console.log("contxt------",canAccessOrderConfirm)
  return (
    <LocaleContext.Provider value={{ locale, setLocale, loggedIn, handleAuthChange ,canAccessOrderConfirm, setCanAccessOrderConfirm }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
