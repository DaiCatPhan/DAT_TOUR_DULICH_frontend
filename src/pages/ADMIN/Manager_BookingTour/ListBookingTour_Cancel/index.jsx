import className from "classnames/bind";
import styles from "./ListBookingTour_Cancel.module.scss";
const cx = className.bind(styles);

import {
  Badge,
  Space,
  Table,
  Tabs,
  Tag,
  Form,
  Input,
  Checkbox,
  Button,
  DatePicker,
  Select,
} from "antd";
import { IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookingService from "../../../../services/BookingService";
import ModalUpdateStatusBooking from "../components/ModalUpdateStatusBooking";

import Funtion from "../../../../components/Functions/function";
import moment from "moment";

function ListBookingTour_Cancel() {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listBookingTour, setListBookingTour] = useState([]);
  const [statusTab, setStatusTab] = useState(
    "status=ĐÃ DUYỆT&payment_status=ĐÃ THANH TOÁN"
  );
  const [numberStatusBooking, setNumberStatusBooking] = useState({});

  const [isShowModalUpdateStatusBooking, setIsShowModalUpdateStatusBooking] =
    useState(false);
  const [dataModalUpdateStatusBooking, setDataModalUpdateStatusBooking] =
    useState({});

  const handleModalUpdateStatusBooking = (data) => {
    setIsShowModalUpdateStatusBooking(true);
    setDataModalUpdateStatusBooking(data);
  };

  // GOI API LAY LIST TOUR
  const getListBookingTour = async () => {
    const res = await BookingService.readAll(
      `page=${current}&limit=${pageSize}&${statusTab}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.rows.map((item) => ({
        ...item,
        key: item.id,
      }));
      setNumberStatusBooking(res.data.DT.numberStatus);
      setListBookingTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  useEffect(() => {
    getListBookingTour();
  }, [current, pageSize, statusTab]);

  const handleStatusBooking = (status) => {
    if (status == "CHỜ XÁC NHẬN") {
      return <div className={cx("text-primary", "fw_600")}>CHỜ XÁC NHẬN</div>;
    } else if (status == "ĐÃ DUYỆT") {
      return <div className={cx("text-success", "fw_600")}>ĐÃ DUYỆT</div>;
    } else if (status === "CHỜ HỦY") {
      return <div className={cx("text-warning", "fw_600")}>CHỜ HỦY</div>;
    } else if (status === "ĐÃ HỦY") {
      return <div className={cx("text-danger", "fw_600")}>ĐÃ HỦY</div>;
    }
  };

  const handleStatusPayment = (status) => {
    if (status == "ĐÃ THANH TOÁN") {
      return <Tag color="blue">ĐÃ THANH TOÁN</Tag>;
    } else if (status == "CHƯA THANH TOÁN") {
      return <Tag color="red">CHƯA THANH TOÁN</Tag>;
    }
  };

  const itemsTab = [
    {
      key: "payment_status=ĐÃ THANH TOÁN",
      label: (
        <Badge count={numberStatusBooking?.Soluong_DaDuyet?.count || 0}>
          <div className={cx("px-3")}>ĐÃ THANH TOÁN</div>
        </Badge>
      ),
    },
    {
      key: "status=ĐÃ HỦY",
      label: (
        <Badge count={numberStatusBooking?.Soluong_DaHuy?.count || 0}>
          <div className={cx("px-3")}>ĐÃ HỦY</div>
        </Badge>
      ),
    },
    {
      key: "",
      label: "",
    },
  ];

  const onChangeTab = (key) => {
    setStatusTab(key);
  };

  const onFinishSearchTour = async (values) => {
    const { idBookingTour, nameTour, dayBookingTour } = values;
    const res = await TourService.getTours(
      `page=${current}&limit=${pageSize}&id=${id || ""}&name=${
        name || ""
      }&type=${type || ""}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.tours.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  const columns = [
    {
      title: "Mã đặc tour",
      key: "id",
      render: (data) => <div>{data?.id}</div>,
      width: 100,
    },
    {
      title: "Tour",
      key: "nameTour",
      render: (data) => <div>{data?.Calendar?.Tour?.name}</div>,
      width: 400,
    },
    {
      title: "khách hàng",
      key: "customer",
      render: (data) => <div>{data?.Customer?.email}</div>,
    },
    {
      title: "lịch khởi hành",
      key: "calendar",
      render: (data) => (
        <div className={cx("d-flex   ")}>
          <div>{moment(data?.Calendar?.startDay).format("DD-MM-YYYY")}</div>
          <div className={cx("mx-2")}>/</div>
          <div>{moment(data?.Calendar?.endDay).format("DD-MM-YYYY")}</div>
        </div>
      ),
    },
    {
      title: "ngày đặt tour",
      key: "calendar",
      render: (data) => (
        <div>
          <div>{moment(data?.createdAt).format("DD-MM-YYYY")}</div>
        </div>
      ),
    },
    {
      title: "trạng thái",
      key: "status",
      render: (data) => <div>{handleStatusPayment(data?.payment_status)}</div>,
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
              defaultActiveKey="Đã duyệt"
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

        <div className={cx("px-3")}>
          <div>
            <Form
              name="basic"
              onFinish={onFinishSearchTour}
              autoComplete="off"
              className={cx("m-auto")}
            >
              <div className={cx("row ", "width_1000")}>
                <div className={cx("col-lg-3")}>
                  <Form.Item label="Mã đặt tour" name="idBookingTour">
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("col-lg-3")}>
                  <Form.Item label="Tên tour" name="nameTour">
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("col-lg-3")}>
                  <Form.Item label="Ngày đặt tour" name="dayBookingTour">
                    <DatePicker className={cx("w-100")} />
                  </Form.Item>
                </div>
                <div className={cx("col-lg-3 ")}>
                  <div className={cx("text-center")}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("w-75")}
                      >
                        Tìm
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className={cx("px-3")}>
          <div>
            <Table dataSource={listBookingTour} columns={columns} bordered />
          </div>
        </div>
      </div>
      <ModalUpdateStatusBooking
        isShowModalUpdateStatusBooking={isShowModalUpdateStatusBooking}
        setIsShowModalUpdateStatusBooking={setIsShowModalUpdateStatusBooking}
        dataModalUpdateStatusBooking={dataModalUpdateStatusBooking}
        setDataModalUpdateStatusBooking={setDataModalUpdateStatusBooking}
        getListBookingTour={getListBookingTour}
      />
    </div>
  );
}

export default ListBookingTour_Cancel;
