import { gql } from "@apollo/client";

const GET_ADDPRODUCT_CONTENT = gql`
  query AddProductContent($locale: String!) {
    addProductCollection(locale: $locale) {
      items {
        heading
        generalInfo
        productAttributes
        category
        pricing
        productMedia
        buttons
      }
    }
  }
`;

export default GET_ADDPRODUCT_CONTENT;