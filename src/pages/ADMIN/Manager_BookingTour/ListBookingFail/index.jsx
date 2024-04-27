import className from "classnames/bind";
import styles from "./ListBookingFail.module.scss";
const cx = className.bind(styles);

import { Table } from "antd";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { Button } from "antd";
import { toast } from "react-toastify";

import BookingService from "../../../../services/BookingService";
import ModalCancel from "../components/ModalCancel";

function ListBookingFail() {
  const [listTourFail, setListTourFail] = useState([]);
  const [listCalendarWithTour, setListCalendarWithTour] = useState([]);
  const [active, setActive] = useState(null);

  const [isShowModalCancel, setIsShowModalCancel] = useState(false);
  const [dataModalCancel, setDataModalCancel] = useState({});

  const getListTourFail = async () => {
    const res = await BookingService.getListTourFail();
    if (res && res.data.EC == 0) {
      setListTourFail(res.data.DT);
      setListCalendarWithTour(res.data.DT[0]);
      setActive(res.data.DT[0].id);
    }
  };

  useEffect(() => {
    getListTourFail();
  }, []);

  const handleClickTourFail = (data) => {
    setActive(data.id);
    setListCalendarWithTour(data);
  };

  const cancelCalendandNoficationTour = async (data) => {
    setIsShowModalCancel(true);
    setDataModalCancel(data);
  };

  const submit = async (data) => {
    const dataSend = dataModalCancel;
    dataSend.notification = data;
    const res = await BookingService.cancelCalendarandNotificationBooking(
      dataSend
    );
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListTourFail();
    }
  };

  const columns = [
    {
      title: "mã lịch",
      dataIndex: "id",
      key: "id",
      width: 100,
    },
    {
      title: "thời gian",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div className={cx("d-flex")}>
            <div>
              <Tag color="blue">
                {moment(data?.startDay).format("DD-MM-YYYY")}
              </Tag>
            </div>
            <div>
              <Tag color="blue">
                {moment(data?.startDay).format("DD-MM-YYYY")}
              </Tag>
            </div>
          </div>
        );
      },
    },
    {
      title: "Số lượt đặt",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{data?.totalTickets}</div>;
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => cancelCalendandNoficationTour(record)}
            >
              Hủy tour và gửi thông báo
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-4")}>
          <div className={cx("border", "listTour")}>
            <h5 className={cx("border p-1", "title")}>
              DANH SACH TOUR KHÔNG ĐỦ NGƯỜI ĐẶT
            </h5>

            <div className={cx("px-2")}>
              {listTourFail?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    className={cx("item", { active: active == item.id })}
                    onClick={() => handleClickTourFail(item)}
                  >
                    {item?.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx("col-lg-8")}>
          <h5 className={cx("py-2", "title")}> BẢNG LỊCH </h5>
          <Table
            dataSource={listCalendarWithTour?.calendarFail}
            columns={columns}
            bordered
          />
        </div>
      </div>
      <ModalCancel
        isShowModalCancel={isShowModalCancel}
        setIsShowModalCancel={setIsShowModalCancel}
        dataModalCancel={dataModalCancel}
        setDataModalCancel={setDataModalCancel}
        listCalendarWithTour={listCalendarWithTour}
        submit={submit}
      />
    </div>
  );
}

export default ListBookingFail;
