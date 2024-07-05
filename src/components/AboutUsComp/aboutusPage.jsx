import React, { useContext } from "react";
import "./aboutusPage.css";
import { useQuery, gql } from "@apollo/client";
import { marked } from "marked";
import DOMPurify from "dompurify";
import LocaleContext from "../HelperComp/localeContextProvider";
import GET_ABOUTUS_CONTENT from "./graphql";

export const getHTMLData = (rawData) => {
  const htmlString = marked(rawData);
  const sanitizedHTMLString = DOMPurify.sanitize(htmlString);
  console.log("sanitizedHTMLString: ", sanitizedHTMLString);
  return sanitizedHTMLString;
};

const AboutUs = () => {
  const { locale } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_ABOUTUS_CONTENT, {
    variables: { locale },
  });

  // console.log("Locale: ", locale);
  // console.log("Query data: ", data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (
    !data ||
    !data.aboutUsCollection ||
    !data.aboutUsCollection.items.length
  ) {
    return <p>No data available</p>;
  }

  const {
    title,
    image,
    description,
    facilitiesLinkCollection,
    facilityHeading,
  } = data.aboutUsCollection.items[0];

  // console.log("description", description.json.content[0].content[0].value);
  const { value } = description.json.content[0].content[0];
  // console.log(value);

  // console.log(facilitiesLinkCollection.items[0].icon[0].url);

  return (
    <div className="aboutusMainContainer">
      <div className="aboutContent">
        <div className="section1">
          <img src={image[0].url} alt="image" />
          <div>
            <h3>{title}</h3>
            <p dangerouslySetInnerHTML={{ __html: getHTMLData(value) }}></p>
          </div>
        </div>
        <div className="section2">
          <p>{facilityHeading}</p>
          <div className="facilityItems">
            {facilitiesLinkCollection.items.map((item, idx) => (
              <div key={idx} className="facilityCard">
                <img src={item.icon[0].url} alt="img" />
                <p className="facilityHeading">{item.heading}</p>
                <p className="facilityDesc">{item.facilityDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
