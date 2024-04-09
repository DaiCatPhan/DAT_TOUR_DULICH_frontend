import className from "classnames/bind";
import styles from "./ModalChartTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { useState } from "react";

function ModalChartTour(props) {
  const {
    isShowModalChartTour,
    setIsShowModalChartTour,
    dataModalChartTour,
    setDataModalChartTour,
  } = props;


  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalChartTour(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        open={isShowModalChartTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>ModalChartTour </div>
      </Modal>
    </div>
  );
}

export default ModalChartTour;
