import className from "classnames/bind";
import styles from "./Notification.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
import { useDispatch, useSelector } from "react-redux";
import NotificationService from "../../../services/NotificationService";
import moment from "moment";
import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Notification() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notification, setNotification] = useState([]);

  const getListNotification = async () => {
    const res = await NotificationService.readID(`ID_Notification=${id}`);
    if (res && res.data.EC == 0) {
      const cus = res.data.DT;
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

  const columns = [
    {
      title: "ảnh",
      dataIndex: "",
      key: "image",
      render: (data) => {
        return (
          <img width={150} height={90} src={data?.Tour?.image} alt="notFound" />
        );
      },
      width: 200,
    },
    {
      title: "tour",
      dataIndex: "",
      key: "nameTour",
      render: (data) => {
        return <div>{data?.Tour?.name}</div>;
      },
    },
    {
      title: "lịch",
      dataIndex: "",
      key: "calendar",
      render: (data) => {
        return (
          <div className={cx("d-flex")}>
            <div>{moment(data?.startDay).format("DD-MM-YYYY")}</div>
            <div className={cx("mx-2")}>/</div>
            <div>{moment(data?.endDay).format("DD-MM-YYYY")}</div>
          </div>
        );
      },
    },
    {
      title: "Chuuyển lịch của tour",
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
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container my-5")}>
        <h3 className={cx("text-danger text-center")}>
          <b>{notification.title}</b>
        </h3>

        <div>
          <Table
            dataSource={[notification?.Calendar]}
            columns={columns}
            bordered
          />
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
