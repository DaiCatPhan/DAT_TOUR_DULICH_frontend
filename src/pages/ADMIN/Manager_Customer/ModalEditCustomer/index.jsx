import className from "classnames/bind";
import styles from "./ModalEditCustomer.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";

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

function ModalEditCustomer(props) {
  const {
    isShowModalUpdateCustomer,
    setIsShowModalUpdateCustomer,
    dataModalUpdateCustomer,
    setDataModalUpdateCustomer,
    getListCustomers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [formUpdate] = Form.useForm();
  const { Option } = Select;

  const typeTour = data?.typeTour;
  const statusActivity = data?.statusActivity;
  const role = data?.role;

  useEffect(() => {
    formUpdate.setFieldsValue(dataModalUpdateCustomer);
  }, [dataModalUpdateCustomer]);

  const handleOk = async () => {
    alert("ok");
    return;
    setConfirmLoading(true);
    // Gọi API cập nhật chương trình Tour
    const data = {
      ID_Tour: ID_Tour,
      idProcessTour: ID_ProcessTour,
      descriptionHTML: processTour_HTML,
      descriptionTEXT: processTour_TEXT,
    };

    const res = await ProcessService.updateProcessTour(data);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListTours();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setIsShowModalUpdateCustomer(false);
    formUpdate.resetFields();
    setDataModalUpdateCustomer({});
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Cập nhật thông tin khách hàng "
        open={isShowModalUpdateCustomer}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        className={cx("modalUpdateTour")}
        width={1000}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={cx("wrapper", "border")}>
          <div className={cx("title")}>
            <div className={cx("d-flex align-items-center")}>
              <div>
                <IconList />
              </div>
              <div className={cx("mx-2")}>Danh sách người dùng</div>
            </div>
          </div>
          <div className={cx("p-2")}>
            <Form
              form={formUpdate}
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
                        message: "Vui lòng nhập họ và tên !!!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("mx-2")}></div>
                <div className={cx("w-50")}>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
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
                    {statusActivity?.map((item) => {
                      return (
                        <Select.Option value={item?.value} key={item?.id}>
                          {item?.label}
                        </Select.Option>
                      );
                    })}
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
                        <Select.Option value={item?.value} key={item?.id}>
                          {item?.label}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" className={cx("  ")}>
                  Lưu thông tin
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEditCustomer;
