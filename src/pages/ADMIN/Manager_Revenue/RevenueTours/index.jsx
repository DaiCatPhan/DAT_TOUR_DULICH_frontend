import className from "classnames/bind";
import styles from "./RevenueTours.module.scss";
const cx = className.bind(styles);

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import moment from "moment";

import { Space, Table, Tag } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button } from "antd";
import { Tabs } from "antd";

import { useEffect, useMemo, useState } from "react";

import RevenueService from "../../../../services/RevenueService";

function RevenueTours() {
  const [revenueMonth, setRevenueMonth] = useState([]);
  const [revenueYear, setRevenueYear] = useState([]);
  const [tab, setTab] = useState("Tháng");
  const [typeChartTab, setTypeChartTab] = useState("Biểu đồ cột");
  const [titleMonth, setTitleMonth] = useState("");
  const [titleYear, setTitleYear] = useState("");
  const [selectYearofMonth, setSelectYearofMonth] = useState("year=2024");
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

  // ===  TỔNG DOANH THU TẤT CẢ THÁNG CỦA NĂM ===
  const getDataRevenueToursMonth = async () => {
    const res = await RevenueService.revenueToursMonth(`${selectYearofMonth}`);
    if (res && res.data.EC == 0) {
      setRevenueMonth(res.data.DT);
      setTitleMonth(res.data.EM);
    }
  };

  const getDataRevenueToursYear = async () => {
    const res = await RevenueService.revenueToursYear(`${selectYearofMonth}`);
    console.log("getDataRevenueToursYear >>", res);
    if (res && res.data.EC == 0) {
      setRevenueYear(res.data.DT);
      setTitleYear(res.data.EM);
    }
  };

  useEffect(() => {
    getDataRevenueToursMonth();
    getDataRevenueToursYear();
  }, [selectYearofMonth]);

  const dataChartBarMonth = useMemo(() => {
    return revenueMonth?.map((item) => item.value);
  }, [revenueMonth]);
  const labelsChartBar = useMemo(() => {
    return revenueMonth?.map((item) => item.month);
  }, [revenueMonth]);

  const dataBarChartMonth = {
    labels: labelsChartBar,
    datasets: [
      {
        label: "Doanh thu tổng tất cả tour theo tháng",
        data: dataChartBarMonth,
      },
    ],
  };

  const handleChangeSelectYearofMonth = (value) => {
    setSelectYearofMonth(value);
  };

  //---------------------------
  const dataChartBarYear = useMemo(() => {
    return revenueYear?.map((item) => item.value);
  }, [revenueYear]);
  const labelsChartBarYear = useMemo(() => {
    return revenueYear?.map((item) => item.year);
  }, [revenueYear]);

  const dataBarChartYear = {
    labels: labelsChartBarYear,
    datasets: [
      {
        label: "Doanh thu từng năm",
        data: dataChartBarYear,
      },
    ],
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border_black")}>
        <div className={cx("border_bt_black", "p-2")}>
          <b>Tổng doanh thu</b>
        </div>

        <div className={cx("frameContent")}>
          <div className={cx("d-flex justify-content-between")}>
            <div>
              <Tabs
                defaultActiveKey="1"
                items={itemsTab}
                onChange={onChangeTab}
              />
            </div>

            <div className={cx("d-flex align-items-center")}>
              <div className={cx("mx-2")}>Chọn năm</div>
              <Select
                defaultValue="2024"
                style={{ width: 120 }}
                onChange={handleChangeSelectYearofMonth}
                options={[
                  { value: "year=2024", label: "2024" },
                  { value: "year=2023", label: "2023" },
                  { value: "year=2022", label: "2022" },
                  { value: "year=2021", label: "2021" },
                  { value: "year=2020", label: "2020" },
                ]}
              />
            </div>
          </div>

          <Tabs items={itemsTypeChartTab} onChange={onChangeTypeChartTab} />

          {tab === "Tháng" ? (
            <div className={cx("px-5")}>
              <div>
                <b>{titleMonth}</b>
              </div>

              <div className={cx("p-5")}>
                {typeChartTab === "Biểu đồ cột" ? (
                  <Bar data={dataBarChartMonth} />
                ) : (
                  <Line data={dataBarChartMonth} />
                )}
              </div>
            </div>
          ) : (
            <div className={cx("px-5")}>
              <div>
                <b>{titleYear}</b>
              </div>
              <div className={cx("p-5")}>
                {typeChartTab === "Biểu đồ cột" ? (
                  <Bar data={dataBarChartYear} />
                ) : (
                  <Line data={dataBarChartYear} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RevenueTours;
