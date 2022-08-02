import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostForm from "./PostForm";
import userEvent from "@testing-library/user-event";

test("<PostForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<PostForm createBlog={createBlog} />);

  const input = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  await user.type(input[0], "anoter test bites the dust");
  await user.type(input[1], "me");
  await user.type(input[2], "www.example.com");
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
});
