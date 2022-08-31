import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

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

import { initializeUser, setUser } from "./reducers/userReducer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(getBlog);
  const user = useSelector(initializeUser);
  const notification = useSelector(getMessage);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const userFromStorage = userService.getUser();
    if (userFromStorage) {
      dispatch(setUser(userFromStorage));
    }
  }, [dispatch]);

  const login = async (username, password) => {
    loginService
      .login({
        username,
        password,
      })
      .then((user) => {
        userService.setUser(user);
        dispatch(setUser(user));
        dispatch(notify({ message: `${user.name} logged in!`, type: "info" }));
      })
      .catch(() => {
        dispatch(notify({ message: "wrong username/password", type: "alert" }));
      });
  };

  const logout = () => {
    userService.clearUser();
    dispatch(setUser(null));
    dispatch(notify({ message: "good bye!", type: "info" }));
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

      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home blogs={blogs} />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then(response => {
      setUsers(response);
    })
  },[])

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead></thead>
        <tbody>
          {users.map( user => <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
};

const Home = ({ blogs }) => {
  const dispatch = useDispatch();
  const blogFormRef = useRef();
  const user = useSelector(initializeUser);
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);

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

  return (
    <div>
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
