import className from "classnames/bind";
import styles from "./Profile.module.scss";
const cx = className.bind(styles);

import { Button, Checkbox, Form, Input } from "antd";
import { IconUserSquare } from "@tabler/icons-react";

function Profile() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("border rounded  ", "frame")}>
        <div className={cx(" d-flex align-items-end ", "icon")}>
          <IconUserSquare className={cx("IconUserSquare")} />
          <div className={cx("mb-3")}>
            <b>Cập nhật thông tin tài khoản </b>
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Họ và tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Họ và tên không được để trống !",
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
                Cập nhật tài khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
