import className from "classnames/bind";
import styles from "./ModalEditCustomer.module.scss";
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
import { useEffect, useState } from "react";

function ModalEditCustomer(props) {
  const {
    isShowModalUpdateCustomer,
    setIsShowModalUpdateCustomer,
    dataModalUpdateCustomer,
    setDataModalUpdateCustomer,
    getListCustomers,
  } = props;

  console.log("isShowModalUpdateCustomer", isShowModalUpdateCustomer);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [formUpdate] = Form.useForm();
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
    setIsShowModalUpdateCustomer(false);
    formUpdate.resetFields();
    setDataModalUpdateCustomer({});
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Cập nhật thông tin khách hàng "
        open={isShowModalUpdateCustomer}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={cx("modalUpdateTour")}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>Modal update Customer</div>
      </Modal>
    </div>
  );
}

export default ModalEditCustomer;
