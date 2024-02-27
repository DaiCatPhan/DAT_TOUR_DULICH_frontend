import className from "classnames/bind";
import styles from "./ModalDeleteCustomer.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Radio,
  Modal,
} from "antd";

function ModalDeleteCustomer(props) {
  const {
    isShowModalDeleteCustomer,
    setIsShowModalDeleteCustomer,
    dataModalDeleteCustomer,
    setDataModalDeleteCustomer,
    getListCustomers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formDelete] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {}, []);

  const handleOk = async () => {
    alert("ok");
    return;
    setConfirmLoading(true);
    // Gọi API cập nhật chương trình Tour
    const data = {
      ID_Tour: ID_Tour,
      idProcessTour: ID_ProcessTour,
      descriptionHTML: processTour_HTML,
      descriptionTEXT: processTour_TEXT,
    };

    const res = await ProcessService.updateProcessTour(data);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListTours();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsShowModalDeleteCustomer(false);
    formUpdate.resetFields();
    setDataModalDeleteCustomer({});
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
        className={cx("modalUpdateTour")}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>Modal delete Customer</div>
      </Modal>
    </div>
  );
}

export default ModalDeleteCustomer;