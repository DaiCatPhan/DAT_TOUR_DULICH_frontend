import className from "classnames/bind";
import styles from "./ModalDuyetTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalDuyetTour(props) {
  const {
    isShowModalDuyetTour,
    setIsShowModalDuyetTour,
    dataModalDuyetTour,
    setDataModalDuyetTour,
    getListBlogs,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDuyetTour(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalDuyetTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>ModalDuyetTour </div>
      </Modal>
    </div>
  );
}

export default ModalDuyetTour;
