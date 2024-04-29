import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);
import { useDispatch, useSelector } from "react-redux";

import BookingService from "../../../services/BookingService";

import ModalCancelBooking from "./components/ModalCancelBooking";
import ModalDetailBillBooking from "./components/ModalDetailBillBooking";
import ModalEvalBooking from "./components/ModalEvalBooking";

import Function from "../../../components/Functions/function";

import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function OrderBuy() {
  const user = useSelector((state) => state.account.user);

  const [listBookingTour, setListBookingTour] = useState([]);
  const [tab, setTab] = useState("");

  const [isShowModalCancelBooking, setIsShowModalCancelBooking] =
    useState(false);
  const [dataModalCancelBooking, setDataModalCancelBooking] = useState({});
  const [isShowModalDetailBillBooking, setIsShowModalDetailBillBooking] =
    useState(false);
  const [dataModalDetailBillBooking, setDataModalDetailBillBooking] = useState(
    {}
  );
  const [isShowModalEvalBooking, setIsShowModalEvalBooking] = useState(false);
  const [dataModalEvalBooking, setDataModalEvalBooking] = useState({});

  const handleModalCancelBooking = (data) => {
    setIsShowModalCancelBooking(true);
    setDataModalCancelBooking(data);
  };
  const handleModalDetailBillBooking = (data) => {
    setIsShowModalDetailBillBooking(true);
    setDataModalDetailBillBooking(data);
  };
  const handleModalEvalBooking = (data) => {
    setIsShowModalEvalBooking(true);
    setDataModalEvalBooking(data);
  };
  const getListBookingTour = async () => {
    const res = await BookingService.read(`ID_Customer=${user?.id}&${tab}`);
    if (res && res.data.EC == 0) {
      const cus = res.data.DT.rows.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setListBookingTour(cus);
    }
  };

  useEffect(() => {
    getListBookingTour();
  }, [tab]);

  const handleStatusBooking = (status) => {
    if (status == "CHỜ XÁC NHẬN") {
      return (
        <Tag color="blue" className={cx("text-primary", "fw_600")}>
          CHỜ XÁC NHẬN
        </Tag>
      );
    } else if (status == "ĐÃ DUYỆT") {
      return (
        <Tag color="green" className={cx("text-success", "fw_600")}>
          ĐÃ DUYỆT
        </Tag>
      );
    } else if (status === "CHỜ HỦY") {
      return (
        <Tag color="blue" className={cx("text-warning", "fw_600")}>
          CHỜ HỦY
        </Tag>
      );
    } else if (status === "ĐÃ HỦY") {
      return (
        <Tag color="red" className={cx("text-danger", "fw_600")}>
          ĐÃ HỦY
        </Tag>
      );
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

  const columns = [
    {
      key: "data",
      render: (data) => (
        <div className={cx("cardOrderBuy")}>
          <div className={cx("titleHeader")}>
            <div className={cx("d-flex")}>
              <div>
                <Link to={`/tours/${data?.Calendar?.ID_Tour}`}>
                  <Tag className={cx("poiter")} color="magenta">
                    Xem tour
                  </Tag>
                </Link>
              </div>
              <div>
                <Tag
                  className={cx("poiter")}
                  color="#108ee9"
                  onClick={() => handleModalDetailBillBooking(data)}
                >
                  Chi tiết
                </Tag>
              </div>

              <div> {CancelButton(data)}</div>
            </div>

            <div className={cx("d-flex")}>
              <div>{handleStatusBooking(data?.status)}</div>
              <div className={cx("mx-1 text-secondary")}>|</div>
              <div>{handleStatusPayment(data?.payment_status)}</div>
            </div>
          </div>

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
                  <b>{moment(data?.Calendar?.startDay).format("DD-MM-YYYY")}</b>
                </div>
                <div className={cx("mx-2")}>---</div>
                <div>
                  <b>{moment(data?.Calendar?.endDay).format("DD-MM-YYYY")}</b>
                </div>
              </div>
              <div className={cx("d-flex")}>
                <div>Người lớn : </div>
                <div className={cx("mx-5")}>
                  x <span>{data?.numberTicketAdult}</span>
                </div>
                <div className={cx("mx-5")}>
                  {Function.formatNumberWithCommas(data?.Calendar?.priceAdult)}{" "}
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
                  {Function.formatNumberWithCommas(data?.Calendar?.priceChild)}{" "}
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

          <div className={cx("d-flex justify-content-end", "bgcolor_FFFEFB")}>
            <div></div>
            <div className={cx("evaluate")}>
              <div className={cx("intoMoney")}>
                Thành tiền: <span>{data?.total_money}</span>
              </div>
              <div className={cx("d-flex mt-3")}>
                <Link to={`/tours/${data?.Calendar?.ID_Tour}`}>
                  <button className={cx("btn_booking")}>Đặt tour lại</button>{" "}
                </Link>
                <div> {EvaluateButton(data)}</div>
                {/* <button
                  className={cx("btn_eval")}
                  onClick={() => handleModalEvalBooking(data)}
                >
                  Đánh giá
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    setTab(key);
  };
  const items = [
    {
      key: "",
      label: "TẤT CẢ",
    },
    {
      key: "status=ĐÃ HỦY",
      label: "ĐÃ HỦY",
    },
  ];

  //============ CHECK XEM ẨN HIỆN NÚT HỦY TOUR =================

  function isAfterThreeDays(dateInput) {
    const currentDate = new Date();
    const inputDate = new Date(dateInput);
    inputDate.setDate(inputDate.getDate() + 3);
    return currentDate < inputDate;
  }

  function CancelButton(data) {
    const showCancelButton = isAfterThreeDays(data.createdAt);

    return (
      <div>
        {showCancelButton && data.status != "ĐÃ HỦY" ? (
          <Tag
            className={cx("poiter")}
            color="#f50"
            onClick={() => handleModalCancelBooking(data)}
          >
            Hủy tour
          </Tag>
        ) : (
          <></>
        )}
      </div>
    );
  }
  //============ CHECK XEM ẨN HIỆN NÚT ĐÁNH GIÁ TOUR  =================

  function isAfterFinish(dateInput) {
    const currentDate = new Date();
    const inputDate = new Date(dateInput);
    return currentDate > inputDate;
  }

  function EvaluateButton(data) {
    const showCancelButton = true;
    // const showCancelButton = isAfterFinish(data?.Calendar?.endDay);

    return (
      <div>
        {showCancelButton && data.status != "ĐÃ HỦY" ? (
          <button
            className={cx("btn_eval")}
            onClick={() => handleModalEvalBooking(data)}
          >
            Đánh giá
          </button>
        ) : (
          <></>
        )}
      </div>
    );
  }

  return (
    <div className={cx("wrapper")}>
      <div className={cx("p-2")}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        <Table dataSource={listBookingTour} columns={columns} />;
      </div>

      <ModalCancelBooking
        isShowModalCancelBooking={isShowModalCancelBooking}
        setIsShowModalCancelBooking={setIsShowModalCancelBooking}
        dataModalCancelBooking={dataModalCancelBooking}
        setDataModalCancelBooking={setDataModalCancelBooking}
        getListBookingTour={getListBookingTour}
      />

      <ModalDetailBillBooking
        isShowModalDetailBillBooking={isShowModalDetailBillBooking}
        setIsShowModalDetailBillBooking={setIsShowModalDetailBillBooking}
        dataModalDetailBillBooking={dataModalDetailBillBooking}
        setDataModalDetailBillBooking={setDataModalDetailBillBooking}
        getListBookingTour={getListBookingTour}
      />
      <ModalEvalBooking
        isShowModalEvalBooking={isShowModalEvalBooking}
        setIsShowModalEvalBooking={setIsShowModalEvalBooking}
        dataModalEvalBooking={dataModalEvalBooking}
        setDataModalEvalBooking={setDataModalEvalBooking}
        getListBookingTour={getListBookingTour}
      />
    </div>
  );
}

export default OrderBuy;
