import TutorialsDisplay from "./TutorialsDisplay";
import LocaleContext from "../HelperComp/localeContextProvider";
import React, { useContext } from "react";

function TutorialsPage() {
  const { locale } = useContext(LocaleContext);
  return (
    <div
      className="tutorial-container"
      style={{ width: "auto", margin: "auto" }}
    >
      <TutorialsDisplay locale={locale} />
    </div>
  );
}

export default TutorialsPage;
