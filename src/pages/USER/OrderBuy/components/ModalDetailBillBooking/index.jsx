import className from "classnames/bind";
import styles from "./ModalDetailBillBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal, Table } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

function ModalDetailBillBooking(props) {
  const {
    isShowModalDetailBillBooking,
    setIsShowModalDetailBillBooking,
    dataModalDetailBillBooking,
    setDataModalDetailBillBooking,
    getListBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalDetailBillBooking(false);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Title"
        // open={isShowModalDetailBillBooking}
        open={true}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={800}
        style={{ top: 15 }}
      >
        <div>
          <div>
            <div>Cam on qui khách da tin tuong va xac nhan</div>
            <div>
              IVIVU se kiem tra tinh trang tour theo thong tin ben duoi va phan
              hôi cho Qui Khach
            </div>
          </div>
          <div>
            <div>Tour Ninh Binh 1N : Chua Tam Giac -Trang An </div>
            <div>
              <div className={cx("d-flex justify-content-between")}>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
              </div>
              <div className={cx("d-flex justify-content-between")}>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
              </div>
              <div className={cx("d-flex justify-content-between")}>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
                <div>Ma Tour</div>
              </div>
            </div>
          </div>
          <div>
            <h1>Thong tin khach hang</h1>
            <div className={cx("d-flex justify-content-between")}>
              <div>Ho ten</div>
              <div>Ho ten</div>
              <div>Ho ten</div>
              <div>Ho ten</div>
            </div>
            <div>Email : phandaicat12032002@gmail.com</div>
          </div>
          <div>
            <h2>Gia tour chi tiet</h2>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetailBillBooking;
