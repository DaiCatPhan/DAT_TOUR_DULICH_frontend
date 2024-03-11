import className from "classnames/bind";
import styles from "./ModalDeleteCustomer.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);

import CustomerService from "../../../../services/CustomerService";

import { toast } from "react-toastify";
import { Modal } from "antd";

function ModalDeleteCustomer(props) {
  const {
    isShowModalDeleteCustomer,
    setIsShowModalDeleteCustomer,
    dataModalDeleteCustomer,
    setDataModalDeleteCustomer,
    getListCustomers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {}, []);

  const handleOk = async () => {
    const data = {
      id: dataModalDeleteCustomer?.id,
      table: "Customer",
    };
    setConfirmLoading(true);

    const res = await CustomerService.deleteCus(data);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListCustomers();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsShowModalDeleteCustomer(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Xóa tài khoản khách hàng "
        open={isShowModalDeleteCustomer}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div>
            Bạn có chắc chắn muốn xóa tài khoản
            <b className={cx("mx-2")}>{dataModalDeleteCustomer?.username}</b>
          </div>
          <div className={cx("my-2 ")}>
            Lưu ý hành động không thể hoàn tác !!
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDeleteCustomer;
