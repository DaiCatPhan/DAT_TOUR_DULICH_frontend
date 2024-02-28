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
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalUpdateBlog(props) {
  const {
    isShowModalUpdateBlog,
    setIsShowModalUpdateBlog,
    dataModalUpdateBlog,
    setDataModalUpdateBlog,
    getListBlogs,
  } = props;

  const [imageUrl, setImageUrl] = useState();
  const [imageTour, setImageTour] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [spin, setSpin] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalUpdateBlog(false);
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

  // TAO IMAGE
  const upLoadImageTour = async () => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    const id_tour = TOUR_localStorage.id;

    if (!id_tour) {
      return toast.warning("Vui lòng tạo tour trước !!!");
    }

    if (!imageTour) {
      return toast.error("Vui lòng chọn ảnh !!!");
    }

    const formData = new FormData();
    formData.append("image", imageTour);
    formData.append("ID_Tour", id_tour);

    setSpin(true);
    const res = await TourService.uploadImageTour(formData);
    if (res && res.data.EC === 0) {
      toast.success("Cập nhật hình ảnh thành công");
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
    setSpin(false);
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
              <Input placeholder="Tên bài đăng" />
            </div>
            <div className={cx("col-lg-6")}>
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
              <TextArea rows={4} />
            </div>
          </div>
          <div className={cx("my-4")}>
            <div>Nội dung bài đăng</div>
            <div>
              <MdEditor
                style={{ minHeight: "550px", maxHeight: "750px" }}
                renderHTML={(text) => mdParser.render(text)}
                // onChange={handleEditorChange_ProcessTour}
                // value={processTour_TEXT}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateBlog;
