import className from "classnames/bind";
import styles from "./Register.module.scss";
const cx = className.bind(styles);

import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Divider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import AuthService from "../../services/AuthService";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  IconChevronsLeft,
  IconMail,
  IconPhone,
  IconUserCircle,
  IconLock,
} from "@tabler/icons-react";

function RegisterPage() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await AuthService.registerApi(values);
    if (res && res.data.EC === 0) {
      toast.success("Đăng ký tài khoản thành công ");
      navigate("/login");
    }
  };

  return (
    <div className={cx("wrapper  ", "bg-light ")}>
      <div
        className={cx(
          "d-flex justify-content-center align-items-center vh-100  "
        )}
      >
        <div className={cx("row border bg-white", "frameLogin")}>
          <div className={cx("col-lg-4   p-0 ")}>
            <div className={cx("bgLogin")}></div>
          </div>

          <div className={cx("col-lg-8 position-relative  p-0")}>
            <div className={cx("position-absolute", "iconBack")}>
              <Link to={"/"}>
                <IconChevronsLeft />
              </Link>
            </div>
            <div
              className={cx(
                "d-flex justify-content-center align-items-center h-100  "
              )}
            >
              <div className={cx(" ")}>
                {/* <div>
                <h4>Đăng nhập</h4>
                <div>
                  <button>Sing in with google</button>
                </div>
              </div> */}

                <Form
                  name="normal_login"
                  className={cx("login-form")}
                  onFinish={onFinish}
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  style={{
                    maxWidth: 1000,
                  }}
                >
                  <Divider>
                    <p>Đăng ký tài khoản</p>
                  </Divider>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Email!",
                      },
                      {
                        type: "email",
                        message: "Vui lòng nhập một địa chỉ Email hợp lệ!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<IconMail color="grey" />}
                      placeholder="Email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Họ và tên!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<IconUserCircle color="grey" />}
                      placeholder="Họ và tên"
                    />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại !",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Vui lòng nhập một số điện thoại hợp lệ!",
                      },
                      {
                        len: 10,
                        message: "Vui lòng nhập số điện thoại đúng chữ số!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<IconPhone color="grey" />} 
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu !",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<IconLock color="grey" />}
                      type="password"
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={cx("login-form-button")}
                    >
                      Đăng ký
                    </Button>
                    <div className={cx("text-center mt-3")}>
                      Bạn đã có tài khoản ? <Link to={"/login"}>Đăng nhập</Link>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
