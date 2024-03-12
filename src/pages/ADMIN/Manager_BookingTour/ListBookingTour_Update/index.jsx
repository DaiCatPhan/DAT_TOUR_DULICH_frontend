import className from "classnames/bind";
import styles from "./ListBookingTour_Update.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";
import { IconList } from "@tabler/icons-react";

function ListBookingTour_Update() {
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
      <div className={cx("border")}>
        <div
          className={cx(
            "title",
            "border d-flex justify-content-between align-items-center "
          )}
        >
          <div className={cx("d-flex")}>
            <div>
              <IconList />
            </div>
            <div className={cx("mx-2")}>Danh sách đặt tour</div>
          </div>

          <div className={cx("d-flex")}>
            <button
              className={cx("btn btn-success")}
              // onClick={handleModalCreateBlog}
            >
              Thêm bài đăng
            </button>
          </div>
        </div>
        <div className={cx("p-3")}>
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </div>
  );
}

export default ListBookingTour_Update;
