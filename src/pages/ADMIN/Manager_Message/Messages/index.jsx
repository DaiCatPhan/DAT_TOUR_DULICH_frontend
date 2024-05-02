import className from "classnames/bind";
import styles from "./Messages.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import MessageService from "../../../../services/MessageService";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;
import moment from "moment";
import { Badge } from "antd";

import { io } from "socket.io-client";
import { IconArrowRight, IconCirclePlus, IconUser } from "@tabler/icons-react";
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
  const [keyActive, setKeyActive] = useState("");

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
    setKeyActive(data.id);
    socket.emit("join_room_admin", { room: data?.id });
    setShowHeaderRoom(data.userOneData.username);
    getListRoomOfUser(data?.userOne);

    const res = await MessageService.update({
      ID_Room: data.id,
      ID_User: data.userOne,
    });

    getListUserComment();
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

      await MessageService.update({
        ID_Room: room,
        ID_User: res.data.DT.exitRoom.userOne,
      });

      getListUserComment();
    }
    socket.emit("send_message", { text, room: room, ID_User: ID_User });
    setText("");
  };

  useEffect(() => {
    getListUserComment();
  }, []);

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      console.log("data", data);

      const res = await MessageService.listRoomOfUser(
        `userOne=${data?.ID_User}`
      );
      if (res && res.data.EC == 0) {
        setListMessage(res.data.DT[0]);
      }

      setTest(data.text);
    });

    socket.on("fetch", async () => {
      getListUserComment();
    });
  }, [socket]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("frame")}>
        <div className={cx("row")}>
          <div className={cx("col-lg-3 p-0", "border_b2b3b4")}>
            <div className={cx("listUser")}>
              <div className={cx("title")}>
                <b>Vui lòng chọn phòng chát để tham gia</b>
              </div>

              <div className={cx("mx-2")}>
                {listMessages?.map((item) => {
                  return (
                    <Badge
                      count={item?.count}
                      key={item.id}
                      className={cx("w-100")}
                    >
                      <div
                        key={item.id}
                        className={cx("cardMessage", {
                          active: item.id == keyActive,
                        })}
                        onClick={() => handleRoomMessageUser(item)}
                      >
                        <div className={cx("circle")}>
                          <IconUser color="white" />
                        </div>
                        <div className={cx("mx-3", "name")}>
                          {item?.userOneData?.username}
                        </div>
                      </div>
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          {showHeaderRoom ? (
            <div className={cx("col-lg-9  p-0", "border_b2b3b4")}>
              <div className={cx("formMessage")}>
                <div className={cx("headerContact")}>
                  Chat với{" "}
                  <b className={cx("mx-2")}>
                    {listMessage?.userOneData?.username}
                  </b>
                </div>

                <div className={cx("list")}>
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
                            <div className={cx("circleCustomer")}>
                              <IconUser />
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
                            <div className={cx("content", "sent")}>
                              {item?.text}
                            </div>
                            <div className={cx("circleAD")}>AD</div>
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
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
