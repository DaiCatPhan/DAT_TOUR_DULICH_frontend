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

  const [category_STATUS_BOOKING, setCategory_STATUS_BOOKING] = useState([]);

  const getCategorys = async () => {
    try {
      const STATUS_BOOKING = await CategoryService.readAllCategory(
        "type=STATUS_BOOKING"
      );
      if (STATUS_BOOKING && STATUS_BOOKING.data.EC == 0) {
        setCategory_STATUS_BOOKING(STATUS_BOOKING.data.DT.categories);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getCategorys();
    setStatus(dataModalUpdateStatusBooking?.status);
  }, [dataModalUpdateStatusBooking]);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    const data = {
      id: id,
      status: status,
    };
    const res = await BookingService.update(data);
    console.log("res >>>>>>>", res);
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
    console.log("radio checked", e.target.value);
    setStatus(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Cập nhật trạng thái đặt tour"
        open={isShowModalUpdateStatusBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
      >
        <div>
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
      </Modal>
    </div>
  );
}

export default ModalUpdateStatusBooking;
