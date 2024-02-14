import className from "classnames/bind";
import styles from "./ModalUpdateTour.module.scss";
const cx = className.bind(styles);

import { Button, Modal } from "antd";
import { useState } from "react";

function ModalUpdateTour(props) {
  const {
    isShowModalUpdateTour,
    setIsShowModalUpdateTour,
    dataModalUpdateTour,
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
    setIsShowModalUpdateTour(false); 
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Cập nhật thông tin tour "
        open={isShowModalUpdateTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>Cập nhật thông tin Tour</div>
      </Modal>
    </div>
  );
}

export default ModalUpdateTour;
