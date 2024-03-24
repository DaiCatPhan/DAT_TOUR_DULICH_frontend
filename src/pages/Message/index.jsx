import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect } from "react";

function Message() {
  useEffect(() => {
    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    socket.on("connection", () => {
      console.log("Connect to socket.io");
    });
    socket.on("new_user_login", (data) => {
      console.log("new_user_login", data.message);
    });
  }, []);

  const handleSend = () => {
    const socket = io("http://localhost:3000", { transports: ["websocket"] });
    socket.emit("new_user_login ", { message: "Phan dai cat" });
  };
  return (
    <div className={cx("wrapper")}>
      <button onClick={handleSend}>Send message</button>
    </div>
  );
}

export default Message;
