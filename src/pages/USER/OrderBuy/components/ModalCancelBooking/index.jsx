import className from "classnames/bind";
import styles from "./ModalCancelBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { Input } from "antd";
import { useState } from "react";
const { TextArea } = Input;

import BookingService from "../../../../../services/BookingService";

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

  const handleOk = async () => {
    if (!textAreaValue) {
      toast.warning("Vui lòng điền lí do hủy tour !!!");
      return;
    }
    const data = {
      id: dataModalCancelBooking.id,
      status: "ĐÃ HỦY",
      cancel_booking: "1",
      date_cancel_booking: new Date(),
      reason_cancel_booking: textAreaValue,
    };

    const res = await BookingService.createCancelBooking(data);
    if (res && res.data.EC == 0) {
      toast.success("Hủy tour thành công");
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleCancel = () => {
    setIsShowModalCancelBooking(false);
    getListBookingTour();
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
            <b>MÃ ĐẶT TOUR: {dataModalCancelBooking.id}</b>
          </div>
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
