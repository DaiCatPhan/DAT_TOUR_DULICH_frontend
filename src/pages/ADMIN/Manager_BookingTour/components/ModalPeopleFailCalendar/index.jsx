import className from "classnames/bind";
import styles from "./ModalPeopleFailCalendar.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;
import { Table } from "antd";
function ModalPeopleFailCalendar(props) {
  const {
    isShowModalPeopleFailCalendar,
    setIsShowModalPeopleFailCalendar,
    dataModalPeopleFailCalendar,
    setDataModalPeopleFailCalendar,
  } = props;

  const { booking } = dataModalPeopleFailCalendar;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    handleCancel();
  };
  const handleCancel = () => {
    setIsShowModalPeopleFailCalendar(false);
  };

  const columns = [
    {
      title: "Mã đặt tour",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "",
      key: "email",
      render: (booking) => {
        return <div>{booking?.Customer?.email}</div>;
      },
    },
    {
      title: "Khách hàng",
      dataIndex: "",
      key: "customer",
      render: (booking) => {
        return <div>{booking?.Customer?.username}</div>;
      },
    },
    {
      title: "Lượt đặt vé",
      dataIndex: "",
      key: "numverTicker",
      render: (booking) => {
        return (
          <div>
            <div>Người lớn : {booking?.numberTicketAdult} </div>
            <div>Trẻ em : {booking?.numberTicketChild} </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thông tin hủy tour của khách hàng"
        open={isShowModalPeopleFailCalendar}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <div>
          <Table bordered dataSource={booking?.rows} columns={columns} />
        </div>
      </Modal>
    </div>
  );
}

export default ModalPeopleFailCalendar;
