import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
  margin: 0.25em;
`
const Form = styled.form`
  color: darkblue;
  font-size: 1em;
  padding: 1em;
  border: 2px solid;
  border-radius: 3px;
  margin-bottom: 1em;
`

const Button = styled.button`
  font-size: 1em;
  background: white;
  border: 2px solid green;
  border-radius: 3px;
  padding: 0.2 1em;
  color: green;
`

const Title = styled.h2`
  font-size: 1.5em;
  color: darkblue;
`

const NewBlogForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ title, author, url, likes: 0 });
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <Title>Create new</Title>

      <Form onSubmit={handleSubmit}>
        <div>
          title
          <Input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
            placeholder="title of the blog"
          />
        </div>
        <div>
          author
          <Input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
            placeholder="author of the blog"
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
            placeholder="url of the blog"
          />
        </div>
        <Button id="create-butto" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default NewBlogForm;
