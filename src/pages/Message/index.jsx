import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input } from "antd";
const { TextArea } = Input;

import { IconArrowRight, IconCirclePlus } from "@tabler/icons-react";

import MessageService from "../../services/MessageService";
import moment from "moment";



const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
}); 

function Message() {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const ID_User = localStorage.getItem("ID_User");
  //Room State
  const [room, setRoom] = useState();
  const [text, setText] = useState("");
  const [listMessage, setListMessage] = useState({});
  const [showRoom, setShowRoom] = useState(false);
  const [test, setTest] = useState("");

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  const joinRoom = () => {
    setShowRoom(!showRoom);
    if (ID_User !== "") {
      socket.emit("join_room", { ID_User: ID_User });
    }
  };

  const getListRoomOfUser = async () => {
    const res = await MessageService.listRoomOfUser(`userOne=${ID_User}`);
    if (res && res.data.EC == 0) {
      setListMessage(res.data.DT[0]);
      joinRoom();
    }
  };

  const sendMessage = async () => {
    const room = localStorage.getItem("room");

    if (!room) {
      toast.warning("Vui lòng chọn phòng trước khi gửi tin nhắn ");
    }
    if (!ID_User) {
      toast.warning("Người dùng chưa đăng nhập ");
    }
    if (!text) {
      toast.error("Vui lòng nhập tin nhắn !!");
    }
    const res = await MessageService.create({
      text,
      ID_Room: +room,
      ID_User: ID_User,
    });
    if (res && res.data.EC === 0) {
      socket.emit("send_message", { text, room: +room, ID_User: ID_User });
      setText("");
      getListRoomOfUser();
    }
  };

  useEffect(() => {
    getListRoomOfUser();
  }, []);

  useEffect(() => {
    // Lắng nghe sự kiện "room_created" từ máy chủ
    socket.on("room_created", (room) => {
      localStorage.setItem("room", room);
    });

    socket.on("receive_message", async (data) => {
      const ID_User = user?.id;
      const res = await MessageService.listRoomOfUser(`userOne=${ID_User}`);
      if (res && res.data.EC == 0) {
        setListMessage(res.data.DT[0]);
      }
      getListRoomOfUser();
      setTest(data.text);
    });
  }, [socket]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <div className={cx("vh_80")}>
          <div className={cx("formMessage")}>
            
            <div className={cx("headerContact")}>
              <div className={cx("circle")}>AD</div>
              <div className={cx("mx-2")}>
                Chat với <b>admin@mail.com</b>
              </div>
            </div>

            <div className={cx("list")}>
              {listMessage?.messageData?.map((item) => {
                if (item?.Customer?.email != "admin@gmail.com") {
                  return (
                    <div
                      className={cx("d-flex justify-content-end")}
                      ref={messagesEndRef}
                    >
                      <div
                        key={item.id}
                        className={cx(
                          "chat_message",
                          "d-flex align-items-center"
                        )}
                      >
                        <div className={cx("time")}>
                          {moment(item?.createdAt).format("HH:mm")}
                        </div>

                        <div className={cx("content", "sent")}>
                          {item?.text}
                        </div>

                        <div className={cx("image")}>
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                            alt="notFound"
                          />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className={cx("d-flex justify-content-start")}>
                      <div
                        key={item.id}
                        className={cx(
                          "chat_message",
                          "d-flex align-items-center"
                        )}
                      >
                        <div className={cx("image")}>
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                            alt="notFound"
                          />
                        </div>

                        <div className={cx("content", "received")}>
                          {item?.text}
                        </div>

                        <div className={cx("time")}>
                          {moment(item?.createdAt).format("HH:mm")}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>

            <div className={cx("frame_TextArea")}>
              <IconCirclePlus className={cx("mx-1", "b2b3b4")} />
              <Input
                value={text}
                placeholder="Nhập tin nhắn ở đây...."
                onChange={(event) => {
                  setText(event.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              <button onClick={sendMessage}>
                <IconArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
