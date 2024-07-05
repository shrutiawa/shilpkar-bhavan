import { gql } from "@apollo/client";

const GET_FULLBLOG_CONTENT = gql`
  query GetBlogContent($id: String!, $locale: String!) {
    blogCollection(where: { sys: { id: $id } }, locale: $locale) {
      items {
        sys {
          id
          publishedAt
        }
        heading
        shortDescription
        longDescription {
          json
        }
        blogImages
        authorLink {
          name
        }
      }
    }
  }
`;

export default GET_FULLBLOG_CONTENT;
