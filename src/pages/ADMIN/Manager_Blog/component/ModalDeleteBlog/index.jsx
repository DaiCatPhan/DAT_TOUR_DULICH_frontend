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

import BlogService from "../../../../../services/BlogService";

function ModalDeleteBlog(props) {
  const {
    isShowModalDeleteBlog,
    setIsShowModalDeleteBlog,
    dataModalDeleteBlog,
    setDataModalDeleteBlog,
    getListBlogs,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await BlogService.deleteBlog({
      id: dataModalDeleteBlog?.id,
      table: "Blog",
    });
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListBlogs();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setIsShowModalDeleteBlog(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Xóa bài đăng"
        open={isShowModalDeleteBlog}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "red", borderColor: "red" } }}
      >
        <div>
          <div>
            Bạn có chắc chắc muốn bài đăng <b>{dataModalDeleteBlog?.title}</b>
          </div>
          <div>Lưu ý : Hành động không thể hoàn tác !!!!</div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDeleteBlog;
