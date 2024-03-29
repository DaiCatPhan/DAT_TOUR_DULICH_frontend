import className from "classnames/bind";
import styles from "./ModalCreateVoucher.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Checkbox, Form, Input, Modal, Select, DatePicker } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import VoucherService from "../../../../../../services/VoucherService";

function ModalCreateVoucher(props) {
  const [formCreateVoucher] = Form.useForm();
  const {
    isShowModalCreateVoucher,
    setIsShowModalCreateVoucher,
    dataModalCreateVoucher,
    setDataModalCreateVoucher,
    getListVouchers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalCreateVoucher(false);
  };

  // FORM
  const onFinish = async (values) => {
    const { typeVoucher, nameVoucher, value, amount, date } = values;
    const data = {
      typeVoucher: typeVoucher,
      nameVoucher: nameVoucher,
      value: value,
      amount: amount,
      fromDate: date[0].$d,
      toDate: date[1].$d,
    };

    const res = await VoucherService.createVoucher(data);
    setConfirmLoading(true);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListVouchers();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thêm kiểu voucher"
        open={isShowModalCreateVoucher}
        onOk={() => {
          formCreateVoucher.submit();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={900}
      >
        <div>
          <Form name="basic" onFinish={onFinish} form={formCreateVoucher}>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    label="Kiểu voucher"
                    name="typeVoucher"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập kiểu voucher!",
                      },
                    ]}
                  >
                    <Select placeholder="Kiểu voucher">
                      <Option value="percent">percent</Option>
                      <Option value="money">money</Option>
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    labelCol={{
                      span: 24,
                    }}
                    label="Tên voucher"
                    name="nameVoucher"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên voucher !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    label="Giá trị voucher"
                    name="value"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị voucher !",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
              <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    label="Số lượng"
                    name="amount"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số lượng!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    label="Thời gian"
                    name="date"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị max !",
                      },
                    ]}
                  >
                    <RangePicker className={cx("w-100")} />
                  </Form.Item>
                </div>
              </div>
            </div>

            {/* <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item> */}
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateVoucher;
