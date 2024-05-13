import className from "classnames/bind";
import styles from "./ListBookingFail.module.scss";
const cx = className.bind(styles);

import { InputNumber, Table } from "antd";
import { Tag } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import { IconPencilMinus, IconTrash, IconEye } from "@tabler/icons-react";
import { Button } from "antd";
import { toast } from "react-toastify";
import { Form } from "antd";

import BookingService from "../../../../services/BookingService";
import ModalCancel from "../components/ModalCancel";
import ModalPeopleFailCalendar from "../components/ModalPeopleFailCalendar";
import { IconListDetails } from "@tabler/icons-react";

function ListBookingFail() {
  const [formFilterCancel] = Form.useForm();
  const [listTourFail, setListTourFail] = useState([]);
  const [listCalendarWithTour, setListCalendarWithTour] = useState([]);
  const [active, setActive] = useState(null);

  const [numberDaybeforeGo, setNumberDaybeforeGo] = useState(5);
  const [conditionTicketThatCancel, setConditionTicketThatCancel] =
    useState(10);

  const [isShowModalCancel, setIsShowModalCancel] = useState(false);
  const [dataModalCancel, setDataModalCancel] = useState({});

  const [isShowModalPeopleFailCalendar, setIsShowModalPeopleFailCalendar] =
    useState(false);
  const [dataModalPeopleFailCalendar, setDataModalPeopleFailCalendar] =
    useState({});

  const getListTourFail = async () => {
    const res = await BookingService.getListTourFail(
      `numberDaybeforeGo=${numberDaybeforeGo}&conditionTicketThatCancel=${conditionTicketThatCancel}`
    );
    if (res && res.data.EC == 0) {
      setListTourFail(res.data.DT);
      setListCalendarWithTour(res.data.DT[0]);
      setActive(res.data.DT[0].id);
    }
  };

  useEffect(() => {
    formFilterCancel.setFieldsValue({
      numberDaybeforeGo: numberDaybeforeGo,
      conditionTicketThatCancel: conditionTicketThatCancel,
    });
    getListTourFail();
  }, []);

  const handleClickTourFail = (data) => {
    setActive(data.id);
    setListCalendarWithTour(data);
  };

  const modalNotificationFailTour = async (data) => {
    setIsShowModalCancel(true);
    setDataModalCancel(data);
  };

  const viewCustomer = async (data) => {
    setIsShowModalPeopleFailCalendar(true);
    setDataModalPeopleFailCalendar(data);
  };

  const submit = async (data) => {
    const dataSend = dataModalCancel;
    dataSend.notification = data;
    const res = await BookingService.notificationFailTour(dataSend);
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
      title: "Cập nhật",
      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <Button
              type="primary"
              danger
              size="small"
              onClick={() => modalNotificationFailTour(record)}
            >
              gửi thông báo
            </Button>
            <div className={cx("mx-2")}></div>
            <IconListDetails
              className={cx("iconDetail")}
              onClick={() => viewCustomer(record)}
            >
              Hủy tour
            </IconListDetails>
          </div>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const { numberDaybeforeGo, conditionTicketThatCancel } = values;
    const res = await BookingService.getListTourFail(
      `numberDaybeforeGo=${numberDaybeforeGo}&conditionTicketThatCancel=${conditionTicketThatCancel}`
    );
    if (res && res.data.EC == 0) {
      setListTourFail(res.data.DT);
      setListCalendarWithTour(res.data.DT[0]);
      setActive(res.data.DT[0].id);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("px-4")}>
        <Form name="basic" onFinish={onFinish} form={formFilterCancel}>
          <div className={cx("form")}>
            <div>
              <Form.Item
                label="Lọc những tour có số ngày trước ngày khởi hành "
                name="numberDaybeforeGo"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            </div>
            <div className={cx("mx-3")}></div>
            <div>
              <Form.Item
                label="Lọc những lịch có lượt đặt bé hơn hoặc bằng"
                name="conditionTicketThatCancel"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <InputNumber min={0} />
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
                  Tìm
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className={cx("row p-5", "border_t_26bed6")}>
        <div className={cx("col-lg-4 p-0", "border_26bed6")}>
          <h5 className={cx("title")}>DANH SACH TOUR KHÔNG ĐỦ NGƯỜI ĐẶT</h5>

          <div className={cx("listTour")}>
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

        <div className={cx("col-lg-8 p-0", "border_26bed6")}>
          <h5 className={cx("title")}> BẢNG LỊCH </h5>
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

      <ModalPeopleFailCalendar
        isShowModalPeopleFailCalendar={isShowModalPeopleFailCalendar}
        setIsShowModalPeopleFailCalendar={setIsShowModalPeopleFailCalendar}
        dataModalPeopleFailCalendar={dataModalPeopleFailCalendar}
        setDataModalPeopleFailCalendar={setDataModalPeopleFailCalendar}
      />
    </div>
  );
}

export default ListBookingFail;
