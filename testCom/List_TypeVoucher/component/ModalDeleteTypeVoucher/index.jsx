import className from "classnames/bind";
import styles from "./ModalDeleteTypeVoucher.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalDeleteTypeVoucher(props) {
  const {
    isShowModalDeleteTypeVoucher,
    setIsShowModalDeleteTypeVoucher, 
    dataModalDeleteTypeVoucher,
    setDataModalDeleteTypeVoucher,
    getListBlogs,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDeleteTypeVoucher(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalDeleteTypeVoucher}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>Modal </div>
      </Modal>
    </div>
  );
}

export default ModalDeleteTypeVoucher;
