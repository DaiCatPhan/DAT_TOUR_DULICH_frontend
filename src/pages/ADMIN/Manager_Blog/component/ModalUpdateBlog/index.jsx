import className from "classnames/bind";
import styles from "./ModalUpdateBlog.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";

import { Button, Modal, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Input } from "antd";
const { TextArea } = Input;

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import Spin from "../../../../../components/Spin";

import BlogService from "../../../../../services/BlogService";

function ModalUpdateBlog(props) {
  const {
    isShowModalUpdateBlog,
    setIsShowModalUpdateBlog,
    dataModalUpdateBlog,
    setDataModalUpdateBlog,
    getListBlogs,
  } = props;
  console.log(dataModalUpdateBlog);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);

  // data

  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [shortdescription, setShortdescription] = useState("");
  const [image, setImage] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageTour, setImageTour] = useState("");
  const [contentTEXT, setContentTEXT] = useState("");
  const [contentHTML, setContentHTML] = useState("");

  useEffect(() => {
    setId(dataModalUpdateBlog?.id);
    setTitle(dataModalUpdateBlog?.title);
    setShortdescription(dataModalUpdateBlog?.shortdescription);
    setImage(dataModalUpdateBlog?.image);
    setContentTEXT(dataModalUpdateBlog?.contentTEXT);
    setContentHTML(dataModalUpdateBlog?.contentHTML);
  }, [dataModalUpdateBlog]);

  const handleOk = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("shortdescription", shortdescription);
    formData.append("contentTEXT", contentTEXT);
    formData.append("contentHTML", contentHTML);
    formData.append("image", imageTour);

    setConfirmLoading(true);
    const res = await BlogService.updateBlog(formData);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListBlogs();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setIsShowModalUpdateBlog(false);
    setDataModalUpdateBlog({});
  };

  function handleEditorChange_Blog({ html, text }) {
    setContentTEXT(html);
    setContentHTML(text);
  }

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

  const handleTitleBlog = async (e) => {
    setTitle(e?.target?.value);
  };

  const handleDesBlog = async (e) => {
    setShortdescription(e?.target?.value);
  };

  const handleChangeUpload = (info) => {
    setImageTour(info.file.originFileObj);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalUpdateBlog}
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
            <div className={cx("col-lg-6")}>
              <div className={cx("my-2")}>Tên bài đăng</div>
              <Input
                placeholder="Tên bài đăng"
                value={title}
                onChange={handleTitleBlog}
              />
            </div>
            <div className={cx("col-lg-6")}>
              <div className={cx("text-center")}>
                <p>Cập nhật ảnh </p>
                <div className={cx("text-center")}>
                  <div className={cx("d-flex justify-content-center")}>
                    <div className={cx("mx-4")}>
                      <img
                        width={100}
                        height={103}
                        src={image}
                        alt="notFound"
                        className={cx("rounded")}
                      />
                    </div>
                    <div>
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
                            className={cx("w-100")}
                            height={100}
                          />
                        ) : (
                          uploadButton
                        )}
                      </Upload>
                    </div>
                  </div>
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
                value={shortdescription}
                onChange={handleDesBlog}
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

export default ModalUpdateBlog;
