import { gql } from "@apollo/client";

const GET_ORDERHISTORY_CONTENT = gql`
  query GetOrderHistoryContent($locale: String!) {
    orderHistoryCollection(locale: $locale) {
      items {
        title
        emptyOrderDetails
      }
    }
  }
`;

export default GET_ORDERHISTORY_CONTENT;