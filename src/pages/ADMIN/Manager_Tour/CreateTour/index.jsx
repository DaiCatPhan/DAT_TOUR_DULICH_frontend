import className from "classnames/bind";
import styles from "./CreateTour.module.scss";
const cx = className.bind(styles);
import { Button, Checkbox, Form, Input, Select , Table } from "antd";
import { InputNumber, Space } from "antd";

function CreateTour() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const dataSourceTable = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columnsTable = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <div className={cx("wrapper  ")}>
      {/* TOUR */}
      <div className={cx("row")}>
        <div className={cx("col-lg-9 border border-danger vh-100")}>
          <Form
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
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Tên tour"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className={cx("d-flex justify-content-between")}>
              <Form.Item
                className={cx("w-50")}
                label="Giá tour người lớn"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <InputNumber
                  className={cx("w-100 ")}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              <div className={cx("mx-2")}></div>

              <Form.Item
                className={cx("w-50")}
                label="Giá tour trẻ em"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <InputNumber
                  className={cx("w-100 ")}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  // onChange={onChange}
                />
              </Form.Item>
            </div>

            <div className={cx("d-flex justify-content-between")}>
              <Form.Item
                className={cx("w-50")}
                name="Chọn miền"
                label="domain"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>

              <div className={cx("mx-2")}></div>

              <Form.Item
                className={cx("w-50")}
                name="Chọn miền"
                label="domain"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                  <Option value="other">other</Option>
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              wrapperCol={{
                offset: 0,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={cx("col-lg-3 border border-primary")}>
          <div></div>
        </div>
      </div>

      {/* PROCESS */}
      <div className={cx("row ")}>
        <div className={cx("border border-black vh-100 my-5")}></div>
      </div>

      {/* CALENDAR */}
      <div className={cx("row border border-black vh-100 my-5")}>
        <div className={cx("col-lg-5 border vh-100")}></div>
        <div className={cx("col-lg-7")}>
          <Table dataSource={dataSourceTable} columns={columnsTable} />;
        </div>
      </div>
    </div>
  );
}

export default CreateTour;
