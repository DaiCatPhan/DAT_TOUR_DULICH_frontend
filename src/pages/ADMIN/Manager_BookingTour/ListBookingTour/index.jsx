import className from "classnames/bind";
import styles from "./ListBookingTour.module.scss";
const cx = className.bind(styles);

import { Space, Table, Tag, Tabs, Badge } from "antd";
import { IconList } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { Form } from "antd";

import Function from "../../../../components/Functions/function";

import BookingService from "../../../../services/BookingService";

import ModalDuyetTour from "../components/ModalDuyetTour";
import ModalReasonCancel from "../components/ModalReasonCancel";
import ModalCancel from "../components/ModalCancel";
import ModalUpdatePaid from "../components/ModalUpdatePaid";

function ListBookingTour() {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listBookingTour, setListBookingTour] = useState([]);
  const [tab, setTab] = useState("status=CHỜ XÁC NHẬN");
  const [numberStatusBooking, setNumberStatusBooking] = useState({});

  const [isShowModalDuyetTour, setIsShowModalDuyetTour] = useState(false);
  const [dataModalDuyetTour, setDataModalDuyetTour] = useState({});
  const [isShowModalReasonCancel, setIsShowModalReasonCancel] = useState(false);
  const [dataModalReasonCancel, setDataModalReasonCancel] = useState({});
  const [isShowModalCancel, setIsShowModalCancel] = useState(false);
  const [dataModalCancel, setDataModalCancel] = useState({});
  const [isShowModalUpdatePaid, setIsShowModalUpdatePaid] = useState(false);
  const [dataModalUpdatePaid, setDataModalUpdatePaid] = useState({});

  const handleModalDuyetTour = (data) => {
    setIsShowModalDuyetTour(true);
    setDataModalDuyetTour(data);
  };

  const handleModalReasonCancel = (data) => {
    setIsShowModalReasonCancel(true);
    setDataModalReasonCancel(data);
  };

  const handleModalCancel = (data) => {
    setIsShowModalCancel(true);
    setDataModalCancel(data);
  };

  const handleModalUpdatePaid = (data) => {
    setIsShowModalUpdatePaid(true);
    setDataModalUpdatePaid(data);
  };

  // GOI API LAY LIST TOUR
  const getListBookingTour = async () => {
    const res = await BookingService.readAll(
      `page=${current}&limit=${pageSize}&${tab}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.rows.map((item) => ({
        ...item,
        key: item.id,
      }));
      setNumberStatusBooking(res.data.DT.numberStatus);
      setListBookingTour(cus);
      setTotal(res.data.DT.count);
    }
  };

  useEffect(() => {
    getListBookingTour();
  }, [current, pageSize, tab]);

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
      return <div className={cx("text-success", "fw_600")}>ĐÃ THANH TOÁN</div>;
    } else if (status == "CHƯA THANH TOÁN") {
      return <div className={cx("text-danger", "fw_600")}>CHƯA THANH TOÁN</div>;
    }
  };

  const handleButtonUpdate = (data) => {
    if (tab == "status=CHỜ XÁC NHẬN") {
      return (
        <button
          className={cx("btn_booking")}
          onClick={() => handleModalDuyetTour(data)}
        >
          Duyệt tour
        </button>
      );
    } else if (tab == "status=CHỜ HỦY") {
      return (
        <div className={cx("d-flex")}>
          <button
            className={cx("btn_reason")}
            onClick={() => handleModalReasonCancel(data)}
          >
            Lí do hủy
          </button>
          <button
            className={cx("btn_eval")}
            onClick={() => handleModalCancel(data)}
          >
            Hủy tour
          </button>
        </div>
      );
    } else if (tab == "status=ĐÃ DUYỆT&payment_status=CHƯA THANH TOÁN") {
      return (
        <button
          className={cx("btn_booking")}
          onClick={() => handleModalUpdatePaid(data)}
        >
          CẬP NHẬT ĐÃ THANH TOÁN
        </button>
      );
    }
  };
  const columns = [
    {
      key: "data",
      render: (data) => (
        <div className={cx("cardOrderBuy")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-9")}>
              <div className={cx("d-flex")}>
                <div>
                  <img
                    src={data?.Calendar?.Tour?.image || ""}
                    alt="notFound"
                    width={130}
                    height={130}
                  />
                </div>
                <div className={cx("contentCard")}>
                  <div className={cx("name")}>
                    {data?.Calendar?.Tour?.name || ""}
                  </div>
                  <div className={cx("d-flex")}>
                    <div>Khởi hành : </div>
                    <div className={cx("mx-2")}>
                      <b>
                        {moment(data?.Calendar?.startDay).format("DD-MM-YYYY")}
                      </b>
                    </div>
                    <div className={cx("mx-2")}>---</div>
                    <div>
                      <b>
                        {moment(data?.Calendar?.endDay).format("DD-MM-YYYY")}
                      </b>
                    </div>
                  </div>
                  <div className={cx("d-flex")}>
                    <div>Người lớn : </div>
                    <div className={cx("mx-5")}>
                      x <span>{data?.numberTicketAdult}</span>
                    </div>
                    <div className={cx("mx-5")}>
                      {Function.formatNumberWithCommas(
                        data?.Calendar?.priceAdult
                      )}{" "}
                      VND
                    </div>
                  </div>
                  <div className={cx("d-flex")}>
                    <div>Trẻ em : </div>
                    <div className={cx("mx-2")}></div>
                    <div className={cx("mx-1")}></div>
                    <div className={cx("mx-5")}>
                      x <span>{data?.numberTicketChild || 0}</span>
                    </div>
                    <div className={cx("mx-5")}>
                      {Function.formatNumberWithCommas(
                        data?.Calendar?.priceChild
                      )}{" "}
                      VND
                    </div>
                  </div>
                  <div className={cx("d-flex")}>
                    <div>Ngày đặt : </div>
                    <div className={cx("mx-5")}>
                      {moment(data?.createdAt).format("DD-MM-YYYY")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("col-lg-3")}>
              <div className={cx("d-flex")}>
                <div>{handleStatusBooking(data?.status)}</div>
                <div className={cx("mx-1 text-secondary")}>|</div>
                <div>{handleStatusPayment(data?.payment_status)}</div>
              </div>
            </div>
          </div>

          {/* THÔNG TIN KHÁCH HÀNG */}
          <div
            className={cx("d-flex justify-content-between  ", "bgcolor_FFFEFB")}
          >
            <div className={cx("infoCustomer")}>
              <div className={cx("title")}>Thông tin khách hàng</div>
              <div className={cx("row my-1")}>
                <div className={cx("col-lg-3")}>Họ và tên</div>
                <div className={cx("col-lg-3")}>
                  <b>{data?.Customer?.username}</b>
                </div>

                <div className={cx("col-lg-3")}>Số điện thoại</div>
                <div className={cx("col-lg-3")}>
                  <b>{data?.Customer?.phone}</b>
                </div>
              </div>
              <div className={cx("row my-1")}>
                <div className={cx("col-lg-3")}>Email</div>
                <div className={cx("col-lg-9")}>
                  <b>{data?.Customer?.email}</b>
                </div>
              </div>
            </div>

            <div className={cx("evaluate")}>
              <div className={cx("intoMoney")}>
                Thành tiền:{" "}
                <span>
                  {Function.formatNumberWithCommas(data?.total_money || 0)} VND
                </span>
              </div>
              <div className={cx("d-flex mt-3")}>
                {handleButtonUpdate(data)}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const onChangeTab = (key) => {
    setTab(key);
  };

  const itemsTab = [
    {
      key: "status=CHỜ XÁC NHẬN",
      label: (
        <Badge count={numberStatusBooking?.Soluong_ChoXacNhan || 0} showZero>
          <div className={cx("px-3")}>CHỜ DUYỆT TOUR</div>
        </Badge>
      ),
    },
    {
      key: "status=CHỜ HỦY",
      label: (
        <Badge count={numberStatusBooking?.Soluong_ChoHuy || 0} showZero>
          <div className={cx("px-3")}>YÊU CẦU HỦY TOUR</div>
        </Badge>
      ),
    },
    {
      key: "",
      label: "",
    },
    {
      key: "status=ĐÃ DUYỆT&payment_status=CHƯA THANH TOÁN",
      label: (
        <Badge count={numberStatusBooking?.Soluong_ChuaThanhToan || 0} showZero>
          <div className={cx("px-3")}>ĐƠN HÀNG CHƯA THANH TOÁN</div>
        </Badge>
      ),
    },
    {
      key: "",
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
          <div className={cx("d-flex border w-75 justify-content-between")}>
            <Tabs
              defaultActiveKey="CHỜ XÁC NHẬN"
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
            <Table dataSource={listBookingTour} columns={columns} />
          </div>
        </div>
      </div>
      <ModalDuyetTour
        isShowModalDuyetTour={isShowModalDuyetTour}
        setIsShowModalDuyetTour={setIsShowModalDuyetTour}
        dataModalDuyetTour={dataModalDuyetTour}
        setDataModalDuyetTour={setDataModalDuyetTour}
        getListBookingTour={getListBookingTour}
      />
      <ModalReasonCancel
        isShowModalReasonCancel={isShowModalReasonCancel}
        setIsShowModalReasonCancel={setIsShowModalReasonCancel}
        dataModalReasonCancel={dataModalReasonCancel}
        setDataModalReasonCancel={setDataModalReasonCancel}
        getListBookingTour={getListBookingTour}
      />
      <ModalCancel
        isShowModalCancel={isShowModalCancel}
        setIsShowModalCancel={setIsShowModalCancel}
        dataModalCancel={dataModalCancel}
        setDataModalCancel={setDataModalCancel}
        getListBookingTour={getListBookingTour}
      />
      <ModalUpdatePaid
        isShowModalUpdatePaid={isShowModalUpdatePaid}
        setIsShowModalUpdatePaid={setIsShowModalUpdatePaid}
        dataModalUpdatePaid={dataModalUpdatePaid}
        setDataModalUpdatePaid={setDataModalUpdatePaid}
        getListBookingTour={getListBookingTour}
      />
    </div>
  );
}

export default ListBookingTour;
