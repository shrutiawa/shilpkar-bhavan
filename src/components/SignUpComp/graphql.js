import { gql } from "@apollo/client";

const GET_SIGNUP_CONTENT = gql`
  query GetSignUpContent($locale: String!) {
    signUpCollection(locale: $locale) {
      items {
        logo
        signUp
        signUpDescription
        signUpData
      }
    }
  }
`;

export default GET_SIGNUP_CONTENT;