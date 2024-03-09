import className from "classnames/bind";
import styles from "./ModalCommentBlog.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Descriptions, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { Input, Table, Popover } from "antd";
const { TextArea } = Input;

import CommentService from "../../../../../services/CommentService";
import { IconMessage, IconPencilMinus, IconTrash } from "@tabler/icons-react";

function ModalCommentBlog(props) {
  const {
    isShowModalCommentBlog,
    setIsShowModalCommentBlog,
    dataModalCommentBlog,
    setDataModalCommentBlog,
    getListBlogs,
  } = props;
  dataModalCommentBlog.key = dataModalCommentBlog.id;

  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content, setContent] = useState("");
  const [dataReply, setDataReply] = useState({});

  const handleClose = () => {};

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await CommentService.createComment();
    if (res && res.data.EC === 0 && res.data.DT.id) {
      toast.success(res.data.EM);
      handleClose();
      getListBlogs();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsShowModalCommentBlog(false);
  };

  const handleReply = (data) => {
    const { ID_Blog, id } = data;
    const condition = {};
    condition.ID_Blog = ID_Blog;
    condition.ID_Customer = 1;
    condition.id = id;
    setDataReply(condition);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitReply = async () => {
    dataReply.content = content;
    console.log("dataReply", dataReply);
    // API tạo comment , nhưng mà bị 2 bảng nên ch biết làm sao
  };

  const contentMain = (
    <div className={cx("reply")}>
      <TextArea rows={4} onChange={handleContent} />
      <div className={cx("d-flex justify-content-end  mt-1")}>
        <button
          onClick={handleSubmitReply}
          className={cx("btn btn-primary  px-4")}
        >
          Đăng
        </button>
      </div>
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      width: 400,
    },

    {
      title: "Trả lời comment",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex ")}>
            <Popover content={contentMain} title="Trả lời" trigger="click">
              <IconMessage
                onClick={() => handleReply(record)}
                color="blue"
                width={25}
                height={25}
                className={cx("poiter")}
              />
            </Popover>
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thêm bài đăng mới"
        open={isShowModalCommentBlog}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1100}
        style={{ top: 15 }}
        okButtonProps={{ hidden: true }}
        maskClosable={false}
      >
        <div>
          <Table
            dataSource={dataModalCommentBlog?.dataComment?.comments}
            columns={columns}
            bordered
          />
        </div>
      </Modal>
    </div>
  );
}

export default ModalCommentBlog;
