import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  const display = notification ? style : { display: "none" };
  return <div style={display}>{notification}</div>;
};

export default Notification;
