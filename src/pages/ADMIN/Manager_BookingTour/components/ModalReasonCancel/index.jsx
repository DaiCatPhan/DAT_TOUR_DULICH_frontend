import className from "classnames/bind";
import styles from "./ModalReasonCancel.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

function ModalReasonCancel(props) {
  const {
    isShowModalReasonCancel,
    setIsShowModalReasonCancel,
    dataModalReasonCancel,
    setDataModalReasonCancel,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalReasonCancel(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalReasonCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Khách hàng</div>
            </div>
            <div>
              Email : <b>phandaicat12032002@gmail.com</b>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Thời gian hủy tour</div>
              <div className={cx("col-lg-6")}>
                <b>22/3/2024</b>
              </div>
            </div>
          </div>
          <div>
            <div>Lí do hủy tour</div>
            <div>
              <TextArea rows={4} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalReasonCancel;
