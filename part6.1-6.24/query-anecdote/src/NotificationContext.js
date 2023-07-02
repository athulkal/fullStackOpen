import { createContext } from "react";
import { useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return (state = action.payload);
    case "RESET":
      return (state = "");
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
