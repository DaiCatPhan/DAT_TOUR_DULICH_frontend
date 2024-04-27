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

  console.log("dataModalReasonCancel", dataModalReasonCancel);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalReasonCancel(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thông tin hủy tour của khách hàng"
        open={isShowModalReasonCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Khách hàng </div>
              <div className={cx("col-lg-6")}>
                <b>{dataModalReasonCancel?.Customer?.username}</b>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Email </div>
              <div className={cx("col-lg-6")}>
                <b>{dataModalReasonCancel?.Customer?.email}</b>
              </div>
            </div>

            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Số điện thoại </div>
              <div className={cx("col-lg-6")}>
                <b>{dataModalReasonCancel?.Customer?.phone}</b>
              </div>
            </div>

            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>Ngày hủy tour</div>
              <div className={cx("col-lg-6")}>
                <b>22/3/2024</b>
              </div>
            </div>
          </div>
          <div className={cx("my-3")}>
            <div>
              <b>Lí do hủy tour : </b>
            </div>
            <div>
              <TextArea
                rows={4}
                value={dataModalReasonCancel?.reason_cancel_booking}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalReasonCancel;
