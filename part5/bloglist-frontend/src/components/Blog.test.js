import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
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
});
