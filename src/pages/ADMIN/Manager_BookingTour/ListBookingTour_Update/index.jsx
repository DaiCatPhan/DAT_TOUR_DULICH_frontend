import className from "classnames/bind";
import styles from "./ListBookingTour_Update.module.scss";
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
import {
  IconList,
  IconPencilMinus,
  IconRotate,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookingService from "../../../../services/BookingService";
import ModalUpdateStatusBooking from "../components/ModalUpdateStatusBooking";
import ModalReasonCancel from "../components/ModalReasonCancel";

import Funtion from "../../../../components/Functions/function";
import moment from "moment";

function ListBookingTour_Update() {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listBookingTour, setListBookingTour] = useState([]);
  const [statusTab, setStatusTab] = useState(
    "status=ĐÃ DUYỆT&payment_status=ĐÃ THANH TOÁN"
  );

  const [isShowModalUpdateStatusBooking, setIsShowModalUpdateStatusBooking] =
    useState(false);
  const [dataModalUpdateStatusBooking, setDataModalUpdateStatusBooking] =
    useState({});
  const [isShowModalReasonCancel, setIsShowModalReasonCancel] = useState(false);
  const [dataModalReasonCancel, setDataModalReasonCancel] = useState({});

  const handleModalUpdateStatusBooking = (data) => {
    setIsShowModalUpdateStatusBooking(true);
    setDataModalUpdateStatusBooking(data);
  };
  const handleModalReasonCancel = (data) => {
    setIsShowModalReasonCancel(true);
    setDataModalReasonCancel(data);
  };

  // GOI API LAY LIST TOUR
  const getListBookingTour = async () => {
    const res = await BookingService.readAll(
      `page=${current}&limit=${pageSize}&${statusTab}&sortcreatedAt=DESC`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.rows.map((item) => ({
        ...item,
        key: item.id,
      }));
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
      return <Tag color="green">ĐÃ THANH TOÁN</Tag>;
    } else if (status == "CHƯA THANH TOÁN") {
      return <Tag color="blue">CHƯA THANH TOÁN</Tag>;
    } else if (status == "HOÀN TIỀN") {
      return <Tag color="red">HOÀN TIỀN</Tag>;
    }
  };

  const itemsTab = [
    {
      key: "status=ĐÃ DUYỆT&payment_status=ĐÃ THANH TOÁN",
      label: <div className={cx("px-3")}>ĐÃ THANH TOÁN</div>,
    },
    {
      key: "status=ĐÃ HỦY",
      label: <div className={cx("px-3")}>HỦY TOUR</div>,
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

    // Tạo điều kiện tìm kiếm dựa trên tham số đầu vào
    let searchParams = `page=${current}&limit=${pageSize}&${statusTab}`;
    if (idBookingTour) {
      searchParams += `&idBookingTour=${idBookingTour}`;
    }
    if (nameTour) {
      searchParams += `&nameTour=${nameTour}`;
    }
    if (dayBookingTour) {
      searchParams += `&dayBookingTour=${dayBookingTour?.$d}`;
    }
    const res = await BookingService.readAll(searchParams);
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.rows.map((item) => ({
        ...item,
        key: item.id,
      }));
      setListBookingTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  const columns = [
    {
      title: "Mã đặc tour",
      key: "id",
      render: (data) => <div>{data?.id}</div>,
      width: 80,
    },
    {
      title: "Tour",
      key: "nameTour",
      render: (data) => <div>{data?.Calendar?.Tour?.name}</div>,
      width: 300,
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
      render: (data) => <div>{handleStatusBooking(data?.status)}</div>,
    },

    {
      title: "trạng thái",
      key: "status",
      render: (data) => <div>{handleStatusPayment(data?.payment_status)}</div>,
    },

    {
      title: "thao tác",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateStatusBooking(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
    },
  ];

  const columnsTabCancelTour = [
    {
      title: "Mã đặc tour",
      key: "id",
      render: (data) => <div>{data?.id}</div>,
      width: 80,
    },
    {
      title: "Tour",
      key: "nameTour",
      render: (data) => <div>{data?.Calendar?.Tour?.name}</div>,
      width: 300,
    },
    {
      title: "khách hàng",
      key: "customer",
      render: (data) => (
        <div className={cx('text-primary','poiter')} onClick={() => handleModalReasonCancel(data)}>
          {data?.Customer?.email}
        </div>
      ),
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
      title: "ngày hủy tour",
      key: "calendar",
      render: (data) => (
        <div>
          <div>{moment(data?.date_cancel_booking).format("DD-MM-YYYY")}</div>
        </div>
      ),
    },

    {
      title: "trạng thái",
      key: "status",
      render: (data) => <div>{handleStatusBooking(data?.status)}</div>,
    },

    {
      title: "trạng thái",
      key: "status",
      render: (data) => <div>{handleStatusPayment(data?.payment_status)}</div>,
    },

    {
      title: "thao tác",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateStatusBooking(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
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

          <div>
            <IconRotate
              className={cx("poiter")}
              onClick={() => getListBookingTour()}
            />
          </div>
        </div>

        <div className={cx("px-3 my-3")}>
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
                    <DatePicker className={cx("w-100")} format={"DD-MM-YYYY"} />
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
            {statusTab == "status=ĐÃ DUYỆT&payment_status=ĐÃ THANH TOÁN" ? (
              <Table dataSource={listBookingTour} columns={columns} bordered />
            ) : (
              <Table
                dataSource={listBookingTour}
                columns={columnsTabCancelTour}
                bordered
              />
            )}
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

      <ModalReasonCancel
        isShowModalReasonCancel={isShowModalReasonCancel}
        setIsShowModalReasonCancel={setIsShowModalReasonCancel}
        dataModalReasonCancel={dataModalReasonCancel}
        setDataModalReasonCancel={setDataModalReasonCancel}
        getListBookingTour={getListBookingTour}
      />
    </div>
  );
}

export default ListBookingTour_Update;
