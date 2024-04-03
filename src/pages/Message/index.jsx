import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input } from "antd";
const { TextArea } = Input;

import MessageService from "../../services/MessageService";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function Message() {
  const user = useSelector((state) => state.account.user);

  //Room State
  const [room, setRoom] = useState();
  const [userOne, setUserOne] = useState();
  const [text, setText] = useState("");
  const [listMessage, setListMessage] = useState([]);

  const [test, setTest] = useState("");

  const getListRoomOfUser = async () => {
    const res = await MessageService.listRoomOfUser(`userOne=${user?.id}`);
    console.log("res >>>>>>>.", res);
    if (res && res.data.EC == 0) {
      setListMessage(res.data.DT[0]);
    }
  };

  useEffect(() => {
    setUserOne(user?.id);
    getListRoomOfUser();
  }, [user]);

  const joinRoom = () => {
    if (userOne !== "") {
      socket.emit("join_room", { userOne });
    }
  };

  const sendMessage = () => {
    const room = localStorage.getItem("room");
    if (!room) {
      toast.warning("Vui lòng chọn phòng trước khi gửi tin nhắn ");
    }
    socket.emit("send_message", { text, room: room, ID_User: user?.id });
    setText("");
  };

  useEffect(() => {
    // Lắng nghe sự kiện "room_created" từ máy chủ
    socket.on("room_created", (room) => {
      localStorage.setItem("room", room);
    });

    socket.on("receive_message", async (data) => {
      console.log("data fl >>>>>", data);

      if (data) {
        const res = await MessageService.listRoomOfUser(
          `userOne=${data.ID_User}`
        );
        if (res && res.data.EC == 0) {
          setListMessage(res.data.DT[0]);
        }
      }

      setTest(data.text);
    });
  }, [socket]);
  return (
    <div className={cx("mx-5")}>
      <div className={cx("formMessage")}>
        <button onClick={joinRoom}>Phòng 1</button>
        <div className={cx("list")}>
          {listMessage?.messageData?.map((item) => {
            if (item?.Customer?.email != "admin@gmail.com") {
              return (
                <div key={item.id} className={cx("chat_message", "sent")}>
                  {item?.text}
                </div>
              );
            } else {
              return (
                <div key={item.id} className={cx("chat_message", "received")}>
                  {item?.text}
                </div>
              );
            }
          })}
        </div>

        <div>{test}</div>

        <div>
          <TextArea
            value={text}
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
