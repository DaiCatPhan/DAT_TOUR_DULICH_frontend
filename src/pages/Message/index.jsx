import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

import { Button, Input } from "antd";
const { TextArea } = Input;

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function Message() {
  //Room State
  const [room, setRoom] = useState(2);
  const [createRoomSever, setCreateRoomSever] = useState();
  console.log("createRoomSever >>>.", createRoomSever);
  const [text, setText] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room });
    }
  };

  // const sendMessage = () => {
  //   socket.emit("send_message", { message, room });
  // };

  const sendMessage = () => {
    socket.emit("send_message", { text, room: createRoomSever, ID_User: 2 });
  };

  useEffect(() => {
    // Lắng nghe sự kiện "room_created" từ máy chủ
    socket.on("room_created", (room) => {
      setCreateRoomSever(room); // Cập nhật số phòng mới được tạo
    });

    socket.on("receive_message", (data) => {
      setMessageReceived(data.text);
    });
  }, [socket]);
  return (
    <div className={cx("mx-5")}>
      {/* <div>
        <input
          placeholder="Room Number..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}> Join Room</button>
      </div>
      <div>
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}> Send Message</button>
      </div>
      <div>
        <div> Message:</div>
        {messageReceived}
      </div> */}

      <div className={cx("formMessage")}>
        {/* <div className={cx("list")}>
          <div className={cx("chat_message", "received")}>Tin nhắn 1</div>
          <div className={cx("chat_message", "sent")}>Tin nhắn 2</div>
          <div className={cx("chat_message", "sent")}>Tin nhắn 2</div>
          <div className={cx("chat_message", "received")}>Tin nhắn 1</div>
          <div className={cx("chat_message", "sent")}>Tin nhắn 2</div>
          <div className={cx("chat_message", "received")}>Tin nhắn 1</div>
        </div> */}

        <button onClick={joinRoom}>Phòng 1</button>

        <div>{messageReceived}</div>

        <div>
          <TextArea
            rows={3}
            onChange={(event) => {
              setText(event.target.value);
            }}
          />
          <Button type="primary" onClick={sendMessage}>
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Message;
