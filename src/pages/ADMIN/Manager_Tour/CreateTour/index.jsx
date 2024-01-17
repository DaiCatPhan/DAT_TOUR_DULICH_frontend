import className from "classnames/bind";
import styles from "./CreateTour.module.scss";
const cx = className.bind(styles);
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

function CreateTour() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

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
      >
        Upload
      </div>
    </button>
  );

  const handleChangeUpload = (info) => {
    console.log("log", info);
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   setLoading(false);
    //   setImageUrl(url);
    // }
  };

  function handleEditorChange({ html, text }) {
    console.log("handleEditorChange", html, text);
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishCalendar = (values) => {
    console.log("Success onFinishCalendar:", values);
  };

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

  const beforeUploadImage = (file) => {
    console.log("file", file);
  };

  return (
    <div className={cx("wrapper  ")}>
      {/* TOUR */}
      <div className={cx("row border")}>
        <div className={cx("col-lg-9   vh-100")}>
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            {/* 2 */}
            <div className={cx("d-flex justify-content-between")}>
              <Form.Item
                className={cx("w-50")}
                label="  địa điểm nổi tiếng"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Select placeholder="Chọn địa điểm ">
                  <Option value="male">Sapa</Option>
                  <Option value="female">Đà nẵng</Option>
                  <Option value="other">Cà mau</Option>
                </Select>
              </Form.Item>

              <div className={cx("mx-2")}></div>

              <Form.Item
                className={cx("w-50")}
                label="Chọn miền"
                name="domain"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Select placeholder="Chọn địa điểm ">
                  <Option value="male">Miền Bắc</Option>
                  <Option value="female">Miền Trung</Option>
                  <Option value="other">Miền Nam</Option>
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
                    message: "Please input your password!",
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
                    message: "Please input your password!",
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
                  },
                ]}
              >
                <InputNumber
                  className={cx("w-100")}
                  min={1}
                  placeholder="Nhập ngày"
                />
              </Form.Item>

              <div className={cx("mx-2")}></div>

              <Form.Item
                className={cx("w-50")}
                label="Tổng thời gian đêm"
                name="duration_pm"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber
                  className={cx("w-100")}
                  min={1}
                  placeholder="Nhập ngày"
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

              <Form.Item name="status" label="Trạng thái tour">
                <Radio.Group>
                  <Radio value="1">Hoạt động</Radio>
                  <Radio value="0">Không hoạt động</Radio>
                </Radio.Group>
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={cx("col-lg-3 border  ")}>
          <div>
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
        </div>
      </div>

      {/* PROCESS */}
      <div className={cx("createProcess my-5  ")}>
        <div>Tạo chương trình TOUR</div>
        <div className={cx("row border")}>
          <div className={cx("p-0")}>
            <MdEditor
              style={{ minHeight: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange}
            />
          </div>
          <div>
            <button>Submit</button>
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
