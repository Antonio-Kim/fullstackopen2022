import { useState } from "react";

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
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default PostForm;
