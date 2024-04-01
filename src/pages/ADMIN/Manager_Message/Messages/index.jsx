import className from "classnames/bind";
import styles from "./Messages.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import MessageService from "../../../../services/MessageService";
import { useEffect, useState } from "react";
import { Button, Input } from "antd";
const { TextArea } = Input;

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:3000", {
  transports: ["websocket"],
});

function Messages() {
  const [listMessages, setListMessages] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [text, setText] = useState("");

  const getListUserComment = async () => {
    const res = await MessageService.listRoomOfAdmin();
    if (res && res.data.EC === 0) {
      setListMessages(res.data.DT);
    }
  };

  const sendMessage = () => {
    const room = listMessage?.id;
    const ID_User = listMessage?.userTwo;
    const ID_UserOne = listMessage?.userOne;
    if (!room) {
      toast.warning("Vui lòng chọn phòng trước khi gửi tin nhắn ");
    }
    socket.emit("send_message", { text, room: room, ID_User: ID_User });
    setText("");
  };

  useEffect(() => {
    getListUserComment();
  }, []);

  const handleRoomMessageUser = async (data) => {
    const res = await MessageService.listRoomOfUser(`userOne=${data?.userOne}`);
    if (res && res.data.EC === 0) {
      setListMessage(res.data.DT[0]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", async (data) => {
      if (data && data.id) {
        const res = await MessageService.listRoomOfUser(
          `userOne=${data?.exitRoom?.userOne}`
        );
        if (res && res.data.EC == 0) {
          setListMessage(res.data.DT[0]);
        }
      }
    });
  }, [socket]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-5 border")}>
          <div className={cx("listMessage")}>
            {listMessages?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cx("frame")}
                  onClick={() => handleRoomMessageUser(item)}
                >
                  <div></div>
                  <div>Phan dai Cat</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={cx("col-lg-7")}>
          <div className={cx("formMessage")}>
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
                    <div
                      key={item.id}
                      className={cx("chat_message", "received")}
                    >
                      {item?.text}
                    </div>
                  );
                }
              })}
            </div>

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
      </div>
    </div>
  );
}

export default Messages;
