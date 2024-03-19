import className from "classnames/bind";
import styles from "./ModalDuyetTour.module.scss";
const cx = className.bind(styles);

import { ToastContainer, toast } from "react-toastify";
import { Modal, Button, Result } from "antd";
import { useState } from "react";

import BookingService from "../../../../../services/BookingService";

function ModalDuyetTour(props) {
  const {
    isShowModalDuyetTour,
    setIsShowModalDuyetTour,
    dataModalDuyetTour,
    setDataModalDuyetTour,
    getListBookingTour,
  } = props;

  const { id } = dataModalDuyetTour;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    const data = {
      id: id,
      status: "ĐÃ DUYỆT",
      date_cancel_booking: new Date(),
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
        width={600}
      >
        <div>
          <Result
            status="success"
            title="TIẾN HÀNH DUYỆT TOUR"
            subTitle={
              <div className={cx("subTitle")}>
                <div className={cx("row")}>
                  <div className={cx("col-lg-3")}>Khách hàng </div>
                  <div className={cx("col-lg-9")}>
                    <b>phandaicat12032002@gmail.com</b>
                  </div>
                </div>
                <div className={cx("row")}>
                  <div className={cx("col-lg-3")}>Ngày đặt </div>
                  <div className={cx("col-lg-9")}>
                    <b>22/3/2024</b>
                  </div>
                </div>
                <div className={cx("row")}>
                  <div className={cx("col-lg-3")}>Tên tour</div>
                  <div className={cx("col-lg-9")}>
                    Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa
                    - Hạ Long - Sapa
                  </div>
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
