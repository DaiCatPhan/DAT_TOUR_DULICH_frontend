import className from "classnames/bind";
import styles from "./Register.module.scss";
const cx = className.bind(styles);

import { Button, Checkbox, Divider, Form, Input } from "antd";
import { GoogleLogin } from "@react-oauth/google";

function RegisterPage() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className={cx("wrapper pt-4")}>
      <div
        className={cx("rounded p-5")}
        style={{ border: "1px solid ", maxWidth: 600, margin: "0 auto" }}
      >
        <h2 className={cx("text-center ")}>Đăng Ký Tài Khoản</h2>
        <div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <Form onFinish={onFinish} autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }}
            label="Họ tên"
            name="username"
            rules={[
              {
                required: true,
                message: "Họ và tên không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Số điện thoại không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Mật khẩu không được để trống",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
          // wrapperCol={{
          //   offset: 0,
          //   span: 16,
          // }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Divider>Or</Divider>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default RegisterPage;
