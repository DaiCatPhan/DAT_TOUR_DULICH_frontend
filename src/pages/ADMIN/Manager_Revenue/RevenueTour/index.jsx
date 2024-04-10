import className from "classnames/bind";
import styles from "./RevenueTour.module.scss";
const cx = className.bind(styles);
import moment from "moment";

import { Space, Table, Tag } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button } from "antd";

import ModalChartTour from "../components/ModalChartTour";
import { useEffect, useState } from "react";

import RevenueService from "../../../../services/RevenueService";

function RevenueTour() {
  const [isShowModalChartTour, setIsShowModalChartTour] = useState(false);
  const [dataModalChartTour, setDataModalChartTour] = useState({});
  const [type, setType] = useState("Ngày");
  const [time, setTime] = useState("");
  const [revenue, setRevenue] = useState("");
  const [title, setTitle] = useState("");

  const today = new Date();
  const todayFomat = moment(today).format("YYYY-MM-DD");
  const timeCurrent = "startDay=" + todayFomat;

  const getDataRevenue = async () => {
    const res = await RevenueService.revenueTour(`${timeCurrent}`);
    if (res && res.data.EC == 0) {
      setRevenue(res.data.DT);
      setTitle(res.data.EM);
    }
  };

  useEffect(() => {
    getDataRevenue();
  }, []);

  const columns = [
    {
      title: "Mã tour",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên tour",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenueDay",
      key: "revenueDay",
    },
  ];

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

  const handleChangeSelect = (value) => {
    setType(value);
  };

  const onChangePickerDay = (date, dateString) => {
    const formatdateString = moment(dateString, "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    setTime("startDay=" + formatdateString);
  };

  const onChangePickerDayDistance = (date, dateString) => {
    const formatStartDay = moment(dateString[0], "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    const formatEndDay = moment(dateString[1], "DD-MM-YYYY").format(
      "YYYY-MM-DD"
    );
    setTime("startDay=" + formatStartDay + "&" + "endDay=" + formatEndDay);
  };

  const onChangePickerMonth = (date, dateString) => {
    setTime("month=" + dateString);
  };

  const onChangePickerYear = (date, dateString) => {
    setTime("year=" + dateString);
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
      setTitle(res.data.EM);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("border border-danger")}>
        <div className={cx("border p-2")}>RevenueTour</div>
        <div className={cx("d-flex px-4 py-2")}>
          <div>
            <Select
              defaultValue="Ngày"
              style={{
                width: 120,
              }}
              onChange={handleChangeSelect}
              options={optionSelect}
            />
          </div>
          <div className={cx("mx-5")}>{handleShowDatePicker(type)}</div>
          <div>
            <Button type="primary" onClick={handleSearch}>
              Tìm
            </Button>
          </div>
        </div>
        <div className={cx("px-4 py-2")}>
          <b>{title}</b>
        </div>
        <div className={cx("p-4")}>
          <Table bordered dataSource={revenue} columns={columns} />
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
