import className from "classnames/bind";
import styles from "./ModalUpdateStatusBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Radio } from "antd";
import { useEffect, useState } from "react";

import CategoryService from "../../../../../services/CategoryService";

function ModalUpdateStatusBooking(props) {
  const {
    isShowModalUpdateStatusBooking,
    setIsShowModalUpdateStatusBooking,
    dataModalUpdateStatusBooking,
    setDataModalUpdateStatusBooking,
    getListBlogs,
  } = props;

  const [value, setValue] = useState(1);
  const [category_STATUS_BOOKING, setCategory_STATUS_BOOKING] = useState([]);
  console.log("category_STATUS_BOOKING >>>>>>>>>>..", category_STATUS_BOOKING);

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
  }, []);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalUpdateStatusBooking(false);
  };

  const onChangeStatus = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
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
          ModalUpdateStatusBooking
          <div className={cx("border")}>
            <Radio.Group onChange={onChangeStatus} value={value}>
              {category_STATUS_BOOKING?.map((item) => {
                return <Radio value={item?.value}>{item?.value}</Radio>;
              })}
            </Radio.Group>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateStatusBooking;
