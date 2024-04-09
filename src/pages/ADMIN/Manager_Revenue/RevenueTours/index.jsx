import className from "classnames/bind";
import styles from "./RevenueTours.module.scss";
const cx = className.bind(styles);

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import { Space, Table, Tag } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button } from "antd";
import { Tabs } from "antd";

import { useEffect, useState } from "react";

function RevenueTours() {
  const [revenue, setRevenue] = useState("");
  const [tab, setTab] = useState("Tháng");
  const [typeChartTab, setTypeChartTab] = useState("");

  const itemsTab = [
    {
      key: "Tháng",
      label: "Tháng",
    },
    {
      key: "Năm",
      label: "Năm",
    },
  ];
  const onChangeTab = (key) => {
    setTab(key);
  };

  const getDataRevenue = async () => {
    const res = await RevenueService.revenueTour(`${timeCurrent}`);
    if (res && res.data.EC == 0) {
      setRevenue(res.data.DT);
    }
  };

  useEffect(() => {
    getDataRevenue();
  }, []);

  const dataChartBar = [10000, 15000, 20000, 18000, 22000, 0, 2500];

  const dataBarChart = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 6",
      "Tháng 6",
    ],
    datasets: [
      {
        label: "Doanh thu tổng tất cả tour theo tháng",
        data: dataChartBar,
      },
    ],
  };

  const optionSelect = [
    {
      value: "Ngày",
      label: "Ngày",
    },
    {
      value: "Khoảng ngày",
      label: "Khoảng ngày",
    },
    {
      value: "Tháng",
      label: "Tháng",
    },
    {
      value: "Năm",
      label: "Năm",
    },
  ];

  const itemsTypeChartTab = [
    {
      key: "Biểu đồ cột",
      label: "Biểu đồ cột",
    },
    {
      key: "Biểu đồ đường",
      label: "Biểu đồ đường",
    },
  ];

  const onChangeTypeChartTab = (key) => {
    setTypeChartTab(key);
  };

  const handleShowDatePicker = (data) => {
    if (data == "Ngày") {
      return <DatePicker onChange={onChangePickerDay} format={"DD-MM-YYYY"} />;
    } else if (data == "Khoảng ngày") {
      return (
        <RangePicker
          onChange={onChangePickerDayDistance}
          format={"DD-MM-YYYY"}
        />
      );
    } else if (data == "Tháng") {
      return (
        <DatePicker
          onChange={onChangePickerMonth}
          picker="month"
          format={"MM/YYYY"}
        />
      );
    } else if (data == "Năm") {
      return (
        <DatePicker
          onChange={onChangePickerYear}
          picker="year"
          format={"YYYY"}
        />
      );
    }
  };

  const handleSearch = async () => {
    const res = await RevenueService.revenueTour(`${time}`);
    if (res && res.data.EC == 0) {
      setRevenue(res.data.DT);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border")}>
        <div className={cx("border p-2")}>
          <b>Tổng doanh thu</b>
        </div>
        <div>
          <Tabs defaultActiveKey="1" items={itemsTab} onChange={onChangeTab} />
        </div>

        {tab === "Tháng" ? (
          <div className={cx("px-5")}>
            <Tabs
              defaultActiveKey="1"
              items={itemsTypeChartTab}
              onChange={onChangeTypeChartTab}
            />

            <Bar data={dataBarChart} />
          </div>
        ) : (
          <div className={cx("px-5")}>Doanh thu theo năm</div>
        )}
      </div>
    </div>
  );
}

export default RevenueTours;
