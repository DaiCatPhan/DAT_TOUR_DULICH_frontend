import className from "classnames/bind";
import styles from "./RevenueTour.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag } from "antd";

import ModalChartTour from "../components/ModalChartTour";
import { useState } from "react";

function RevenueTour() {
  const [isShowModalChartTour, setIsShowModalChartTour] = useState(false);
  const [dataModalChartTour, setDataModalChartTour] = useState({});

  const handleModalChartTour = (data) => {
    setIsShowModalChartTour(true);
    // setDataModalChartTour(data);
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
      title: "Mã tour",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên tour",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Doanh thu",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Biểu đồ",
      dataIndex: "address",
      key: "address",
      render: (chart) => {
        return (
          <div className={cx("poiter")}>
            <Tag onClick={() => handleModalChartTour(chart)} color="geekblue">
              Xem biểu đồ
            </Tag>
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border border-danger")}>
        <div className={cx("border p-2")}>RevenueTour</div>
        <div>
          <div></div>
        </div>
        <div className={cx("p-4")}>
          <Table bordered dataSource={dataSource} columns={columns} />
        </div>
      </div>
      <ModalChartTour
        isShowModalChartTour={isShowModalChartTour}
        setIsShowModalChartTour={setIsShowModalChartTour}
        dataModalChartTour={dataModalChartTour}
        setDataModalChartTour={setDataModalChartTour}
      />
    </div>
  );
}

export default RevenueTour;
