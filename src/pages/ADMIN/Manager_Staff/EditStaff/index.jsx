import className from "classnames/bind";
import styles from "./EditCustomer.module.scss";
const cx = className.bind(styles);

import { Button, Checkbox, Form, Input, Select, Space, Radio } from "antd";
import { useEffect } from "react";

function EditCustomer() {
  const [form] = Form.useForm();
  const { Option } = Select;

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const formItemLayout = {
    labelCol: { span: 6 }, // Chiều rộng của label
    wrapperCol: { span: 14 }, // Chiều rộng của nội dung
    labelAlign: "left", // Căn chỉnh nhãn về bên trái
  };

  const dataUpdate = {
    username: "Phan Dai Cat",
    email: "catb2014730@student.ctu.edu.vn",
    phone: "0123456789",
    password: '12345',
    role: "lái xe",
    status: '1',
  };

  useEffect(() => {
    form.setFieldsValue(dataUpdate);
  }, [dataUpdate]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row g-4")}>
        <div className={cx("col-lg-4 border")}></div>
        <div className={cx("col-lg-8 border")}>
          <div>
            <Form
              form={form}
              name="basic"
              style={{
                maxWidth: 800,
              }}
              className={cx("border p-4")}
             
              onFinish={onFinish}
              autoComplete="off"
              {...formItemLayout}
            >
              {/* Họ và tên */}
              <Form.Item
                label="Họ tên"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Nhập họ và tên!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Nhập email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Nhập số điện thoại!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              {/* Password */}
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Nhập mật khẩu!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              {/* Chức vụ */}
              <Form.Item
                label="Chức vụ"
                name="role"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="Chọn chức vụ" allowClear>
                  <Option value="male">Hướng dẫn viên</Option>
                  <Option value="female">Lái xe</Option>
                </Select>
              </Form.Item>

              {/* Status */}
              <Form.Item name="status" label="Trạng thái">
                <Radio.Group>
                  <Radio value="1">Đang hoạt động</Radio>
                  <Radio value="0">Đã khóa</Radio>
                </Radio.Group>
              </Form.Item>

              {/* BUTTON */}
              <Form.Item
                wrapperCol={{
                  offset: 6,
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
      </div>
    </div>
  );
}

export default EditCustomer;
