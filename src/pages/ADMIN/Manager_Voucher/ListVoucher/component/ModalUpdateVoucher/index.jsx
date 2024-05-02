import className from "classnames/bind";
import styles from "./ModalUpdateVoucher.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select, DatePicker } from "antd";
const { RangePicker } = DatePicker;
import moment from "moment";

const mdParser = new MarkdownIt(/* Markdown-it options */);

import VoucherService from "../../../../../../services/VoucherService";

function ModalUpdateVoucher(props) {
  const [formUpdateVoucher] = Form.useForm();

  const {
    isShowModalUpdateVoucher,
    setIsShowModalUpdateVoucher,
    dataModalUpdateVoucher,
    setDataModalUpdateVoucher,
    getListVouchers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    formUpdateVoucher.setFieldsValue(dataModalUpdateVoucher);
  }, [dataModalUpdateVoucher]);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalUpdateVoucher(false);
    setDataModalUpdateVoucher({});
  };
  // FORM
  const onFinish = async (values) => {
    const { typeVoucher, nameVoucher, value, amount, date } = values;
    const data = {
      id: dataModalUpdateVoucher?.id,
      typeVoucher: typeVoucher,
      nameVoucher: nameVoucher,
      value: value,
      amount: amount,
      // fromDate: date[0].$d,
      // toDate: date[1].$d,
    };

    console.log(data);

    const res = await VoucherService.updateVoucher(data);
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
        title="Cập nhật voucher "
        open={isShowModalUpdateVoucher}
        onOk={() => {
          formUpdateVoucher.submit();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={900}
      >
        <div>
          <Form name="basic" onFinish={onFinish} form={formUpdateVoucher}>
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
                      <Option value="percent">%</Option>
                      <Option value="money">VND</Option>
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
                  {/* <Form.Item
                    label="Thời gian"
                    name="fromDate"
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
                    <DatePicker
                      className={cx("w-100")}
                      format="DD-MM-YYYY HH:mm:ss"
                      
                    />
                  </Form.Item> */}
                </div>
              </div>
              {/* <div className={cx("col-lg-6")}>
                <div>
                  <Form.Item
                    label="Ngày hết hạn"
                    name="fromDate"
                    labelCol={{
                      span: 24,
                    }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập ngày hết hạn !",
                      },
                    ]}
                  >
                    <DatePicker className={cx("w-100")} format={"DD-MM-YYYY"} />
                  </Form.Item>
                </div>
              </div> */}
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateVoucher;
