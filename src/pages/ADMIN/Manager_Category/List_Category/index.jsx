import className from "classnames/bind";
import styles from "./List_Category.module.scss";
const cx = className.bind(styles);
import { Space, Table, Tag } from "antd";
import { Button, Checkbox, Form, Input, Select, message } from "antd";
const { Option } = Select;
import { IconList, IconBackspace } from "@tabler/icons-react";
import { toast } from "react-toastify";
import CategoryService from "../../../../services/CategoryService";
import { useEffect, useState } from "react";

function List_Category() {
  const [messageApi, contextHolder] = message.useMessage();
  const [listCategory, setListCategory] = useState([]); 
  const [formCategory] = Form.useForm();

  const columns = [
    {
      title: "Tên doanh mục",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Nội dung doanh mục",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Action",
      key: "Action",
      render: (record) => {
        return (
          <div>
            <IconBackspace
              color="red"
              width={20}
              className={cx("poiter")}
              onClick={() => handleDeleteCategory(record)}
            />
          </div>
        );
      },
    },
  ];

  const onFinish = async (values) => {
    const { type, value } = values;

    const res = await CategoryService.createCategory(values);
    if (res && res.data.EC == 0) {
      messageApi.open({
        type: "success",
        content: "Thêm doanh mục thành công",
      });
      getListCaterogy();
      formCategory.setFieldsValue({ value: "" });
    } else {
      messageApi.open({
        type: "error",
        content: `${res.data.EM}`,
      });
    }
  };

  const getListCaterogy = async () => {
    const res = await CategoryService.readAllCategory();
    console.log("res", res);

    if (res && res.data.EC === 0) {
      const cusData = res.data.DT?.categories.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      });
      setListCategory(cusData);
    }
  };

  useEffect(() => {
    getListCaterogy();
  }, []);

  const handleDeleteCategory = async (data) => {
    const { id } = data;
    const res = await CategoryService.deleteCategory({
      id: id,
      table: "Category",
    });
    if (res && res.data.EC === 0) {
      messageApi.open({
        type: "success",
        content: "Xóa doanh mục thành công",
      });
      getListCaterogy();
    } else {
      messageApi.open({
        type: "success",
        content: "Xóa doanh mục thất bại",
      });
    }
  };

  const onFinishSearchCategory = async (values) => {
    const { type, value } = values;
    const res = await CategoryService.readAllCategory(
      `type=${type || ""}&value=${value || ""}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.categories.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListCategory(cus);
    }
  };

  return (
    <div className={cx("wrapper")}>
      {contextHolder}

      <div className={cx("row px-5")}>
        <div className={cx("col-lg-12")}>
          <div className={cx("border ")}>
            <div className={cx("title", "border d-flex align-items-center ")}>
              <div>
                <IconList />
              </div>
              <div className={cx("mx-2")}>Tạo doanh mục</div>
            </div>
            <div className={cx("p-3")}>
              <Form name="basic" onFinish={onFinish} form={formCategory}>
                <div className={cx("row")}>
                  <div className={cx("col-5")}>
                    <Form.Item
                      labelCol={{
                        span: 24,
                      }}
                      name="type"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên doanh mục",
                        },
                      ]}
                    >
                      <Select placeholder="Tạo doanh mục" allowClear>
                        <Option value="TYPE_TOUR">TYPE_TOUR</Option>
                        <Option value="ADDRESS_TOUR">ADDRESS_TOUR</Option>
                        <Option value="ROLE">ROLE</Option>
                        <Option value="STATUS_ACTIVITY">STATUS_ACTIVITY</Option>
                        <Option value="STATUS_BOOKING">STATUS_BOOKING</Option>
                        <Option value="STATUS_PAYMENT">STATUS_PAYMENT</Option>
                      </Select>
                    </Form.Item>
                  </div>
                  <div className={cx("col-lg-5")}>
                    <Form.Item
                      label="Nội dung"
                      name="value"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập nội dung doanh mục",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className={cx("col-lg-2 ")}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className={cx("w-100")}
                      >
                        Tạo doanh mục
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <div className={cx("my-5")}></div>

      <div className={cx("row px-5")}>
        <div className={cx("col-lg-12 ")}>
          <div className={cx("border")}>
            <div className={cx("title", "border d-flex align-items-center ")}>
              <div>
                <IconList />
              </div>
              <div className={cx("mx-2")}>Danh sách doanh mục</div>
            </div>
            <div className={cx("p-3")}>
              <div>
                <Form
                  name="basic"
                  onFinish={onFinishSearchCategory}
                  autoComplete="off"
                  className={cx("m-auto")}
                >
                  <div className={cx("row  ")}>
                    <div className={cx("col-lg-5 ")}>
                      <div>
                        <Form.Item name="type">
                          <Select placeholder="Chọn doanh mục" allowClear>
                            <Option value="TYPE_TOUR">TYPE_TOUR</Option>
                            <Option value="ADDRESS_TOUR">ADDRESS_TOUR</Option>
                            <Option value="ROLE">ROLE</Option>
                            <Option value="STATUS_ACTIVITY">
                              STATUS_ACTIVITY
                            </Option>
                            <Option value="STATUS_BOOKING">
                              STATUS_BOOKING
                            </Option>
                            <Option value="STATUS_PAYMENT">
                              STATUS_PAYMENT
                            </Option>
                          </Select>
                        </Form.Item>
                      </div>
                    </div>

                    <div className={cx("col-lg-5")}>
                      <Form.Item label="Nội dung" name="value">
                        <Input />
                      </Form.Item>
                    </div>

                    <div className={cx("col-lg-2 ")}>
                      <div className={cx("text-center")}>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            className={cx("w-100")}
                          >
                            Tìm
                          </Button>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
              <Table dataSource={listCategory} columns={columns} bordered />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List_Category;
