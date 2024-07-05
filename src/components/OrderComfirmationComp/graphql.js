import { gql } from "@apollo/client";

const GET_ORDERCONFIRMATION_CONTENT = gql`
  query GetOrderConfirmationContent($locale: String!) {
    orderConfirmationCollection(locale: $locale) {
      items {
        heading
        subTexts
        buttons
      }
    }
  }
`;

export default GET_ORDERCONFIRMATION_CONTENT;