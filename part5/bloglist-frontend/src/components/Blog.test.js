import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "another test bites the dust",
    author: "me",
    url: "www.example.com",
    likes: 5,
  };
  let container;

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container;
  });

  test("at start url and likes are not displayed", () => {
    const div = container.querySelector(".blogContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clikcing the view button, url and likes are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".blogContent");
    expect(div).not.toHaveStyle("display: none");
  });

  test.skip("clicking the likes button call twice", async () => {
    const addBlog = jest.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} newBlog={addBlog} />);
    screen.debug();

    const like = container.querySelector(".like");
    await user.click(like);

    expect(addBlog.mock.calls).toHaveLength(1);
  });
});
