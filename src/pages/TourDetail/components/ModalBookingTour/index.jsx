import className from "classnames/bind";
import styles from "./ModalBookingTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Space, Table, Tag, Form, Input } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import ModalVoucherUser from "../ModalVoucherUser";

function ModalBookingTour(props) {
  const {
    isShowModalBookingTour,
    setIsShowModalBookingTour,
    dataModalBookingTour,
    setDataModalBookingTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isShowSession2, setIsShowSession2] = useState(false);
  const [isShowBTNPay, setIsShowBTNPay] = useState(true);

  const [isShowModalVoucherUser, setIsShowModalVoucherUser] = useState(false);
  const [dataModalVoucherUser, setDataModalVoucherUser] = useState({});

  const handleModalVoucherUser = (data) => {
    setIsShowModalVoucherUser(true);
    setDataModalVoucherUser(data);
  };

  const handleShowSession2 = () => {
    setIsShowSession2(true);
    setIsShowBTNPay(false);
  };

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalBookingTour(false);
  };

  const dataSource = [
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

  const columns = [
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
    <div className={cx("wrapper")}>
      <Modal
        title="Yêu cầu đặt tour"
        open={isShowModalBookingTour}
        // open={true}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 15 }}
      >
        <div className={cx("p-4")}>
          <div className={cx("border ", "session1")}>
            <Table dataSource={dataSource} columns={columns} />

            <div className={cx("d-flex justify-content-between")}>
              <div className={cx("d-flex ")}>
                <div>Easier</div>

                <div
                  onClick={handleModalVoucherUser}
                  className={cx("poiter text-primary mx-5")}
                >
                  Chọn hoặc nhập mã
                </div>
                <div>Mã Voucher : MK-100k</div>
              </div>
              <div className={cx("d-flex")}>
                <div>Tổng thanh toán : 20.000.000 VND</div>
                {isShowBTNPay ? (
                  <div>
                    <button onClick={handleShowSession2}>
                      Đi Đến Thanh Toán
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {isShowSession2 ? (
            <div className={cx("border", "sesion2")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-6")}>
                  <div>
                    <div>
                      Quí khách vui lòng nhập thông tin liên hệ bên dưới
                    </div>
                  </div>
                  <div>
                    <Form
                      name="basic"
                      // onFinish={onFinish}
                    >
                      <Form.Item
                        label="Họ và tên"
                        name="username"
                        labelCol={{
                          span: 24,
                        }}
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
                        label="Số điện thoại"
                        name="password"
                        labelCol={{
                          span: 24,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{
                          span: 24,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      {/* <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item> */}
                    </Form>
                  </div>
                </div>
                <div className={cx("col-lg-6")}>
                  <div>
                    <div>
                      <div>Phuong thuc thanh toan</div>
                      <div>
                        <div className={cx("d-flex")}>
                          <div>
                            <button>thanh toan paypal</button>
                          </div>
                          <div>
                            <button>thanh toan khi nhan hang</button>
                          </div>
                        </div>

                        <div className={cx("d-flex")}>
                          <div>
                            <button>thanh toan paypal</button>
                          </div>
                          <div>
                            <button>thanh toan VNPAY</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={cx("d-flex")}>
                        <div>Tong tien tour</div>
                        <div>20.000.000</div>
                      </div>
                      <div className={cx("d-flex")}>
                        <div>Tong tien tour</div>
                        <div>20.000.000</div>
                      </div>
                      <div className={cx("d-flex")}>
                        <div>Tong tien tour</div>
                        <div>20.000.000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </Modal>
      <ModalVoucherUser
        isShowModalVoucherUser={isShowModalVoucherUser}
        setIsShowModalVoucherUser={setIsShowModalVoucherUser}
        dataModalVoucherUser={dataModalVoucherUser}
        setDataModalVoucherUser={setDataModalVoucherUser}
      />
    </div>
  );
}

export default ModalBookingTour;
