import className from "classnames/bind";
import styles from "./ModalUpdateCalendar.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";

import { useEffect, useState } from "react";
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
  Modal,
  InputNumber,
} from "antd";
import CalendarService from "../../../../../services/CalendarService";
const { RangePicker } = DatePicker;

function ModalUpdateCalendar(props) {
  const {
    isShowModalUpdateCalendar,
    setIsShowModalUpdateCalendar,
    dataModalUpdateCalendar,
    setDataModalUpdateCalendar,
    getTourInformation,
  } = props;
  const [formCalendarUpdate] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    formCalendarUpdate.setFieldsValue(dataModalUpdateCalendar);
  }, [dataModalUpdateCalendar]);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalUpdateCalendar(false);
    setDataModalUpdateCalendar({});
  };

  const onFinishCalendar = async (values) => {
    const dataSend = {
      ID_Calendar: dataModalUpdateCalendar.id,
      numberSeat: values?.numberSeat,
      priceAdult: values?.priceAdult,
      priceChild: values?.priceChild,
      status: values?.status,
    };

    const res = await CalendarService.update(dataSend);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      formCalendarUpdate.resetFields();
      getTourInformation(); 
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        open={isShowModalUpdateCalendar}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1300}
        footer={null}
      >
        <div>
          <h5>Cập nhật thông tin mã lịch : {dataModalUpdateCalendar?.id}</h5>
          <Form
            form={formCalendarUpdate}
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
                <Form.Item label="Trạng thái hoạt động" name={"status"}>
                  <Radio.Group className={cx("d-flex")}>
                    <Radio value="1"> Hoạt động </Radio>
                    <Radio value="0"> Không hoạt động </Radio>
                  </Radio.Group>
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
      </Modal>
    </div>
  );
}

export default ModalUpdateCalendar;
