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
} from "antd";
import { InputNumber, Space } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import TourService from "../../../../services/TourService";
import Spin from "../../../../components/Spin";

function CreateTour() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [spin, setSpin] = useState(false);

  const [imageTour, setImageTour] = useState("");
  const [ID_TOUR, setID_TOUR] = useState();
  const [NAME_TOUR, setNAME_TOUR] = useState();
  const [price_Include_TEXT, setPrice_Include_TEXT] = useState("");
  const [price_Include_HTML, setPrice_Include_HTML] = useState("");
  const [price_NotInclude_TEXT, setPrice_NotInclude_TEXT] = useState("");
  const [price_NotInclude_HTML, setPrice_NotInclude_HTML] = useState("");
  const [processTour_TEXT, setProcessTour_TEXT] = useState("");
  const [processTour_HTML, setProcessTour_HTML] = useState("");

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

  function handleEditorChange_price_Include_Text({ html, text }) {
    setPrice_Include_HTML(html);
    setPrice_Include_TEXT(text);
  }
  function handleEditorChange_price_NotInclude_Text({ html, text }) {
    setPrice_NotInclude_HTML(html);
    setPrice_NotInclude_TEXT(text);
  }
  function handleEditorChange_ProcessTour({ html, text }) {
    setProcessTour_TEXT(text);
    setProcessTour_HTML(html);
  }

  // TẠO TOUR
  const onFinish = async (values) => {
    const data = values;
    data.price_Include_TEXT = price_Include_TEXT;
    data.price_Include_HTML = price_Include_HTML;
    data.price_NotInclude_TEXT = price_NotInclude_TEXT;
    data.price_NotInclude_HTML = price_NotInclude_HTML;
    data.duration = `${values.duration_am} ngày ${values.duration_pm} đêm`;

    const res = await TourService.createTour(data);
    console.log("res >>>>>>", res);
    if (res && res.data.EC === 0) {
      toast.success("Tạo tour thành công ");
      localStorage.setItem("ID_TOUR", res.data.DT?.id);
      localStorage.setItem("NAME_TOUR", res.data.DT?.name);
      setID_TOUR(res.data.DT?.id);
      setNAME_TOUR(res.data.DT?.name);
    } else {
      toast.error(res.data.EM);
    }
  };

  // TAO CALENDAR
  const onFinishCalendar = (values) => {
    console.log("Success onFinishCalendar:", values);
  };

  // TAO IMAGE
  const upLoadImageTour = async () => {
    const formData = new FormData();
    formData.append("image", imageTour);

    formData.append("ID_Tour", ID_TOUR || localStorage.getItem("ID_TOUR"));

    setSpin(true);
    const res = await TourService.uploadImageTour(formData);
    if (res && res.data.EC === 0) {
      toast.success("Cập nhật hình ảnh thành công");
      setSpin(false);
    } else {
      toast.error(res.data.EM);
      setSpin(false);
    }
  };

  // TAO PROCESSTOUR
  const createProcess = async () => {};

  const dataSourceTable = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columnsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className={cx("wrapper  ")}>
      {/* TOUR */}
      <div>
        <div className={cx("row border")}>
          <div className={cx("col-lg    ")}>
            <Form
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
                  label="Địa danh nổi tiếng"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa danh !",
                    },
                  ]}
                >
                  <Select placeholder="Chọn địa điểm ">
                    <Option value="Sapa">Sapa</Option>
                    <Option value="Đà Nẵng">Đà Nẵng</Option>
                    <Option value="Hạ Long">Hạ Long</Option>
                    <Option value="Hà Nội">Hà Nội</Option>
                    <Option value="Phú Yên">Phú Yên</Option>
                    <Option value="Nha Trang">Nha Trang</Option>
                    <Option value="Quy Nhơn">Quy Nhơn</Option>
                    <Option value="Buôn Ma Thuột">Buôn Ma Thuột</Option>
                    <Option value="Phú Quốc">Phú Quốc</Option>
                    <Option value="Miền Tây">Miền Tây</Option>
                  </Select>
                </Form.Item>

                <div className={cx("mx-2")}></div>

                <Form.Item
                  className={cx("w-100")}
                  label="Chọn miền"
                  name="domain"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn miền!",
                    },
                  ]}
                >
                  <Select placeholder="Chọn miền ">
                    <Option value="Miền Bắc">Miền Bắc</Option>
                    <Option value="Miền Trung">Miền Trung</Option>
                    <Option value="Miền Nam">Miền Nam</Option>
                  </Select>
                </Form.Item>

                <div className={cx("mx-2")}></div>

                <Form.Item
                  className={cx("w-100")}
                  label="Chọn tỉnh"
                  name="province"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tỉnh!",
                    },
                  ]}
                >
                  <Select placeholder="Chọn địa điểm ">
                    <Option value="Ang giang">Ang giang</Option>
                    <Option value="Cần Thơ">Cần Thơ</Option>
                    <Option value="Hậu Giang">Hậu Giang</Option>
                  </Select>
                </Form.Item>
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
                    min={1}
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
                    <Option value="xe">Xe</Option>
                    <Option value="tàu">Tàu</Option>
                    <Option value="bay">Bay</Option>
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

              {/* Tour bao gồm */}
              <div>
                <b>Giá tour bao gồm</b>
                <MdEditor
                  style={{ minHeight: "200px", maxHeight: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange_price_Include_Text}
                />
              </div>

              {/* Tour không bao gồm */}
              <div className={cx("my-2")}>
                <b>Giá tour không bao gồm</b>
                <MdEditor
                  style={{ minHeight: "200px", maxHeight: "500px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={handleEditorChange_price_NotInclude_Text}
                />
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

        <div className={cx("row  my-5")}>
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
      </div>

      {/* PROCESS */}
      <div className={cx("createProcess my-5  ")}>
        {NAME_TOUR ? (
          <div>Tạo chương trình {NAME_TOUR}</div>
        ) : (
          <div>Tạo chương trình TOUR </div>
        )}

        <div className={cx("row border")}>
          <div className={cx("p-0")}>
            <MdEditor
              style={{ minHeight: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange_ProcessTour}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </div>

        <div className={cx("row border")}>
          <div className={cx("col-lg-5")}></div>
          <div className={cx("col-lg-7")}>
            <Table
              dataSource={dataSourceTable}
              bordered
              columns={columnsTable}
            />
          </div>
        </div>
      </div>

      {/* CALENDAR */}
      <div className={cx("createCalendar  ")}>
        <div>Tạo lịch</div>
        <div className={cx("row border")}>
          <div className={cx("col-lg-5 border p-0 vh-50")}>
            <div className={cx("p-2")}>
              <Form
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
                <Form.Item label="Số chỗ ngồi" name="numberSeat">
                  <InputNumber defaultValue={0} className={cx("w-100")} />
                </Form.Item>

                <Form.Item label="Chọn lịch" name="calendar">
                  <RangePicker className={cx("w-100")} />
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
                dataSource={dataSourceTable}
                bordered
                columns={columnsTable}
              />
              ;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTour;
