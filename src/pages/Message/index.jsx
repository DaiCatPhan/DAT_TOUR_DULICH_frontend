import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { Button, Input } from "antd";
const { TextArea } = Input;
import { FloatButton } from "antd";
import {
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import MessageService from "../../services/MessageService";

const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function Message() {
  const ID_User = localStorage.getItem("ID_User");
  //Room State
  const [room, setRoom] = useState();
  const [text, setText] = useState("");
  const [listMessage, setListMessage] = useState([]);
  const [showRoom, setShowRoom] = useState(false);

  const [test, setTest] = useState("");

  const getListRoomOfUser = async () => {
    const res = await MessageService.listRoomOfUser(`userOne=${ID_User}`);
    if (res && res.data.EC == 0) {
      setListMessage(res.data.DT[0]);
    }
  };

  useEffect(() => {
    if (showRoom) {
      getListRoomOfUser();
    }
  }, [showRoom]);

  const joinRoom = () => {
    setShowRoom(true);
    if (ID_User !== "") {
      socket.emit("join_room", { ID_User });
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
    const res = await MessageService.create({
      text,
      ID_Room: +room,
      ID_User: ID_User,
    });
    if (res && res.data.EC === 0) {
      setListMessage(res.data.DT[0]);
      getListRoomOfUser();
    }
    socket.emit("send_message", { text, room: +room, ID_User: ID_User });
    setText("");
  };

  useEffect(() => {
    // Lắng nghe sự kiện "room_created" từ máy chủ
    socket.on("room_created", (room) => {
      localStorage.setItem("room", room);
    });

    socket.on("receive_message", async (data) => {
      const ID_User = localStorage.getItem("ID_User");
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
      <div className={cx("row")}>
        <div className={cx("col-lg-4 ")}>
          <div onClick={joinRoom} className={cx("listCard")}>
            <div className={cx("cardMessage", "d-flex align-items-center")}>
              <div className={cx("circle")}>ad</div>
              <div className={cx("mx-3")}>admin@gmail.com</div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-8  ")}>
          <div className={cx("  d-flex justify-content-start")}>
            <div className={cx("formMessage")}>
              {showRoom ? (
                <div className={cx("headerContact")}>
                  Chat với <b>admin@mail.com</b>
                </div>
              ) : (
                <div></div>
              )}

              <div className={cx("list")}>
                {listMessage?.messageData?.map((item) => {
                  if (item?.Customer?.email != "admin@gmail.com") {
                    return (
                      <div
                        key={item.id}
                        className={cx(
                          "chat_message",
                          "sent",
                          "d-flex align-items-center"
                        )}
                      >
                        <div className={cx("mx-2")}>{item?.text}</div>
                        <div className={cx("time")}>22:10</div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.id}
                        className={cx(
                          "chat_message",
                          "received",
                          "d-flex align-items-center"
                        )}
                      >
                        <div className={cx("mx-2")}>{item?.text}</div>
                        <div className={cx("time")}>22:10</div>
                      </div>
                    );
                  }
                })}
              </div>

              <div className={cx("mt_80")}></div>

              <div className={cx("TextArea")}>
                <TextArea
                  className={cx("border")}
                  value={text}
                  rows={2}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                />

                <Button
                  type="primary"
                  onClick={sendMessage}
                  className={cx("mx-2")}
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;



