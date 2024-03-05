import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";

function OrderBuy() {
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

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tất cả",
    },
    {
      key: "2",
      label: "Chờ xác nhận",
    },
    {
      key: "3",
      label: "Đã xác nhận",
    },
    {
      key: "4",
      label: "Hoàn thành",
    },
    {
      key: "5",
      label: "Đã hủy",
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("p-2")}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}

export default OrderBuy;
