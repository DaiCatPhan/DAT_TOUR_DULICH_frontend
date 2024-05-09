import className from "classnames/bind";
import styles from "./Notification.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../../services/NotificationService";
import BookingService from "../../../services/BookingService";
import moment from "moment";
import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Notification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notification, setNotification] = useState([]);

  const getListNotification = async () => {
    const res = await NotificationService.readID(`ID_Notification=${id}`);
    if (res && res.data.EC == 0) {
      let cus = res.data.DT;
      cus.key = cus.id;
      setNotification(cus);
    }
  };

  useEffect(() => {
    getListNotification();
  }, [id]);

  const handleReplaceTour = () => {
    navigate(`/tours/${notification?.Calendar?.Tour?.id}`);
  };

  const handleCancelTour = async () => {
    const dataSend = {
      ID_Notification: id,
      updateNotification: "true",
      id: notification?.BookingTour?.id,
      status: "ĐÃ HỦY",
      cancel_booking: "1",
      date_cancel_booking: new Date(),
      reason_cancel_booking:
        "Hủy tour do hệ thống không đủ điều kiện cho chuyến đi",
    };
    const res = await BookingService.update(dataSend);
    if (res && res.data.EC == 0) {
      toast.success("Hủy tour thành công");
      navigate("/user/order-buy");
    } else {
      toast.error(res.data.EM);
    }
  };

  const columns = [
    {
      title: "Mã đặt tour",
      dataIndex: "ID_BookingTour",
      key: "ID_BookingTour",
      width: 40,
    },
    {
      title: "ảnh",
      dataIndex: "",
      key: "image",
      render: (data) => {
        console.log("data", data);
        return (
          <img
            width={150}
            height={90}
            src={data?.BookingTour?.Calendar?.Tour?.image}
            alt="notFound"
          />
        );
      },
      width: 200,
    },
    {
      title: "tour",
      dataIndex: "",
      key: "nameTour",
      render: (data) => {
        return <div>{data?.BookingTour?.Calendar?.Tour?.name}</div>;
      },
    },
    {
      title: "lịch",
      dataIndex: "",
      key: "calendar",
      render: (data) => {
        return (
          <div className={cx("d-flex")}>
            <div>
              {moment(data?.BookingTour?.Calendar?.startDay).format(
                "DD-MM-YYYY"
              )}
            </div>
            <div className={cx("mx-2")}>/</div>
            <div>
              {moment(data?.BookingTour?.Calendar?.endDay).format("DD-MM-YYYY")}
            </div>
          </div>
        );
      },
    },
    {
      title: "Chuyển lịch của tour",
      dataIndex: "",
      key: "calendar",
      render: (data) => {
        return (
          <Button onClick={handleReplaceTour} type="primary">
            Chuyển lịch tour
          </Button>
        );
      },
    },
    {
      title: "Hủy tour",
      dataIndex: "",
      key: "calendar",
      render: () => {
        return (
          <Button onClick={handleCancelTour} type="primary" danger>
            Hủy tour
          </Button>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container my-5")}>
        <h3 className={cx("text-danger text-center")}>
          <b>{notification.title}</b>
        </h3>

        <div>
          <Table dataSource={[notification]} columns={columns} bordered />
        </div>

        <div>
          {notification && notification?.contentTEXT && (
            <div
              dangerouslySetInnerHTML={{
                __html: notification?.contentTEXT,
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
