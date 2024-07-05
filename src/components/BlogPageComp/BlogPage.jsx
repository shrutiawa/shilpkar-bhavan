import React, { useState, useContext } from "react";
import "./BlogPage.css";
import { useQuery } from "@apollo/client";
import LocaleContext from "../HelperComp/localeContextProvider";
import { useNavigate } from "react-router-dom";
import GET_BLOG_CONTENT from "./graphql-blogs";

const BlogPage = () => {
  const { locale } = useContext(LocaleContext);
  const { loading, error, data } = useQuery(GET_BLOG_CONTENT, {
    variables: { locale },
  });

  const navigate = useNavigate();

  console.log("Data: ", data);

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.blogCollection?.items.length) {
    return <p>No data available</p>;
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = data.blogCollection.items.filter((post) =>
    post.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Filtered Posts: ", filteredPosts);

  return (
    <div>
      <div className="search-container">
        <input
          name="search"
          type="text"
          placeholder="Search here..."
          onChange={handleSearchChange}
          value={searchTerm}
        />
      </div>
      <div className="blog-container">
        {filteredPosts.map((post, index) => (
          <div
            key={index}
            className="blog-card"
            style={{ textDecoration: "none" }}
            onClick={() =>
              navigate("/blogcontent", { state: { id: post.sys.id } })
            }
          >
            {post.blogImages && post.blogImages.length > 0 && (
              <img src={post.blogImages[0].url} alt={post.heading} />
            )}
            <div className="blog-card-content">
              <h2>{post.heading}</h2>
              {post.shortDescription && <p>{post.shortDescription}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
