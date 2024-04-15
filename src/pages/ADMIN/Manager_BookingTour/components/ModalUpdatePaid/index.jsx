import className from "classnames/bind";
import styles from "./ModalUpdatePaid.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal, Result } from "antd";
import { useEffect, useState } from "react";

import BookingService from "../../../../../services/BookingService";

function ModalUpdatePaid(props) {
  const {
    isShowModalUpdatePaid,
    setIsShowModalUpdatePaid,
    dataModalUpdatePaid,
    setDataModalUpdatePaid,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    const data = {
      id: dataModalUpdatePaid.id,
      payment_status: "ĐÃ THANH TOÁN",
    };
    const res = await BookingService.updatePaid(data);
    console.log("res >>>>>>>", res);
    if (res && res.data.EC == 0) {
      toast.success("Cập nhật thanh toán tour thành công");
      getListBookingTour();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleCancel = () => {
    setIsShowModalUpdatePaid(false);
    setDataModalUpdatePaid({});
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapper")}>
        <Modal
          title={
            <div className={cx("text-success")}>
              CẬP NHẬT ĐÃ THANH TOÁN ĐƠN HÀNG
            </div>
          }
          open={isShowModalUpdatePaid}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div>
            <Result
              status="success"
              title={
                <div className={cx("text-success")}>
                  ĐÃ THANH TOÁN MÃ TOUR : {dataModalUpdatePaid.id}
                </div>
              }
              // subTitle="Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa - Hạ Long - Sapa"
              subTitle={
                <div className={cx("subTitle")}>
                  <div>
                    Khách hàng : <b>phandaicat12032002@gmail.com</b>
                  </div>
                  <div>
                    Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa
                    - Hạ Long - Sapa
                  </div>
                </div>
              }
            ></Result>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ModalUpdatePaid;
