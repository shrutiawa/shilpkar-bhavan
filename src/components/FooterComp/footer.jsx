import React, { useContext } from "react";
import "./footer.css";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import LocaleContext from "../HelperComp/localeContextProvider";
import GET_FOOTER_CONTENT from "./graphql";

const Footer = () => {
  const { locale } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_FOOTER_CONTENT, {
    variables: { locale },
  });

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.footerCollection || !data.footerCollection.items.length) {
    return <p>No data available</p>;
  }

  const { footerHeading, socialMedia } = data.footerCollection.items[0];

  return (
    <div className="footerMainContainer">
      <div className="footerContent">
        <div className="section1">&copy; {footerHeading}</div>
        <div className="section2">
          <p>{socialMedia}</p>
          <div className="socialIcons">
            <FontAwesomeIcon className="icons" icon={faFacebook} />
            <FontAwesomeIcon className="icons" icon={faInstagram} />
            <FontAwesomeIcon className="icons" icon={faTwitter} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
