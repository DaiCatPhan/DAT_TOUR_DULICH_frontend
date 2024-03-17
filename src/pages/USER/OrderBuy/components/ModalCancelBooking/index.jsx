import className from "classnames/bind";
import styles from "./ModalCancelBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { Input } from "antd";
import { useState } from "react";
const { TextArea } = Input;

function ModalCancelBooking(props) {
  const {
    isShowModalCancelBooking,
    setIsShowModalCancelBooking,
    dataModalCancelBooking,
    setDataModalCancelBooking,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalCancelBooking(false);
  };

  const handleTextAreaChange = (e) => {
    console.log(e.target.value);
    setTextAreaValue(e.target.value); // Cập nhật giá trị của TextArea
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        open={isShowModalCancelBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <div className={cx("cancelBooking")}>
          <h4 className={cx("text-center text-danger")}>YÊU CẦU HỦY TOUR</h4>
          <div>
            <div className={cx("titleReason")}>Lí do hủy tour</div>
            <TextArea
              rows={5}
              value={textAreaValue}
              onChange={handleTextAreaChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCancelBooking;
