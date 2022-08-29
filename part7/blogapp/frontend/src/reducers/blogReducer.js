import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    removeBlog: (state, action) => {
      const id = action.payload;
      state = state.filter((blog) => blog.id !== id);
    },
    updateBlog: (state, action) => {
      const id = action.payload.id;
      const blogToUpdate = state.find((blog) => blog.id === id);
      blogToUpdate.likes = blogToUpdate.likes + 1;
      state = { ...state, blogToUpdate };
    },
  },
});

export const getBlog = (state) => state.blogs;
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content);
    dispatch(appendBlog(blog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
  };
};

export const likeABlog = (id, newObject) => {
  return async (dispatch) => {
    dispatch(updateBlog({ id, newObject }));
    return await blogService.update(id, newObject);
  };
};
export const { appendBlog, setBlogs, removeBlog, updateBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
