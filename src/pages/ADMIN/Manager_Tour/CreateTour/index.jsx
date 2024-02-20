import className from "classnames/bind";
import styles from "./CreateTour.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
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
  Result,
} from "antd";
import { InputNumber, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { IconTrashX, IconBackspace } from "@tabler/icons-react";
const { RangePicker } = DatePicker;
import moment from "moment";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
const mdParser = new MarkdownIt(/* Markdown-it options */);
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";

import Spin from "../../../../components/Spin";

import TourService from "../../../../services/TourService";
import ProcessService from "../../../../services/ProcessService";
import CalendarService from "../../../../services/CalendarService";

import data from "../../../../components/Data/data";

function CreateTour() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [spin, setSpin] = useState(false);
  const [isShowNoticationCreateTour, setIsShowNoticationCreateTour] =
    useState(false);

  const [formCreate] = Form.useForm();
  const [formCalendar] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [imageTour, setImageTour] = useState("");
  const [processTour_TEXT, setProcessTour_TEXT] = useState("");
  const [processTour_HTML, setProcessTour_HTML] = useState("");

  const [infoDetailTour, setInfoDetailTour] = useState({});
  const [infoDetailCalendar, setInfoDetailCalendar] = useState([]);

  const typeTour = data?.typeTour;

  const getTourInformation = async () => {
    try {
      // Kiểm tra xem có id trong localStorage hay không
      const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));

      if (TOUR_localStorage && TOUR_localStorage.id) {
        const res = await TourService.getTour(TOUR_localStorage.id);

        if (res && res.data.EC === 0 && res.data.DT.id) {
          let resCopy = res.data.DT;
          resCopy.key = resCopy.id;

          setInfoDetailTour(resCopy);
          setInfoDetailCalendar(res.data.DT.Calendars);
          formCalendar.setFieldsValue(res.data.DT);
        }
      } else {
        // Nếu không có id, không thực hiện gọi API
        console.log("Không có id trong localStorage, không gọi API.");
      }
    } catch (error) {
      console.error("Lỗi khi gọi API để lấy thông tin tour:", error);
    }
  };

  useEffect(() => {
    getTourInformation();
  }, [localStorage.getItem("TOUR")]);

  const checkTour = () => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    if (TOUR_localStorage && TOUR_localStorage.id) {
      toast.error(
        `  Tour ${TOUR_localStorage?.name} chưa hoàn thành , vui lòng hoàn thành tạo Tour !!!`
      );
      return 1;
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </button>
  );

  const handleChangeUpload = (info) => {
    setImageTour(info.file.originFileObj);
  };

  function handleEditorChange_ProcessTour({ html, text }) {
    setProcessTour_HTML(html);
    setProcessTour_TEXT(text);
  }

  // TẠO TOUR
  const onFinish = async (values) => {
    const checkTourEixt = checkTour();
    if (checkTourEixt) {
      return;
    }

    const data = values;
    data.duration = `${values.duration_am} ngày ${values.duration_pm} đêm`;

    const res = await TourService.createTour(data);

    if (res && res.data.EC === 0) {
      toast.success("Tạo tour thành công ");
      localStorage.setItem("TOUR", JSON.stringify(res.data.DT));
      setIsShowNoticationCreateTour(true);
    } else {
      toast.error(res.data.EM);
    }
  };

  // TAO IMAGE
  const upLoadImageTour = async () => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    const id_tour = TOUR_localStorage.id;

    if (!id_tour) {
      return toast.warning("Vui lòng tạo tour trước !!!");
    }

    if (!imageTour) {
      return toast.error("Vui lòng chọn ảnh !!!");
    }

    const formData = new FormData();
    formData.append("image", imageTour);
    formData.append("ID_Tour", id_tour);

    setSpin(true);
    const res = await TourService.uploadImageTour(formData);
    if (res && res.data.EC === 0) {
      toast.success("Cập nhật hình ảnh thành công");
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
    setSpin(false);
  };

  // TAO PROCESSTOUR
  const createProcess = async () => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    const idTour = TOUR_localStorage?.id;

    if (!idTour) {
      return toast.warning("Vui lòng tạo tour trước !!!");
    }

    if (!processTour_TEXT || !processTour_HTML) {
      return toast.error("Vui lòng nhập nội dung chương trình tour !!!");
    }

    const rawData = {
      ID_Tour: +idTour,
      descriptionTEXT: processTour_TEXT,
      descriptionHTML: processTour_HTML,
    };

    const res = await ProcessService.createProcessTour(rawData);

    if (res && res.data.EC === 0) {
      toast.success("Tạo chương trương trình tour thành công");
      localStorage.setItem("ID_PROCESS", res.data.DT.id);
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
  };

  // TAO CALENDAR
  const onFinishCalendar = async (values) => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    const id_tour = TOUR_localStorage.id;

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
      getTourInformation();
    } else {
      toast.error(res.data.EM);
    }
  };

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

  // COLUMN CALENDAR
  const columnsTableCalendar = [
    {
      title: "Mã tour",
      dataIndex: "ID_Tour",
      key: "ID_Tour",
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
            <div>Giá người lớn : {Calendar?.priceAdult}</div>
            <div>Giá trẻ em : {Calendar?.priceChild}</div>
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

  // FINISH
  const handleFinishCreateTour = () => {
    const TOUR_localStorage = JSON.parse(localStorage.getItem("TOUR"));
    const PROCESSTOUR_localStorage = localStorage.getItem("ID_PROCESS");
    if (!TOUR_localStorage) {
      toast.warning("Bạn chưa tạo tour !!!");
      return;
    }
    if (!PROCESSTOUR_localStorage) {
      toast.warning("Bạn chưa tạo chương trình tour !!!");
      return;
    }
    localStorage.removeItem("TOUR");
    localStorage.removeItem("ID_PROCESS");
    setIsShowNoticationCreateTour(false);
    formCreate.resetFields();
    formCalendar.resetFields();
    setProcessTour_TEXT("");
    setProcessTour_HTML("");
    setInfoDetailCalendar([]);
    toast.success("Hoàn thành việc tạo tour ");
  };

  return (
    <div className={cx("wrapper  ")}>
      {isShowNoticationCreateTour ? (
        <div className={cx("topTitle")}>
          Đang tạo tour : {JSON.parse(localStorage.getItem("TOUR"))?.name}
        </div>
      ) : (
        <></>
      )}

      {contextHolder}
      {/* TOUR */}
      <div>
        <div className={cx("row border")}>
          <h5>1. Tạo Tour</h5>
          <div className={cx("col-lg    ")}>
            <Form
              form={formCreate}
              name="basic"
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              style={{
                maxWidth: 1600,
              }}
              initialValues={{
                status: "1",
              }}
              onFinish={onFinish}
            >
              {/* 1 */}
              <Form.Item
                label="Tên tour"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tour !!!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* 2 */}
              <div className={cx("d-flex justify-content-between")}>
                <Form.Item
                  className={cx("w-100")}
                  label="Thể loại tour"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa danh !",
                    },
                  ]}
                >
                  <Select placeholder="Chọn chủ đề ">
                    {typeTour?.map((item) => {
                      return (
                        <Select.Option value={item?.type} key={item?.id}>
                          {item?.type}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <div className={cx("mx-2")}></div>
              </div>

              {/* 3 */}
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

              {/* 4*/}
              <div className={cx("d-flex justify-content-between     ")}>
                <Form.Item
                  className={cx("w-50")}
                  label="Tổng thời gian ngày"
                  name="duration_am"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tổng thời gian ngày !",
                    },
                  ]}
                >
                  <InputNumber
                    className={cx("w-100")}
                    min={1}
                    placeholder="Nhập tổng thời gian ngày"
                  />
                </Form.Item>

                <div className={cx("mx-2")}></div>

                <Form.Item
                  className={cx("w-50  ")}
                  label="Tổng thời gian đêm"
                  name="duration_pm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tổng thời gian đêm !",
                    },
                  ]}
                >
                  <InputNumber
                    className={cx("w-100")}
                    min={0}
                    placeholder="Nhập tổng thời gian đêm"
                  />
                </Form.Item>
              </div>

              {/* 5 */}
              <div className={cx("d-flex justify-content-between   ")}>
                <Form.Item
                  className={cx("w-50")}
                  label="Phương tiện"
                  name="vehicle"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn phương tiện !",
                    },
                  ]}
                >
                  <Select placeholder="Chọn phương tiện" allowClear>
                    <Select.Option value="xe">Xe</Select.Option>
                    <Select.Option value="tàu">Tàu</Select.Option>
                    <Select.Option value="bay">Bay</Select.Option>
                  </Select>
                </Form.Item>

                <div className={cx("mx-2")}></div>

                <Form.Item
                  name="status"
                  label="Trạng thái tour"
                  className={cx("w-50")}
                >
                  <Radio.Group>
                    <Radio value="1">Hoạt động</Radio>
                    <Radio value="0">Không hoạt động</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={cx("w-100 my-2")}
                >
                  TẠO TOUR
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      {/* UpLoad Image */}
      <div className={cx("row  my-5 border p-3 rounded border")}>
        <h5>2. Upload Hình Ảnh :</h5>
        <div
          className={cx("col-lg-6 m-auto border border-primary rounded p-0")}
        >
          <div className={cx("  p-3")}>
            <p>Chọn ảnh tour</p>
            <div className={cx("text-center")}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                onChange={handleChangeUpload}
                maxCount={1}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            {spin && <Spin />}
            <div>
              <button
                onClick={upLoadImageTour}
                className={cx("btn btn-primary w-100 my-2")}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div className={cx("createProcess my-5  ")}>
        <div className={cx("row  my-5 w-100")}>
          <div>
            <b> 3 .Tạo chương trình : </b>

            <MdEditor
              style={{ minHeight: "500px", maxHeight: "800px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange_ProcessTour}
              value={processTour_TEXT}
            />
          </div>

          <div className={cx("text-center my-3")}>
            <button
              onClick={createProcess}
              className={cx("btn btn-primary w-25")}
            >
              Tạo chương trình tour
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className={cx("createCalendar  ")}>
        <div className={cx("fs-5")}>
          <b>Tạo lịch</b>
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

      {/* FINISH */}
      <Result
        status="success"
        title="Hoàn thành việc tạo tour"
        extra={[
          <button
            onClick={handleFinishCreateTour}
            className={cx("btn btn-success")}
          >
            Hoàn thành tạo tour
          </button>,
        ]}
      />
    </div>
  );
}

export default CreateTour;
