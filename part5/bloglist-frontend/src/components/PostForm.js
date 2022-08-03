import { useState } from "react";
import PropTypes from "prop-types";

const PostForm = ({ createBlog, user }) => {
  const [newTitle, setTitle] = useState("");
  const [newAuthor, setAuthor] = useState("");
  const [newUrl, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user_id: user.user_id,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            id="form-title"
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            id="form-author"
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            id="form-url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
};

export default PostForm;
