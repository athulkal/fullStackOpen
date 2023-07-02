import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((store) => store.notification);
  let style =
    message === ""
      ? { display: "none" }
      : {
          border: "solid",
          padding: 10,
          borderWidth: 1,
        };

  return <div style={style}>{message}</div>;
};

export default Notification;
