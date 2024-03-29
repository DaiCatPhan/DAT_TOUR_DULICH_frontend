import className from "classnames/bind";
import styles from "./CalendarPage.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import moment from "moment";
import Function from "../../../../components/Functions/function";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Table,
  DatePicker,
  Radio,
  Upload,
} from "antd";
import { InputNumber, message } from "antd";
const { RangePicker } = DatePicker;
import { IconBackspace } from "@tabler/icons-react";

import { useParams } from "react-router-dom";

import CalendarService from "../../../../services/CalendarService";
import { useEffect, useState } from "react";
import TourService from "../../../../services/TourService";

function CalendarPage() {
  let { id } = useParams();
  const [formCalendar] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [infoDetailCalendar, setInfoDetailCalendar] = useState([]);
  const [infoDetailTour, setInfoDetailTour] = useState({});

  const getTourInformation = async () => {
    if (id) {
      const res = await TourService.getTour(id);

      if (res && res.data.EC === 0) {
        const cus = res.data.DT.Calendars.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
        setInfoDetailCalendar(cus);
        setInfoDetailTour(res.data.DT);
        formCalendar?.setFieldsValue(res.data.DT);
      }
    }
  };

  useEffect(() => {
    getTourInformation();
  }, []);

  const handleDeleteCalendar = async (data) => {
    const ID_Calendar = data.id;
    if (ID_Calendar) {
      const res = await CalendarService.deleteCalendar({
        id: ID_Calendar,
        table: "Calendar",
      });

      if (res && res.data.EC == 0) {
        messageApi.open({
          type: "success",
          content: "Xóa lịch thành công",
        });
        getTourInformation();
      } else {
        messageApi.open({
          type: "error",
          content: "Lỗi không xóa được !!!",
        });
      }
    }
  };

  const onFinishCalendar = async (values) => {
    const id_tour = id;

    if (!id_tour) {
      return toast.warning("Vui lòng tạo tour trước !!!");
    }

    const dataCalendar = {
      ID_Tour: +id_tour,
      numberSeat: values.numberSeat,
      priceAdult: values.priceAdult,
      priceChild: values.priceChild,
      startDay: values.calendar[0].$d,
      endDay: values.calendar[1].$d,
    };

    const res = await CalendarService.createCalendar(dataCalendar);

    if (res && res.data.EC === 0) {
      toast.success("Tạo lịch tour thành công");
      formCalendar.resetFields();
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
  };

  // COLUMN CALENDAR
  const columnsTableCalendar = [
    {
      title: "Mã tour",
      dataIndex: "ID_Tour",
      key: "ID_Tour",
    },

    {
      title: "Mã lịch",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Số chỗ ",
      dataIndex: "numberSeat",
      key: "numberSeat",
    },
    {
      title: "Giá",
      dataIndex: "",
      key: "priceColumn",
      render: (Calendar) => {
        return (
          <div>
            <div>
              Giá người lớn :
              {Function.formatNumberWithCommas(Calendar?.priceAdult)} vnd
            </div>

            <div>
              Giá trẻ em :
              {Function.formatNumberWithCommas(Calendar?.priceChild)}
            </div>
          </div>
        );
      },
    },

    {
      title: "Lịch",
      dataIndex: "",
      key: "CalendarColumn",

      render: (Calendar) => (
        <div>
          <div>
            Ngày khởi hành : {moment(Calendar?.startDay).format("DD-MM-YYYY")}
          </div>

          <div>
            Ngày kết thúc : {moment(Calendar?.endDay).format("DD-MM-YYYY")}
          </div>
        </div>
      ),
    },

    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div>
            <IconBackspace
              color="red"
              width={20}
              className={cx("poiter")}
              onClick={() => handleDeleteCalendar(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("createCalendar  ")}>
        <div className={cx("fs-5  ")}>
          <h5>
            <b>Tạo lịch</b> : {infoDetailTour?.name || ""}
            <div className={cx("my-4")}></div>
          </h5>
        </div>
        <div className={cx("row border")}>
          <div className={cx("col-lg-5 border p-0 vh-50")}>
            <div className={cx("p-2")}>
              <Form
                form={formCalendar}
                name="form_calendar"
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                onFinish={onFinishCalendar}
                autoComplete="off"
              >
                <Form.Item
                  label="Số chỗ ngồi"
                  name="numberSeat"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số chỗ ngồi !",
                    },
                  ]}
                >
                  <InputNumber className={cx("w-100")} />
                </Form.Item>

                <div className={cx("d-flex justify-content-between")}>
                  <Form.Item
                    className={cx("w-50")}
                    label="Giá tour người lớn"
                    name="priceAdult"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá tour người lớn !",
                      },
                    ]}
                  >
                    <InputNumber
                      className={cx("w-100 ")}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      addonAfter="VND"
                    />
                  </Form.Item>

                  <div className={cx("mx-2")}></div>

                  <Form.Item
                    className={cx("w-50")}
                    label="Giá tour trẻ em"
                    name="priceChild"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá tour trẻ em!",
                      },
                    ]}
                  >
                    <InputNumber
                      className={cx("w-100 ")}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      addonAfter="VND"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Chọn lịch"
                  name="calendar"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập lịch cho tour!",
                    },
                  ]}
                >
                  <RangePicker className={cx("w-100")} format="DD/MM/YYYY  " />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 20,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={cx("col-lg-7 p-0")}>
            <div className={cx("p-2")}>
              <Table
                dataSource={infoDetailCalendar}
                bordered
                columns={columnsTableCalendar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
