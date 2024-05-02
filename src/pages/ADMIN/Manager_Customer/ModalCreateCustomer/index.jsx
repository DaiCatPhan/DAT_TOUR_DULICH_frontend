import className from "classnames/bind";
import styles from "./ModalCreateCustomer.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";
import CaterogyService from "../../../../services/CategoryService";
import AuthServiceService from "../../../../services/AuthService";

import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Radio,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import data from "../../../../components/Data/data";

function ModalCreateCustomer(props) {
  const {
    isShowModalCreateCustomer,
    setIsShowModalCreateCustomer,
    getListCustomers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [categoryRole, setCategoryRole] = useState([]);
  const [categoryActivity, setCategoryActivity] = useState([]);
  const [formCreate] = Form.useForm();
  const { Option } = Select;

  const statusActivity = categoryActivity;
  const role = categoryRole;

  const getCategory = async () => {
    const res = await CaterogyService.readAllCategory(`type=ROLE`);
    if (res && res.data.EC == 0) {
      setCategoryRole(res.data.DT.categories);
    }
    const res2 = await CaterogyService.readAllCategory(`type=STATUS_ACTIVITY`);
    if (res2 && res2.data.EC == 0) {
      setCategoryActivity(res2.data.DT.categories);
    }
  };

  useEffect(() => {
    getCategory();
    formCreate.setFieldsValue({
      status: "Hoạt động",
      role: "khách hàng",
    });
  }, []);

  const handleCancel = () => {
    setIsShowModalCreateCustomer(false);
  };

  const onFinishCreate = async (values) => {
    setConfirmLoading(true);
    const res = await AuthServiceService.registerApi(values);
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      formCreate.setFieldsValue({
        email: "",
        username: "",
        phone: "",
        password: "",
      });
      getListCustomers();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Tạo tài khoản mới "
        open={isShowModalCreateCustomer}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={cx("wrapper")}>
          <div className={cx("p-2")}>
            <Form
              form={formCreate}
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
              onFinish={onFinishCreate}
            >
              {/* 1 */}

              <div className={cx("d-flex justify-content-between")}>
                <div className={cx("w-50")}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email !!!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("mx-2")}></div>
                <div className={cx("w-50")}>
                  <Form.Item
                    label="Họ và tên"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ và tên !!!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </div>

              <div className={cx("d-flex justify-content-between")}>
                <div className={cx("w-50")}>
                  <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại !!!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("mx-2")}></div>
                <div className={cx("w-50")}>
                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu !!!",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </div>
              </div>

              {/* 2 */}
              <div className={cx("d-flex justify-content-between")}>
                <Form.Item
                  className={cx("w-50")}
                  label="Trạng thái"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn trạng thái !",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value={"1"}>Hoạt động</Select.Option>
                    <Select.Option value={"0"}>Không hoạt động</Select.Option>
                  </Select>
                </Form.Item>

                <div className={cx("mx-2")}></div>
                <Form.Item
                  className={cx("w-50")}
                  label="Quyền"
                  name="role"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn trạng thái !",
                    },
                  ]}
                >
                  <Select>
                    {role?.map((item) => {
                      return (
                        <Select.Option key={item?.id}>
                          {item?.value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo tài khoản
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateCustomer;
