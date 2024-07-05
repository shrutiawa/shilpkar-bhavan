import { gql } from "@apollo/client";

const GET_CART_CONTENT = gql`
  query GetShoppingCartContent($locale: String!) {
    shoppingCartCollection(locale: $locale) {
      items {
        title
        emptyCartContent
        cartDetails
        orderSummary
      }
    }
  }
`;

export default GET_CART_CONTENT;