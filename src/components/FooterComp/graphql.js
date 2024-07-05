import { gql } from "@apollo/client";

const GET_FOOTER_CONTENT = gql`
  query GetFooterContent($locale: String!) {
    footerCollection(locale: $locale) {
      items {
        footerHeading
        socialMedia
      }
    }
  }
`;

export default GET_FOOTER_CONTENT;