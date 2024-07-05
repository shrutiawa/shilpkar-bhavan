import { gql } from "@apollo/client";

const GET_ABOUTUS_CONTENT = gql`
  query GetAboutUsContent($locale: String!) {
    aboutUsCollection(locale: $locale) {
      items {
        title
        image
        description {
          json
        }
        facilityHeading
        facilitiesLinkCollection {
          items {
            ... on Facilities {
              heading
              icon
              facilityDesc
            }
          }
        }
      }
    }
  }
`;

export default GET_ABOUTUS_CONTENT;