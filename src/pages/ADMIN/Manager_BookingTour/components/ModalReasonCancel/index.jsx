import className from "classnames/bind";
import styles from "./ModalReasonCancel.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalReasonCancel(props) {
  const {
    isShowModalReasonCancel,
    setIsShowModalReasonCancel,
    dataModalReasonCancel,
    setDataModalReasonCancel,
    getListBlogs,
  } = props;

  console.log("isShowModalReasonCancel ModalReasonCancel  >>>>>>", isShowModalReasonCancel);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalReasonCancel(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalReasonCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>ModalReasonCancel </div>
      </Modal>
    </div>
  );
}

export default ModalReasonCancel;
