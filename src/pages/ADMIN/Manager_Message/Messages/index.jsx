import className from "classnames/bind";
import styles from "./Messages.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import MessageService from "../../../../services/MessageService";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;
import moment from "moment";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function Messages() {
  const [listMessages, setListMessages] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [text, setText] = useState("");
  const [room, setRoom] = useState();
  const [test, setTest] = useState("");
  const [userOne, setUserOne] = useState();
  const [showHeaderRoom, setShowHeaderRoom] = useState("");

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessage]);

  const getListUserComment = async () => {
    const res = await MessageService.listRoomOfAdmin();
    if (res && res.data.EC === 0) {
      setListMessages(res.data.DT);
    }
  };

  const getListRoomOfUser = async (userOne) => {
    const res = await MessageService.listRoomOfUser(`userOne=${userOne}`);
    if (res && res.data.EC == 0) {
      setListMessage(res.data.DT[0]);
    }
  };

  const handleRoomMessageUser = async (data) => {
    console.log("test >>>>>>", data);
    socket.emit("join_room_admin", { room: data?.id });
    setShowHeaderRoom(data.userOneData.username);
    getListRoomOfUser(data?.userOne);
  };

  const sendMessage = async () => {
    const room = listMessage?.id;
    const ID_User = listMessage?.userTwo;

    if (!room) {
      toast.warning("Vui lòng chọn phòng trước khi gửi tin nhắn ");
    }
    const res = await MessageService.create({
      text,
      ID_Room: +room,
      ID_User: ID_User,
    });
    if (res && res.data.EC === 0) {
      getListRoomOfUser(res.data.DT.exitRoom.userOne);
    }
    socket.emit("send_message", { text, room: room, ID_User: ID_User });
    setText("");
  };

  useEffect(() => {
    getListUserComment();
  }, []);

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      console.log("data backend nhan >>> ", data);

      const res = await MessageService.listRoomOfUser(
        `userOne=${data?.ID_User}`
      );
      if (res && res.data.EC == 0) {
        setListMessage(res.data.DT[0]);
      }

      setTest(data.text);
    });
  }, [socket]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <div className={cx("row", "vh_80")}>
          <div className={cx("col-lg-4 border")}>
            <div className={cx("listCard")}>
              <div className={cx("my-2")}>
                <b>Vui lòng chọn phòng chát để tham gia</b>
              </div>
              {listMessages?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={cx("cardMessage")}
                    onClick={() => handleRoomMessageUser(item)}
                  >
                    <div className={cx("circle")}>user</div>
                    <div className={cx("mx-3")}>
                      {item?.userOneData?.username}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {showHeaderRoom ? (
            <div className={cx("col-lg-8 border")}>
              <div className={cx("d-flex justify-content-center")}>
                <div className={cx("formMessage")}>
                  <div className={cx("headerContact")}>
                    Chat với <b>{listMessage?.userOneData?.username}</b>
                  </div>

                  <div
                    className={cx("list", "border", "ScrollStyle")}
                    id="message-container"
                  >
                    {listMessage?.messageData?.map((item) => {
                      if (item?.Customer?.email != "admin@gmail.com") {
                        return (
                          <div
                            className={cx("d-flex justify-content-start")}
                            ref={messagesEndRef}
                          >
                            <div
                              key={item.id}
                              className={cx(
                                "chat_message",
                                "d-flex align-items-center"
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
                      } else {
                        return (
                          <div className={cx("d-flex justify-content-end")}>
                            <div
                              key={item.id}
                              className={cx(
                                "d-flex align-items-center",
                                "chat_message"
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

export default Messages;


