import className from "classnames/bind";
import styles from "./Message.module.scss";
const cx = className.bind(styles);
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
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
import moment from "moment";

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

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  const getListRoomOfUser = async () => {
    const res = await MessageService.listRoomOfUser(`userOne=${ID_User}`);
    if (res && res.data.EC == 0) {
      setListMessage(res.data.DT[0]);
    }
  };

  useEffect(() => {
    getListRoomOfUser();
  }, []);

  const joinRoom = () => {
    setShowRoom(!showRoom);
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
      handleScrollMessage();
    }
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

  function handleScrollMessage() {
    var messageContainer = document.getElementById("message-container");
    messageContainer.scrollTop = messageContainer.scrollHeight + 100000000;
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <div className={cx("row", "vh_80")}>
          <div className={cx("col-lg-4 border")}>
            <div onClick={joinRoom} className={cx("listCard")}>
              <div className={cx("my-2")}>
                <b>Vui lòng chọn phòng chát này để tham gia</b>
              </div>
              <div className={cx("cardMessage")}>
                <div className={cx("circle")}>ad</div>
                <div className={cx("mx-3")}>admin@gmail.com</div>
              </div>
            </div>
          </div>

          {showRoom ? (
            <div className={cx("col-lg-8 border")}>
              <div className={cx("d-flex justify-content-center")}>
                <div className={cx("formMessage")}>
                  <div className={cx("headerContact")}>
                    Chat với <b>admin@mail.com</b>
                  </div>

                  <div
                    className={cx("list", "border", "ScrollStyle", "p-3")}
                    id="message-container"
                  >
                    {listMessage?.messageData?.map((item) => {
                      if (item?.Customer?.email != "admin@gmail.com") {
                        return (
                          <div className={cx("d-flex justify-content-end")} ref={messagesEndRef}>
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
                              <div className={cx("mx-2", "sent")}>
                                {item?.text}
                              </div>

                              <div>
                                <img
                                  src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                                  alt="notFound"
                                  width={30}
                                  height={30}
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
                                "d-flex align-items-center",
                                "chat_message"
                              )}
                            >
                              <div>
                                <img
                                  src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                                  alt="notFound"
                                  width={30}
                                  height={30}
                                />
                              </div>

                              <div className={cx("mx-2", "received")}>
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
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
 