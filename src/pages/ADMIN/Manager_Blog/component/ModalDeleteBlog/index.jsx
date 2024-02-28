import className from "classnames/bind";
import styles from "./ModalDeleteBlog.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalDeleteBlog(props) {
  const {
    isShowModalDeleteBlog,
    setIsShowModalDeleteBlog,
    dataModalDeleteBlog,
    setDataModalDeleteBlog,
    getListBlogs,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDeleteBlog(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalDeleteBlog}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>Modal </div>
      </Modal>
    </div>
  );
}

export default ModalDeleteBlog;
