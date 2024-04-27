import className from "classnames/bind";
import styles from "./ModalUpdateStatusBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Radio } from "antd";
import { useEffect, useState } from "react";

import CategoryService from "../../../../../services/CategoryService";
import BookingService from "../../../../../services/BookingService";

function ModalUpdateStatusBooking(props) {
  const {
    isShowModalUpdateStatusBooking,
    setIsShowModalUpdateStatusBooking,
    dataModalUpdateStatusBooking,
    setDataModalUpdateStatusBooking,
    getListBookingTour,
  } = props;

  const { id } = dataModalUpdateStatusBooking;

  const [status, setStatus] = useState("");
  const [payment_status, setPayment_status] = useState("");

  const [category_STATUS_BOOKING, setCategory_STATUS_BOOKING] = useState([]);
  const [category_STATUS_PAYMENT, setCategory_STATUS_PAYMENT] = useState([]);

  const getCategorys = async () => {
    try {
      const STATUS_BOOKING = await CategoryService.readAllCategory(
        "type=STATUS_BOOKING"
      );
      const STATUS_PAYMENT = await CategoryService.readAllCategory(
        "type=STATUS_PAYMENT"
      );
      if (STATUS_BOOKING && STATUS_BOOKING.data.EC == 0) {
        setCategory_STATUS_BOOKING(STATUS_BOOKING.data.DT.categories);
        setCategory_STATUS_PAYMENT(STATUS_PAYMENT.data.DT.categories);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getCategorys();
    setStatus(dataModalUpdateStatusBooking?.status);
    setPayment_status(dataModalUpdateStatusBooking?.payment_status);
  }, [dataModalUpdateStatusBooking]);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    const data = {
      id: id,
      status: status,
      payment_status: payment_status,
    };
    const res = await BookingService.update(data);
    if (res && res.data.EC == 0) {
      toast.success("Cập nhật trạng thái đặt tour thành công");
      getListBookingTour();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleCancel = () => {
    setIsShowModalUpdateStatusBooking(false);
    setDataModalUpdateStatusBooking({});
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  const onChangeStatus_Payment = (e) => {
    setPayment_status(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        // title="Cập nhật trạng thái đặt tour"
        open={isShowModalUpdateStatusBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <div>
          <div>
            <div className={cx("text-bold")}>Cập nhật trạng thái đặt tour</div>
            <div>
              <Radio.Group
                onChange={onChangeStatus}
                value={status}
                className={cx("d-flex justify-content-around")}
              >
                {category_STATUS_BOOKING?.map((item) => {
                  return (
                    <Radio key={item.id} value={item?.value}>
                      {item?.value}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
          <div className={cx("my-5")}></div>
          <div>
            <div className={cx("text-bold")}>
              Cập nhật trạng thái thanh toán
            </div>
            <div>
              <Radio.Group
                onChange={onChangeStatus_Payment}
                value={payment_status}
                className={cx("d-flex justify-content-around")}
              >
                {category_STATUS_PAYMENT?.map((item) => {
                  return (
                    <Radio key={item.id} value={item?.value}>
                      {item?.value}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateStatusBooking;
