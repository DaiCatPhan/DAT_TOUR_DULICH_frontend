import className from "classnames/bind";
import styles from "./ModalEvalBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { useState } from "react";
const { TextArea } = Input;
function ModalEvalBooking(props) {
  const {
    isShowModalEvalBooking,
    setIsShowModalEvalBooking,
    dataModalEvalBooking,
    setDataModalEvalBooking,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const handleTextAreaChange = (e) => {
    console.log(e.target.value);
    setTextAreaValue(e.target.value); // Cập nhật giá trị của TextArea
  };
  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalEvalBooking(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalEvalBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <div>
          <div className={cx("cancelEval")}>
            <h4 className={cx("text-center text-warning")}>ĐÁNH GIÁ TOUR</h4>
            <div>
              <div className={cx("titleReason")}>
                Hãy để lại cảm nhận và đánh giá của bạn
              </div>
              <TextArea
                rows={5}
                value={textAreaValue}
                onChange={handleTextAreaChange}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEvalBooking;
