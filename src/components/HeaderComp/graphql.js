import { gql } from "@apollo/client";

const GET_HEADER_CONTENT = gql`
  query GetHeaderContent($locale: String!) {
    headerCollection(locale: $locale) {
      items {
        logo
        links
      }
    }
  }
`;

export default GET_HEADER_CONTENT;
