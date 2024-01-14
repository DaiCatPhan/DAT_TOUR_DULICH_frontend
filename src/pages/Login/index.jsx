import className from "classnames/bind";
import styles from "./Login.module.scss";
const cx = className.bind(styles);
import { useNavigate } from "react-router-dom";

import { Button, Checkbox, Divider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import AuthService from "../../services/AuthService";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlide";

import { IconChevronsLeft } from "@tabler/icons-react";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await AuthService.loginApi({ email, password });
    if (res && res.data.EC == 0) {
      localStorage.setItem("accessToken", res.data.DT.accessToken);
      dispatch(doLoginAction(res.data.DT.tokentData));
      toast.success("Đăng nhập thành công");

      console.log("resLogin >>", res);
      if (res.data.DT.tokentData.role === "khách hàng") {
        navigate("/");
      } else if (res.data.DT.tokentData.role === "admin") {
        navigate("/admin");
      }
    } else {
      toast.error(res.data.EM);
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
                    <p>Hoặc đăng nhập với email</p>
                  </Divider>

                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={
                        <UserOutlined className={cx("site-form-item-icon")} />
                      }
                      placeholder="Email"
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
                    <Input
                      prefix={
                        <LockOutlined className={cx("site-form-item-icon")} />
                      }
                      type="password"
                      placeholder="Mật khẩu"
                    />
                  </Form.Item>

                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Ghi nhớ tôi</Checkbox>
                    </Form.Item>

                    <a className={cx("login-form-forgot")} href="">
                      Quên mật khẩu
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={cx("login-form-button")}
                    >
                      Đăng nhập
                    </Button>
                    <div className={cx("text-center mt-3")}>
                      Bạn chưa có tài khoản ?{" "}
                      <Link to={"/register"}>Đăng ký!</Link>
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

export default LoginPage;

{
}
