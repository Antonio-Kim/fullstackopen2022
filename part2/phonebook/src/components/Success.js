import React from "react";

const Success = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="message">{message}</div>;
};

export default Success;
