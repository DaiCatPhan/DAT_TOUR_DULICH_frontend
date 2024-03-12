import className from "classnames/bind";
import styles from "./ListBookingTour.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag, Tabs, Badge } from "antd";
import { IconList } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function ListBookingTour() {
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

  const onChangeTab = (key) => {
    console.log(key);
  };
  const itemsTab = [
    {
      key: "1",
      label: (
        <Badge count={5}>
          <div className={cx("px-3")}>CHỜ DUYỆT TOUR</div>
        </Badge>
      ),
      //   children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: (
        <Badge count={5}>
          <div className={cx("px-3")}>YÊU CẦU HỦY TOUR</div>
        </Badge>
      ),
      //   children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("border")}>
        <div
          className={cx(
            "title",
            "border d-flex justify-content-between align-items-center px-3"
          )}
        >
          <div>
            <Tabs
              defaultActiveKey="1"
              items={itemsTab}
              onChange={onChangeTab}
            />
          </div>

          <div className={cx("d-flex")}>
            <Link to={"/admin/managerBookingTour/list_update"}>
              <button className={cx("btn btn-success")}>Danh sách</button>
            </Link>
          </div>
        </div>
        <div className={cx("p-3")}>
          <div>
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListBookingTour;
