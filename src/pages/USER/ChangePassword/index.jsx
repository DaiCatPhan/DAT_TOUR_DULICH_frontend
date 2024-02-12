import className from "classnames/bind";
import styles from "./ChangePassword.module.scss";
const cx = className.bind(styles);
import { Button, Checkbox, Form, Input } from "antd";
import { IconUserSquare } from "@tabler/icons-react";

function ChangePassword() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <div className={cx("container")}>
      <div className={cx("border rounded  ", "frame")}>
        <div className={cx(" d-flex align-items-end ", "icon")}>
          <IconUserSquare className={cx("IconUserSquare")} />
          <div className={cx("mb-3")}>
            <b>Đổi mật khẩu </b>
          </div>
        </div>
        <div className={cx("magin-100")}></div>

        <div className={cx("m-5")}>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            labelCol={{
              span: 24,
            }}
            wrapperCol={{
              span: 24,
            }}
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu hiện tại không được để trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Điền mật khẩu mới "
              name="newpassword"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu mới không được để trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Điền lại mật khẩu mới "
              name="Confirmpassword"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu mới không được để trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item className={cx("text-center")}>
              <Button
                className={cx("w-25 mt-5")}
                type="primary"
                htmlType="submit"
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
