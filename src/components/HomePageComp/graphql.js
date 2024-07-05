import { gql } from "@apollo/client";

const GET_HOMEPAGE_CONTENT = gql`
  query GetHomePageContent($locale: String!) {
    heroBannerCollection(locale: $locale) {
      items {
        bannerImage
        bannerDescription
        textAboveImage
        shopSectionHeading
        shopSectionDesc
        shopSectionButton
        shopSectionImage
        blogHeading
        blogDescription
        blogButton
        stepsToSell
      }
    }
    stepsForSellCollection(locale: $locale) {
      items {
        icon
        text
        order
      }
    }
    blogCollection(locale: $locale, limit: 4) {
      items {
        heading
        shortDescription
        longDescription {
          json
        }
        blogImages
      }
    }
  }
`;

export default GET_HOMEPAGE_CONTENT;