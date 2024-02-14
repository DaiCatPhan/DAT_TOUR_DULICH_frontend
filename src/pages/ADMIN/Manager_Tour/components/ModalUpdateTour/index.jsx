import className from "classnames/bind";
import styles from "./ModalUpdateTour.module.scss";
const cx = className.bind(styles);

import { useEffect, useState } from "react";

const mdParser = new MarkdownIt(/* Markdown-it options */);

import { toast } from "react-toastify";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { IconTrashX, IconBackspace } from "@tabler/icons-react";
const { RangePicker } = DatePicker;
import moment from "moment";
import Spin from "../../../../../components/Spin";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import TourService from "../../../../../services/TourService";

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
  Modal,
  InputNumber,
  message,
} from "antd";

function ModalUpdateTour(props) {
  const [loading, setLoading] = useState(false);
  const [imageTour, setImageTour] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [imageCurrent, setImageCurrent] = useState(null);

  const [price_Include_TEXT, setPrice_Include_TEXT] = useState("");
  const [price_Include_HTML, setPrice_Include_HTML] = useState("");
  const [price_NotInclude_TEXT, setPrice_NotInclude_TEXT] = useState("");
  const [price_NotInclude_HTML, setPrice_NotInclude_HTML] = useState("");

  const [formUpdate] = Form.useForm();
  const [spin, setSpin] = useState(false);

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
    setImageCurrent(URL.createObjectURL(info.file?.originFileObj));
  };

  function handleEditorChange_price_Include_Text({ html, text }) {
    setPrice_Include_HTML(html);
    setPrice_Include_TEXT(text);
  }
  function handleEditorChange_price_NotInclude_Text({ html, text }) {
    setPrice_NotInclude_HTML(html);
    setPrice_NotInclude_TEXT(text);
  }

  // MODAL

  const {
    isShowModalUpdateTour,
    setIsShowModalUpdateTour,
    dataModalUpdateTour,
    getListTours,
  } = props;

  const inputString = dataModalUpdateTour?.duration;
  const numbers = inputString?.match(/\d+/g);

  if (numbers && numbers.length >= 2) {
    const firstNumber = parseInt(numbers[0], 10);
    const secondNumber = parseInt(numbers[1], 10);
    dataModalUpdateTour.duration_am = firstNumber;
    dataModalUpdateTour.duration_pm = secondNumber;
  }

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setIsShowModalUpdateTour(false);
    formUpdate.resetFields();
  };

  useEffect(() => {
    setPrice_Include_TEXT(dataModalUpdateTour?.price_Include_TEXT);
    setPrice_Include_HTML(dataModalUpdateTour?.price_Include_HTML);
    setPrice_NotInclude_TEXT(dataModalUpdateTour?.price_NotInclude_TEXT);
    setPrice_NotInclude_HTML(dataModalUpdateTour?.price_NotInclude_HTML);
    formUpdate.setFieldsValue(dataModalUpdateTour);
  }, [dataModalUpdateTour]);

  // handle update Tour
  const onFinish = async (values) => {
    const data = values;
    data.id = dataModalUpdateTour?.id;
    data.price_Include_TEXT = price_Include_TEXT;
    data.price_Include_HTML = price_Include_HTML;
    data.price_NotInclude_TEXT = price_NotInclude_TEXT;
    data.price_NotInclude_HTML = price_NotInclude_HTML;
    data.duration = `${values.duration_am} ngày ${values.duration_pm} đêm`;

    const res = await TourService.updateTour(data);

    if (res && res.data.EC === 0) {
      toast.success("Tạo tour thành công ");
      getListTours();
    } else {
      toast.error(res.data.EM);
    }
  };

  // handle update Image Tour

  const upLoadImageTour = async () => {
    const id_tour = dataModalUpdateTour?.id;

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
      getListTours();
    } else {
      toast.error(res.data.EM);
    }
    setSpin(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Cập nhật thông tin tour "
        open={isShowModalUpdateTour}
        // onOk={() => {
        //   formUpdate.submit();
        // }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={cx("modalUpdateTour")}
        width={1300}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>
          {/* TOUR */}
          <div className={cx("row border")}>
            <h5>1. Cập nhật Tour</h5>
            <div className={cx("col-lg    ")}>
              <Form
                form={formUpdate}
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
                      <Select.Option value="Sapa">Sapa</Select.Option>
                      <Select.Option value="Đà Nẵng">Đà Nẵng</Select.Option>
                      <Select.Option value="Hạ Long">Hạ Long</Select.Option>
                      <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                      <Select.Option value="Phú Yên">Phú Yên</Select.Option>
                      <Select.Option value="Nha Trang">Nha Trang</Select.Option>
                      <Select.Option value="Quy Nhơn">Quy Nhơn</Select.Option>
                      <Select.Option value="Buôn Ma Thuột">
                        Buôn Ma Thuột
                      </Select.Option>
                      <Select.Option value="Phú Quốc">Phú Quốc</Select.Option>
                      <Select.Option value="Miền Tây">Miền Tây</Select.Option>
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
                      <Select.Option value="Miền Bắc">Miền Bắc</Select.Option>
                      <Select.Option value="Miền Trung">
                        Miền Trung
                      </Select.Option>
                      <Select.Option value="Miền Nam">Miền Nam</Select.Option>
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

                {/* Tour bao gồm */}
                <div>
                  <b>Giá tour bao gồm</b>
                  <MdEditor
                    style={{ minHeight: "200px", maxHeight: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange_price_Include_Text}
                    value={price_Include_TEXT}
                  />
                </div>

                {/* Tour không bao gồm */}
                <div className={cx("my-2")}>
                  <b>Giá tour không bao gồm</b>
                  <MdEditor
                    style={{ minHeight: "200px", maxHeight: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange_price_NotInclude_Text}
                    value={price_NotInclude_TEXT}
                  />
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("w-100 my-2")}
                  >
                    CẬP NHẬT TOUR
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

          {/* UpLoad Image */}
          <div className={cx("row  my-5 border p-3 rounded border")}>
            <h5>2. Upload Hình Ảnh</h5>
            <div
              className={cx("col-lg-5  mx-2 border border-primary rounded p-0")}
            >
              <div className={cx(" p-2")}>
                <div className={cx("text-center")}>
                  {imageCurrent ? (
                    <img
                      src={imageCurrent}
                      alt="notFound"
                      style={{
                        width: "480px",
                        height: "250px",
                      }}
                    />
                  ) : (
                    <img
                      src={dataModalUpdateTour?.image}
                      alt="avatar"
                      style={{
                        width: "480px",
                        height: "250px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              className={cx(
                "col-lg-6 m-auto border border-primary rounded p-0"
              )}
            >
              <div className={cx("  p-3")}>
                <p>Cập nhật ảnh tour</p>
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
      </Modal>
    </div>
  );
}

export default ModalUpdateTour;
