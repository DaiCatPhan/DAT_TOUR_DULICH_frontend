import className from "classnames/bind";
import styles from "./ModalDeleteTour.module.scss";
const cx = className.bind(styles);
import { useState } from "react";
import { Button, Modal } from "antd";

function ModalDeleteTour(props) {
  const {
    isShowModalDeleteTour,
    setIsShowModalDeleteTour,
    dataModalDeleteTour,
    getListTours,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    // Gọi API
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setIsShowModalDeleteTour(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Xóa thông tin tour "
        open={isShowModalDeleteTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>Cập nhật thông tin Tour</div>
      </Modal>
    </div>
  );
}

export default ModalDeleteTour;
