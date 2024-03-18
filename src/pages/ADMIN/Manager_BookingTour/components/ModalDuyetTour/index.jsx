import className from "classnames/bind";
import styles from "./ModalDuyetTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Modal, Button, Result } from "antd";

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
        title="DUYỆT TOUR"
        open={isShowModalDuyetTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Result
            status="success"
            title="TIẾN HÀNH DUYỆT TOUR"
            subTitle={
              <div className={cx("subTitle")}>
                <div>
                  Khách hàng : <b>phandaicat12032002@gmail.com</b>
                </div>
                <div>
                  Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa -
                  Hạ Long - Sapa
                </div>
              </div>
            }
          />
        </div>
      </Modal>
    </div>
  );
}

export default ModalDuyetTour;
