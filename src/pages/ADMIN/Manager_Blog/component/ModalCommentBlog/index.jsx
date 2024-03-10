import className from "classnames/bind";
import styles from "./ModalCommentBlog.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Descriptions, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useReducer, useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { Input, Table, Popover, message } from "antd";
const { TextArea } = Input;

import CommentService from "../../../../../services/CommentService";
import {
  IconMessage,
  IconPencilMinus,
  IconPointFilled,
  IconTrash,
  IconX,
} from "@tabler/icons-react";

function ModalCommentBlog(props) {
  const {
    isShowModalCommentBlog,
    setIsShowModalCommentBlog,
    dataModalCommentBlog,
    setDataModalCommentBlog,
    getListBlogs,
  } = props;
  dataModalCommentBlog.key = dataModalCommentBlog.id;

  const [listDataComment, setListDataComment] = useState([]);

  useEffect(() => {
    setListDataComment(dataModalCommentBlog?.dataComment?.comments);
  }, [dataModalCommentBlog]);

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [content, setContent] = useState("");
  const [dataReply, setDataReply] = useState({});

  const handleCancel = () => {
    setIsShowModalCommentBlog(false);
    setDataModalCommentBlog({});
  };

  const handleReply = (data) => {
    const { ID_Blog, id } = data;
    const condition = {};
    condition.ID_Blog = ID_Blog;
    condition.ID_Customer = 1;
    condition.parentID = id;
    setDataReply(condition);
  };

  const handleContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitReply = async () => {
    dataReply.content = content;
    const res = await CommentService.createComment(dataReply);

    if (res && res.data.EC == 0) {
      setContent("");
      messageApi.open({
        type: "success",
        content: "Trả lời bình luận thành công ",
      });
      getListBlogs();
      // thêm

      const updatedListDataComment = listDataComment.map((comment) => {
        return {
          ...comment,
          childComment: [...comment.childComment, res.data.DT],
        };
      });

      setListDataComment(updatedListDataComment);
    } else {
      messageApi.open({
        type: "error",
        content: `${res.data.EM}`,
      });
    }
  };

  const handleDeleteComment = async (data) => {
    const { id } = data;
    const res = await CommentService.deleteComment({
      id: id,
      table: "Comment",
    });
    if (res && res.data.EC === 0) {
      messageApi.open({
        type: "success",
        content: "Xóa bình luận thành công",
      });
      getListBlogs();
      const updatedListDataComment = listDataComment.map((comment) => {
        const updatedChildComment = comment.childComment.filter(
          (childComment) => childComment.id !== id
        );

        return {
          ...comment,
          childComment: updatedChildComment,
        };
      });

      setListDataComment(updatedListDataComment);
    } else {
      messageApi.open({
        type: "error",
        content: `${res.data.EM}`,
      });
    }
  };

  const contentMain = (
    <div className={cx("reply")}>
      <TextArea value={content} rows={4} onChange={handleContent} />
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
      dataIndex: "",
      key: "username",
      render: (comments) => {
        return <div>{comments?.customer?.username}</div>;
      },
    },
    {
      title: "Nội dung bình luận",
      dataIndex: "content",
      key: "content",
      width: 400,
    },
    {
      title: "nội dung trả lời",
      dataIndex: "",
      key: "reply",
      width: 400,
      render: (comments) => {
        return (
          <div>
            <div>
              {comments?.childComment?.map((item) => {
                return (
                  <div className={cx("d-flex justify-content-between my-2")}>
                    <div className={cx("d-flex")}>
                      <div className={cx("mx-2")}>
                        <IconPointFilled width={14} height={14} />
                      </div>
                      <div className={cx("text-grey")}> {item?.content}</div>
                    </div>
                    <div>
                      <IconX
                        className={cx("poiter")}
                        width={13}
                        height={13}
                        color="red"
                        onClick={() => handleDeleteComment(item)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
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
      {contextHolder}
      <Modal
        title="Thêm bài đăng mới"
        open={isShowModalCommentBlog}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1100}
        style={{ top: 15 }}
        okButtonProps={{ hidden: true }}
        maskClosable={false}
      >
        <div>
          <Table dataSource={listDataComment} columns={columns} bordered />
        </div>
      </Modal>
    </div>
  );
}

export default ModalCommentBlog;
