import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";

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
  return (
    <div className={cx("wrapper")}>
      <div className={cx("m-5")}>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
}

export default OrderBuy;
