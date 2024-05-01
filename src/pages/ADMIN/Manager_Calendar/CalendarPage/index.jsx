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
  Tag,
  Upload,
} from "antd";
import { InputNumber, message } from "antd";
const { RangePicker } = DatePicker;
import { IconBackspace, IconChevronsLeft, IconEdit } from "@tabler/icons-react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { Tabs } from "antd";

import { Link, useParams } from "react-router-dom";

import CalendarService from "../../../../services/CalendarService";
import { useEffect, useState } from "react";
import TourService from "../../../../services/TourService";

import ModalUpdateCalendar from "../components/ModalUpdateCalendar";

function CalendarPage() {
  let { id } = useParams();
  const [formCalendar] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [infoDetailCalendar, setInfoDetailCalendar] = useState([]);
  const [infoDetailTour, setInfoDetailTour] = useState({});

  const [isShowModalUpdateCalendar, setIsShowModalUpdateCalendar] =
    useState(false);
  const [dataModalUpdateCalendar, setDataModalUpdateCalendar] = useState({});
  const handleModalUpdateCalendar = (data) => {
    setIsShowModalUpdateCalendar(true);
    setDataModalUpdateCalendar(data);
  };

  const getTourInformation = async () => {
    if (id) {
      const res = await TourService.getTour(
        `id=${id}&sortStartDayCalendar=DESC&getAll=true`
      );

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
        formCalendar?.setFieldsValue({ numberMonth: 1 });
        formCalendar?.setFieldsValue({ numberSeat: 50 });
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
        ID_Calendar: ID_Calendar,
      });

      if (res && res.data.EC == 0) {
        messageApi.open({
          type: "success",
          content: `${res.data.EM}`,
        });
        getTourInformation();
      } else {
        messageApi.open({
          type: "error",
          content: `${res.data.EM}`,
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
      startDay: moment(values.calendar[0].$d).format("YYYY-MM-DD"),
      endDay: moment(values.calendar[1].$d).format("YYYY-MM-DD"),
      numberMonth: values.numberMonth,
    };

    const res = await CalendarService.createCalendarWithMonth(dataCalendar);

    if (res && res.data.EC === 0) {
      toast.success("Tạo lịch tour thành công");
      formCalendar.resetFields();
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
  };

  const handleStatusCalendar = (status) => {
    if (status == "1") {
      return <Tag color="green">Hoạt động</Tag>;
    } else if (status == "0") {
      return <Tag color="red">Không hoạt động</Tag>;
    }
  };

  // COLUMN CALENDAR
  const columnsTableCalendar = [
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
      title: "Giá người lớn",
      dataIndex: "",
      key: "",
      render: (Calendar) => (
        <div>{Function.formatNumberWithCommas(Calendar?.priceAdult)} vnd</div>
      ),
    },

    {
      title: "Giá trẻ em",
      dataIndex: "",
      key: "",
      render: (Calendar) => (
        <div>{Function.formatNumberWithCommas(Calendar?.priceChild)} vnd</div>
      ),
    },

    {
      title: "Ngày khởi hành",
      dataIndex: "",
      key: "",
      render: (Calendar) => (
        <div>
          <Tag color="blue">
            {moment(Calendar?.startDay).format("DD-MM-YYYY")}
          </Tag>
        </div>
      ),
    },

    {
      title: "Ngày kết thúc",
      dataIndex: "",
      key: "",
      render: (Calendar) => (
        <div>
          <Tag color="blue">
            {moment(Calendar?.endDay).format("DD-MM-YYYY")}
          </Tag>
        </div>
      ),
    },

    {
      title: "Số đơn đặt",
      dataIndex: "",
      key: "",
      render: (data) => <div>{data?.booking?.numberBill || 0}</div>,
    },

    {
      title: "Số lượt đặt",
      dataIndex: "",
      key: "",
      render: (data) => <div>{data?.booking?.numberTicket || 0}</div>,
    },

    {
      title: "Trạng thái lịch",
      dataIndex: "",
      key: "",
      render: (data) => <div>{handleStatusCalendar(data?.status)}</div>,
    },

    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div className={cx("d-flex")}>
            <div>
              <IconBackspace
                color="red"
                width={20}
                className={cx("poiter")}
                onClick={() => handleDeleteCalendar(record)}
              />
            </div>
            <div className={cx("mx-2")}></div>
            <div>
              <IconEdit
                color="orange"
                width={20}
                className={cx("poiter")}
                onClick={() => handleModalUpdateCalendar(record)}
              />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("createCalendar")}>
        <div className={cx("d-flex align-items-center mb-2")}>
          <Link to={"/admin/managerTour/list"}>
            <div className={cx("iconBack")}>
              <IconChevronsLeft />
            </div>
          </Link>
          <h5 className={cx("mx-2")}>
            <b>Tạo lịch</b> : {infoDetailTour?.name || ""}
          </h5>
        </div>
        <div className={cx("border")}>
          <div className={cx("border p-0 vh-50")}>
            <div className={cx("px-2")}>
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
                <div
                  className={cx(
                    "d-flex justify-content-between align-items-center"
                  )}
                >
                  <div className={cx("mx-2")}>
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
                  </div>

                  <div className={cx("mx-2")}>
                    <Form.Item
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
                        className={cx("w-100")}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        addonAfter="VND"
                      />
                    </Form.Item>
                  </div>

                  <div className={cx("mx-2")}>
                    <Form.Item
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
                        className={cx("w-100")}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                        addonAfter="VND"
                      />
                    </Form.Item>
                  </div>

                  <div className={cx("mx-2")}>
                    <Form.Item
                      className={cx("w-100")}
                      label="Chọn lịch"
                      name="calendar"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập lịch cho tour!",
                        },
                      ]}
                    >
                      <RangePicker format="DD-MM-YYYY" />
                    </Form.Item>
                  </div>

                  <div className={cx("mx-2")}>
                    <Form.Item
                      label="Số tuần"
                      name="numberMonth"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số chỗ tuần !",
                        },
                      ]}
                    >
                      <InputNumber className={cx("w-100")} />
                    </Form.Item>
                  </div>

                  <div className={cx("mt-3")}>
                    <Form.Item
                      wrapperCol={{
                        offset: 0,
                        span: 24,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("mt-4")}
                      >
                        Cập nhật
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div>
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

      <ModalUpdateCalendar
        isShowModalUpdateCalendar={isShowModalUpdateCalendar}
        setIsShowModalUpdateCalendar={setIsShowModalUpdateCalendar}
        dataModalUpdateCalendar={dataModalUpdateCalendar}
        setDataModalUpdateCalendar={setDataModalUpdateCalendar}
        getTourInformation={getTourInformation}
      />
    </div>
  );
}

export default CalendarPage;
