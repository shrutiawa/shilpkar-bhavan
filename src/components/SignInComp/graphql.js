import { gql } from "@apollo/client";

const GET_SIGNIN_CONTENT = gql`
  query GetLoginContent($locale: String!) {
    loginCollection(locale: $locale) {
      items {
        logo
        signIn
        signInDescription
        loginData
      }
    }
  }
`;

export default GET_SIGNIN_CONTENT;