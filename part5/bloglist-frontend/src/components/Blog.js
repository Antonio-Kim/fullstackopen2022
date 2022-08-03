import React, { useState } from "react";

const Blog = ({ blog, newBlog, removeBlog }) => {
  const [visible, setVisible] = useState(false);

  const handleLikes = async () => {
    const id = blog.id.toString();

    newBlog(id, {
      user: blog.user_id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const toggleVisibility = () => setVisible(!visible);
  const showDetail = { display: visible ? "" : "none " };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <div style={showDetail} className="blogContent">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}{" "}
          <button onClick={handleLikes} className="like">
            like
          </button>
        </div>
        <div>{blog.author}</div>
        <button id="delete" onClick={() => removeBlog(blog.id)}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
