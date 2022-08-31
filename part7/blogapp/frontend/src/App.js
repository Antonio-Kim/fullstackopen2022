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

import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

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
            <Route path="/blogs/:id" element={<IndividualBlog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

const IndividualBlog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const id = useParams().id;
  const blog = blogs.find(blog => blog.id === id);
  const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1);
  const addedBy = `added by ${blog.user && blog.user.name ? blog.user.name : "anonymous"}`;
  
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

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes{" "}
        <button onClick={() => likeBlog(blog.id)}>like</button>
      </div>
      <div>{addedBy}</div>
    </div>
  )
}

const User = () => {
  const [users, setUsers] = useState([]);
  const id = useParams().id
  const user = users.find(user => user.id === id);
  
  useEffect(() => {
    userService.getAllUsers().then((response) => {
      setUsers(response)
    })
  },[])

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  )
}

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAllUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
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
          <Link to={`/blogs/${blog.id}`}>
            <Blog
              key={blog.id}
              blog={blog}
              likeBlog={likeBlog}
              removeBlog={removeBlog}
              user={user}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default App;
