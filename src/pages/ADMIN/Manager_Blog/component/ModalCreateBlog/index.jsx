import className from "classnames/bind";
import styles from "./ModalCreateBlog.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Descriptions, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { Input } from "antd";
const { TextArea } = Input;

import BlogService from "../../../../../services/BlogService";

function ModalCreateBlog(props) {
  const {
    isShowModalCreateBlog,
    setIsShowModalCreateBlog,
    dataModalCreateBlog,
    setDataModalCreateBlog,
    getListBlogs,
  } = props;

  const [imageUrl, setImageUrl] = useState();
  const [imageTour, setImageTour] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);

  const [title, setTitle] = useState("");
  const [shortdescription, setShortdescription] = useState("");
  const [contentTEXT, setContentTEXT] = useState("");
  const [contentHTML, setContentHTML] = useState("");

  const handleClose = () => {
    setTitle("");
    setShortdescription("");
    setContentTEXT("");
    setContentHTML("");
    setImageTour("");
    setImageUrl("");
  };

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("shortdescription", shortdescription);
    formData.append("contentTEXT", contentTEXT);
    formData.append("contentHTML", contentHTML);
    formData.append("image", imageTour);

    setConfirmLoading(true);
    const res = await BlogService.createBlog(formData);
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
    setIsShowModalCreateBlog(false);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </button>
  );

  const handleChangeUpload = (info) => {
    setImageTour(info.file.originFileObj);
  };

  const handleTitleBlog = async (e) => {
    setTitle(e?.target?.value);
  };

  const handleDesBlog = async (e) => {
    setShortdescription(e?.target?.value);
  };

  function handleEditorChange_Blog({ html, text }) {
    setContentHTML(html);
    setContentTEXT(text);
  }

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thêm bài đăng mới"
        open={isShowModalCreateBlog}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1100}
        style={{ top: 15 }}
      >
        <div>
          <div
            className={cx("d-flex align-items-center justify-content-between")}
          >
            <div className={cx("col-lg-7")}>
              <div className={cx("my-2")}>Tên bài đăng</div>
              <Input
                placeholder="Tên bài đăng"
                onChange={handleTitleBlog}
                value={title}
              />
            </div>
            <div className={cx("col-lg-5")}>
              <div className={cx("text-center")}>
                <p>Chọn ảnh tour</p>
                <div className={cx("text-center")}>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={handleChangeUpload}
                    maxCount={1}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
                {spin && <Spin />}
              </div>
            </div>
          </div>
          <div>
            <div>Mô tả ngắn</div>
            <div>
              <TextArea
                rows={4}
                onChange={handleDesBlog}
                value={shortdescription}
              />
            </div>
          </div>
          <div className={cx("my-4")}>
            <div>Nội dung bài đăng</div>
            <div>
              <MdEditor
                style={{ minHeight: "550px", maxHeight: "750px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange_Blog}
                value={contentTEXT}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateBlog;
