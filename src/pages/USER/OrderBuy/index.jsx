import className from "classnames/bind";
import styles from "./OrderBuy.module.scss";
const cx = className.bind(styles);

import BookingService from "../../../services/BookingService";

import ModalCancelBooking from "./components/ModalCancelBooking";
import ModalDetailBillBooking from "./components/ModalDetailBillBooking";
import ModalEvalBooking from "./components/ModalEvalBooking";

import { Space, Table, Tag } from "antd";
import { Tabs } from "antd";
import { useEffect, useState } from "react";

function OrderBuy() {
  const [listBookingTour, setListBookingTour] = useState([]);
  const [status, setStatus] = useState("");

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
    const res = await BookingService.read(`ID_Customer=2&status=${status}`);
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
  }, [status]);

  const handleStatusBooking = (status) => {
    if (status == "Chờ xác nhận") {
      return <div className={cx("text-primary", "fw_600")}>Chờ xác nhận</div>;
    } else if (status == "Đã duyệt") {
      return <div className={cx("text-danger", "fw_600")}>Đã hủy</div>;
    } else if (status === "Chờ hủy") {
      return <div className={cx("text-danger", "fw_600")}>Chờ hủy</div>;
    }
  };

  const columns = [
    {
      key: "data",
      render: (data) => (
        <div className={cx("cardOrderBuy")}>
          <div>
            <div className={cx("titleHeader")}>
              <div>
                <div>
                  <Tag className={cx("poiter")} color="magenta">
                    Xem tour
                  </Tag>
                  <Tag
                    className={cx("poiter")}
                    color="#108ee9"
                    onClick={() => handleModalDetailBillBooking(data)}
                  >
                    Chi tiết
                  </Tag>
                  <Tag
                    className={cx("poiter")}
                    color="#f50"
                    onClick={() => handleModalCancelBooking(data)}
                  >
                    Hủy tour
                  </Tag>
                </div>
              </div>
              <div className={cx("d-flex")}>
                {handleStatusBooking(data?.status)}{" "}
                <span className={cx("mx-1 text-secondary")}>|</span> Tour đã
                được đặt thành công
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
                  <div>1/2/2023 </div>
                  <div className={cx("mx-1")}>-</div>
                  <div> 4/2/2023</div>
                </div>
                <div className={cx("d-flex   w-50 justify-content-between")}>
                  <div>Người lớn : </div>
                  <div>x3</div>
                  <div>2.000.000 vnd</div>
                </div>
                <div className={cx("d-flex   w-50 justify-content-between")}>
                  <div>Trẻ em : </div>

                  <div>
                    <span className={cx("ml_22")}>x3</span>
                  </div>
                  <div>2.000.000 vnd</div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("my-2")}></div>

          <div className={cx("d-flex justify-content-end", "bgcolor_FFFEFB")}>
            <div></div>
            <div className={cx("evaluate")}>
              <div className={cx("intoMoney")}>
                Thành tiền: <span>{data?.total_money}</span>
              </div>
              <div className={cx("d-flex mt-3")}>
                <button className={cx("btn_booking")}>Đặt tour lại</button>
                <button
                  className={cx("btn_eval")}
                  onClick={() => handleModalEvalBooking(data)}
                >
                  Đánh giá
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const onChange = (key) => {
    setStatus(key);
  };
  const items = [
    {
      key: "",
      label: "Tất cả",
    },
    {
      key: "Chờ xác nhận",
      label: "Chờ xác nhận",
    },
    {
      key: "Đã duyệt",
      label: "Đã duyệt",
    },
    {
      key: "Hoàn thành",
      label: "Hoàn thành",
    },
    {
      key: "Chờ hủy",
      label: "Chờ hủy",
    },
    {
      key: "Đã hủy",
      label: "Đã hủy",
    },
  ];

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
