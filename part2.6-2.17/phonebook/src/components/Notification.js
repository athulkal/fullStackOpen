const Notification = ({ message, err }) => {
  if (message === "") {
    return null;
  }

  return (
    <div style={{ color: err ? "red" : "green" }} className="notification">
      {message}
    </div>
  );
};
export default Notification;
