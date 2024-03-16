import className from "classnames/bind";
import styles from "./ModalEvalBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalEvalBooking(props) {
  const {
    isShowModalEvalBooking,
    setIsShowModalEvalBooking,
    dataModalEvalBooking,
    setDataModalEvalBooking,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalEvalBooking(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalEvalBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>ModalEvalBooking </div>
      </Modal>
    </div>
  );
}

export default ModalEvalBooking;
