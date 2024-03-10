import className from "classnames/bind";
import styles from "./List_Blog.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import Function from "../../../../components/Functions/function";

import { ClockCircleOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";

import {
  IconList,
  IconTrash,
  IconPencilMinus,
  IconMessage,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Button, Modal, Table, Input, Form, DatePicker } from "antd";
import { AudioOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);

import BlogService from "../../../../services/BlogService";
import ModalCreateBlog from "../component/ModalCreateBlog";
import ModalUpdateBlog from "../component/ModalUpdateBlog";
import ModalDeleteBlog from "../component/ModalDeleteBlog";
import ModalCommentBlog from "../component/ModalCommentBlog";

function List_Blog() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listBlog, setListBlog] = useState([]);

  // GOI API LAY LIST TOUR
  const getListBlogs = async () => {
    const res = await BlogService.readAllBlog(
      `page=${current}&limit=${pageSize}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.blogs.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListBlog(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  useEffect(() => {
    getListBlogs();
  }, [current, pageSize]);

  // modal update tour , delete tour , update processTour
  const [isShowModalUpdateBlog, setIsShowModalUpdateBlog] = useState(false);
  const [dataModalUpdateBlog, setDataModalUpdateBlog] = useState({});
  const [isShowModalDeleteBlog, setIsShowModalDeleteBlog] = useState(false);
  const [dataModalDeleteBlog, setDataModalDeleteBlog] = useState({});
  const [isShowModalCreateBlog, setIsShowModalCreateBlog] = useState(false);
  const [dataModalCreateBlog, setDataModalCreateBlog] = useState({});
  const [isShowModalCommentBlog, setIsShowModalCommentBlog] = useState(false);
  const [dataModalCommentBlog, setDataModalCommentBlog] = useState({});

  const handleModalUpdateBlog = (data) => {
    setIsShowModalUpdateBlog(true);
    setDataModalUpdateBlog(data);
  };
  const handleModalDeleteBlog = (data) => {
    setIsShowModalDeleteBlog(true);
    setDataModalDeleteBlog(data);
  };
  const handleModalCreateBlog = async () => {
    setIsShowModalCreateBlog(true);
    setDataModalCreateBlog(data);
  };
  const handleModalCommentBlog = async (data) => {
    setIsShowModalCommentBlog(true);
    setDataModalCommentBlog(data);
  };

  const columns = [
    {
      title: "Mã bài đăng",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "Hình ảnh ",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Image"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Tên bài đăng",
      dataIndex: "title",
      key: "title",
      width: 220,
    },
    {
      title: "Mô tả",
      dataIndex: "shortdescription",
      key: "shortdescription",
      width: 450,
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <div>{Function.formatDateMoment(createdAt || 0)}</div>
      ),
    },

    {
      title: "Bình luận",
      key: "comment",
      render: (listBlog) => {
        return (
          <div className={cx("poiter d-flex")}>
            <Badge count={listBlog?.dataComment?.totalRows || 0}>
              <IconMessage
                onClick={() => handleModalCommentBlog(listBlog)}
                color="blue"
                width={25}
                height={25}
                className={cx("poiter")}
              />
            </Badge>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <IconTrash
              onClick={() => handleModalDeleteBlog(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            />
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateBlog(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
    },
  ];

  const onFinishFormSearch = async (values) => {
    const { title, createdAt } = values;
    const date_createdAt = createdAt?.$d;
    const res = await BlogService.readAllBlog(
      `title=${title || ""}&createdAt=${date_createdAt || ""}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.blogs.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListBlog(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border")}>
        <div
          className={cx(
            "title",
            "border d-flex justify-content-between align-items-center "
          )}
        >
          <div className={cx("d-flex")}>
            <div>
              <IconList />
            </div>
            <div className={cx("mx-2")}>Danh sách bài đăng</div>
          </div>

          <div className={cx("d-flex")}>
            <button
              className={cx("btn btn-success")}
              onClick={handleModalCreateBlog}
            >
              Thêm bài đăng
            </button>
          </div>
        </div>
        <div className={cx("p-3")}>
          <div>
            <Form name="basic" onFinish={onFinishFormSearch}>
              <div className={cx("row w-75 m-auto")}>
                <div className={cx("col-lg-6")}>
                  <Form.Item label="Tên bài đăng" name="title">
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("col-lg-4")}>
                  <Form.Item label="Ngày tạo" name="createdAt">
                    <DatePicker format={"DD-MM-YYYY"} />
                  </Form.Item>
                </div>
                <div className={cx("col-lg-2")}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={cx("w-100")}
                    >
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
          <Table dataSource={listBlog} columns={columns} bordered />
        </div>
      </div>
      <ModalCreateBlog
        isShowModalCreateBlog={isShowModalCreateBlog}
        setIsShowModalCreateBlog={setIsShowModalCreateBlog}
        dataModalCreateBlog={dataModalCreateBlog}
        setDataModalCreateBlog={setDataModalCreateBlog}
        getListBlogs={getListBlogs}
      />
      <ModalUpdateBlog
        isShowModalUpdateBlog={isShowModalUpdateBlog}
        setIsShowModalUpdateBlog={setIsShowModalUpdateBlog}
        dataModalUpdateBlog={dataModalUpdateBlog}
        setDataModalUpdateBlog={setDataModalUpdateBlog}
        getListBlogs={getListBlogs}
      />
      <ModalDeleteBlog
        isShowModalDeleteBlog={isShowModalDeleteBlog}
        setIsShowModalDeleteBlog={setIsShowModalDeleteBlog}
        dataModalDeleteBlog={dataModalDeleteBlog}
        setDataModalDeleteBlog={setDataModalDeleteBlog}
        getListBlogs={getListBlogs}
      />
      <ModalCommentBlog
        isShowModalCommentBlog={isShowModalCommentBlog}
        setIsShowModalCommentBlog={setIsShowModalCommentBlog}
        dataModalCommentBlog={dataModalCommentBlog}
        setDataModalCommentBlog={setDataModalCommentBlog}
        getListBlogs={getListBlogs}
      />
    </div>
  );
}

export default List_Blog;
