import React from "react";

const UpdateError = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="update_error">{message}</div>;
};

export default UpdateError;
