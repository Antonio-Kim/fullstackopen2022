import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/user";

import { notify, getMessage } from "./reducers/notificationReducer";
import {
  setBlogs,
  getBlog,
  initializeBlogs,
  newBlog,
  deleteBlog,
  likeABlog,
} from "./reducers/blogReducer";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(getBlog);
  const [user, setUser] = useState(null);
  const notification = useSelector(getMessage);
  const blogFormRef = useRef();
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        setUser(user);
        userService.setUser(user);
        dispatch(notify({ message: `${user.name} logged in!`, type: "info" }));
      })
      .catch(() => {
        dispatch(notify({ message: "wrong username/password", type: "alert" }));
      });
  };

  const logout = () => {
    setUser(null);
    userService.clearUser();
    dispatch(notify({ message: "good bye!", type: "info" }));
  };

  const createBlog = async (blog) => {
    dispatch(newBlog(blog))
      .then((createdBlog) => {
        dispatch(
          notify({
            message: `a new blog '${createdBlog.title}' by ${createdBlog.author} added`,
            type: "info",
          })
        );
        dispatch(setBlogs(blogs.concat(createdBlog)));
        blogFormRef.current.toggleVisibility();
      })
      .catch((error) => {
        dispatch(
          notify({
            message: "creating a blog failed: " + error.response.data.error,
            type: "alert",
          })
        );
      });
  };

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id);

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    );

    if (!ok) {
      return;
    }

    dispatch(deleteBlog(id)).then(() => {
      const updatedBlogs = blogs.filter((b) => b.id !== id).sort(byLikes);
      dispatch(setBlogs(updatedBlogs));
    });
  };

  const likeBlog = async (id) => {
    const toLike = blogs.find((b) => b.id === id);
    const liked = {
      ...toLike,
      likes: (toLike.likes || 0) + 1,
      user: toLike.user.id,
    };

    dispatch(likeABlog(liked.id, liked)).then((updatedBlog) => {
      dispatch(
        notify({
          message: `you liked '${updatedBlog.title}' by ${updatedBlog.author}`,
          type: "info",
        })
      );
      const updatedBlogs = blogs
        .map((b) => (b.id === id ? updatedBlog : b))
        .sort(byLikes);
      dispatch(setBlogs(updatedBlogs));
    });
  };

  if (user === null) {
    return (
      <>
        <Notification notification={notification} />
        <LoginForm onLogin={login} />
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlogForm onCreate={createBlog} />
      </Togglable>

      <div id="blogs">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
