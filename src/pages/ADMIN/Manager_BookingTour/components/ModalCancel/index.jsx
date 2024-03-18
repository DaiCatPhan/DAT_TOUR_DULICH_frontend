import className from "classnames/bind";
import styles from "./ModalCancel.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Result, Typography } from "antd";
import { useState } from "react";

function ModalCancel(props) {
  const {
    isShowModalCancel,
    setIsShowModalCancel,
    dataModalCancel,
    setDataModalCancel,
    getListBlogs,
  } = props;

  console.log("isShowModalCancel ModalCancel  >>>>>>", isShowModalCancel);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalCancel(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        // title="HỦY TOUR CHO KHÁCH HÀNG"
        title={<div className={cx("text-danger")}>HỦY TOUR CHO KHÁCH HÀNG</div>}
        open={isShowModalCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Result
            status="error"
            title={<div className={cx("text-danger")}>HỦY TOUR </div>}
            // subTitle="Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa - Hạ Long - Sapa"
            subTitle={
              <div className={cx("subTitle")}>
                <div>
                  Khách hàng : <b>phandaicat12032002@gmail.com</b>
                </div>
                <div>
                  Tour Miền Bắc 5N4Đ: Hà Nội - Bái Đính - Tràng An - Hang Múa -
                  Hạ Long - Sapa
                </div>
              </div>
            }
          ></Result>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCancel;
