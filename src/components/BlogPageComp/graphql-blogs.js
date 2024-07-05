import { gql } from "@apollo/client";

const GET_BLOG_CONTENT = gql`
  query GetBlogContent($locale: String!) {
    blogCollection(locale: $locale) {
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

export default GET_BLOG_CONTENT;