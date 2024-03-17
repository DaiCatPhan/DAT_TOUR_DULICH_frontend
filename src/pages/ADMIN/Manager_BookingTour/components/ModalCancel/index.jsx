import className from "classnames/bind";
import styles from "./ModalCancel.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalCancel(props) {
  const {
    isShowModalCancel,
    setIsShowModalCancel,
    dataModalCancel,
    setDataModalCancel,
    getListBlogs,
  } = props;

  console.log("isShowModalCancel ModalCancel  >>>>>>", isShowModalCancel);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalCancel(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>ModalCancel </div>
      </Modal>
    </div>
  );
}

export default ModalCancel;
