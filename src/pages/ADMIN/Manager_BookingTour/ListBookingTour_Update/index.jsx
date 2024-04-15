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
} from "antd";
import { IconList } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BookingService from "../../../../services/BookingService";
import ModalUpdateStatusBooking from "../components/ModalUpdateStatusBooking";

function ListBookingTour_Update() {
  const [pageSize, setPageSize] = useState(5);
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
      return <div className={cx("text-primary", "fw_600")}>Chờ xác nhận</div>;
    } else if (status == "ĐÃ DUYỆT") {
      return <div className={cx("text-success", "fw_600")}>Đã duyệt</div>;
    } else if (status === "CHỜ HỦY") {
      return <div className={cx("text-warning", "fw_600")}>Chờ hủy</div>;
    } else if (status === "ĐÃ HỦY") {
      return <div className={cx("text-danger", "fw_600")}>Đã hủy</div>;
    }
  };

  const handleStatusPayment = (status) => {
    if (status == "ĐÃ THANH TOÁN") {
      return <div className={cx("text-success", "fw_600")}>ĐÃ THANH TOÁN</div>;
    } else if (status == "CHƯA THANH TOÁN") {
      return <div className={cx("text-danger", "fw_600")}>CHƯA THANH TOÁN</div>;
    }
  };

  const onChangeTab = (key) => {
    setStatusTab(key);
  };

  const handleModalUpdateStatus = async () => {
    alert("handleModalUpdateStatus");
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
                    // onClick={() => handleModalDetailBillBooking(data)}
                  >
                    Chi tiết
                  </Tag>
                </div>
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
                  <div>
                    <b>1/2/2023</b>
                  </div>
                  <div className={cx("mx-1")}>-</div>
                  <div>
                    <b> 4/2/2023</b>
                  </div>
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

          <div
            className={cx("d-flex justify-content-between  ", "bgcolor_FFFEFB")}
          >
            <div className={cx("infoCustomer")}>
              <div className={cx("title")}>Thông tin khách hàng</div>
              <div className={cx("row my-1")}>
                <div className={cx("col-lg-3")}>Họ và tên</div>
                <div className={cx("col-lg-3")}>
                  <b>Phan dai cat</b>
                </div>

                <div className={cx("col-lg-3")}>Số điện thoại</div>
                <div className={cx("col-lg-3")}>
                  <b>0328472724</b>
                </div>
              </div>
              <div className={cx("row my-1")}>
                <div className={cx("col-lg-3")}>Email</div>
                <div className={cx("col-lg-9")}>
                  <b>phandaicat12032002@gmail.com</b>
                </div>
              </div>
            </div>

            <div className={cx("evaluate")}>
              <div className={cx("intoMoney")}>
                Thành tiền: <span>{data?.total_money}</span>
              </div>
              <div className={cx("d-flex mt-3")}>
                <button
                  className={cx("btn_update")}
                  onClick={() => handleModalUpdateStatusBooking(data)}
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const itemsTab = [
    {
      key: "status=ĐÃ DUYỆT&payment_status=ĐÃ THANH TOÁN",
      label: (
        <Badge count={numberStatusBooking?.Soluong_DaDuyet?.count || 0}>
          <div className={cx("px-3")}>ĐÃ DUYỆT</div>
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
              //  onFinish={onFinish}
            >
              <div className={cx("d-flex")}>
                <div>
                  <Form.Item label="Chọn ngày">
                    <DatePicker />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Tìm kiếm
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <div className={cx("px-3")}>
          <div>
            <Table dataSource={listBookingTour} columns={columns} />
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

export default ListBookingTour_Update;
