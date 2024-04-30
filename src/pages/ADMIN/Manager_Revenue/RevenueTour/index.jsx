import className from "classnames/bind";
import styles from "./RevenueTour.module.scss";
const cx = className.bind(styles);
import moment from "moment";

import { Space, Table, Tag } from "antd";
import { Select } from "antd";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { IconReload } from "@tabler/icons-react";

import ModalChartTour from "../components/ModalChartTour";
import { useEffect, useRef, useState } from "react";
import Function from "../../../../components/Functions/function";

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

  const handleSearchCondition = async () => {
    const res = await RevenueService.revenueTour(`${time}`);
    if (res && res.data.EC == 0) {
      setRevenue(res.data.DT);
      setTitle(res.data.EM);
    }
  };

  // TABLE ant function search
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Mã tour",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
    },
    {
      title: "Tên tour",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Số lượt đặt tour",
      dataIndex: "numberTicket",
      key: "numberTicket",
    },
    {
      title: "Doanh thu (vnd)",
      dataIndex: "revenueDay",
      key: "revenueDay",
      render: (revenueDay) => {
        return <div>{Function.formatNumberWithCommas(revenueDay)}</div>;
      },
      sorter: (a, b) => a.revenueDay - b.revenueDay,
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border_blue")}>
        <div className={cx("title")}>
          <div className={cx("text")}>THỐNG KÊ TỪNG TOUR</div>
          <div>
            <IconReload
              className={cx("icon")}
              onClick={() => {
                getDataRevenue();
              }}
            />
          </div>
        </div>
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
            <Button type="primary" onClick={handleSearchCondition}>
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
