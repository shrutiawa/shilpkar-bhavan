import { gql } from "@apollo/client";

const GET_CARTADDRESS_CONTENT = gql`
  query GetAddressContent($locale: String!) {
    shippingAddressCollection(locale: $locale) {
      items {
        addressHeading
        nameDetails
        addressDetails
        deliveryDetails
      }
    }
  }
`;

export default GET_CARTADDRESS_CONTENT;