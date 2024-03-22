import className from "classnames/bind";
import styles from "./ModalBookingTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Space, Table, Tag, Form, Input } from "antd";

import { useEffect, useMemo, useState } from "react";

import ModalVoucherUser from "../ModalVoucherUser";
import { useSelector } from "react-redux";

import BookingTourService from "../../../../services/BookingService";

import {
  PayPalScriptProvider,
  PayPalButtons,
  BraintreePayPalButtons,
} from "@paypal/react-paypal-js";
const initialOptions = {
  clientId:
    "Aaz18FxPx37xq4EUhCYA_O-Ks_0EHgFEOFvdZCKdcvLeEJBgjgjGdoDTBIzhvFzlPbS7z9dJ7gLWDzWa",
  currency: "USD",
  intent: "capture",
};

function ModalBookingTour(props) {
  const {
    isShowModalBookingTour,
    setIsShowModalBookingTour,
    tourDetail,
    setTourDetail,
    activeCalendar,
    numberTicketAdult,
    numberTicketChild,
    totalAmount,
  } = props;
  const [formInfo] = Form.useForm();
  tourDetail.key = tourDetail.id;

  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isShowSession2, setIsShowSession2] = useState(false);
  const [isShowBTNPay, setIsShowBTNPay] = useState(true);

  const [isShowModalVoucherUser, setIsShowModalVoucherUser] = useState(false);
  const [dataModalVoucherUser, setDataModalVoucherUser] = useState({});
  const [voucherSelected, setVoucherSelected] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("tại quầy");

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
    setIsShowSession2(false);
    setIsShowBTNPay(true);
  };

  // Hàm tính tiền theo Voucher
  const applyVoucher = (totalAmount, voucher) => {
    try {
      const currentDate = new Date();

      if (currentDate > new Date(voucher.toDate)) {
        return 0; // trường hợp hết hạn sử dụng
      }

      let discountAmount = 0;

      // Kiểm tra loại voucher
      if (voucher.typeVoucher === "money") {
        // Nếu loại voucher là giảm giá cố định theo số tiền
        if (totalAmount >= voucher.value) {
          // Kiểm tra nếu tổng số tiền cần thanh toán lớn hơn hoặc bằng giá trị voucher
          discountAmount = voucher.value;
        } else {
          // Nếu tổng số tiền cần thanh toán nhỏ hơn giá trị voucher, giảm giá bằng tổng số tiền cần thanh toán
          discountAmount = totalAmount;
        }
      } else if (voucher.typeVoucher === "percent") {
        // Nếu loại voucher là giảm giá theo phần trăm
        discountAmount = (voucher.value / 100) * totalAmount;
        // Giảm giá không vượt quá tổng số tiền cần thanh toán
        discountAmount = Math.min(discountAmount, totalAmount);
      }

      // Áp dụng giảm giá vào tổng số tiền và trả về số tiền phải thanh toán sau khi áp dụng voucher
      const amountAfterDiscount = totalAmount - discountAmount;

      return amountAfterDiscount;
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log(">>> Error applying voucher:", error);
      throw new Error("Lỗi khi áp dụng voucher");
    }
  };
  var resultAmount = totalAmount;
  if (voucherSelected) {
    resultAmount = applyVoucher(totalAmount, voucherSelected?.Voucher);
  }

  useEffect(() => {
    formInfo.setFieldsValue(user);
  }, []);

  const onFinishForm = async (values) => {
    const dataSend = values;
    dataSend.ID_Customer = user?.id;
    dataSend.ID_Calendar = activeCalendar?.id;
    if (voucherSelected) {
      dataSend.ID_Voucher = voucherSelected?.Voucher?.id;
    }
    dataSend.numberTicketAdult = numberTicketAdult;
    dataSend.numberTicketChild = numberTicketChild;
    dataSend.payment_method = paymentMethod;

    console.log("dataSend", dataSend);

    const res = await BookingTourService.create(dataSend);
    console.log("res >>>>>>>>>", res);
    if (res && res.data.EC == 0) {
      toast.success("Đặt tour thành công");
    } else {
      toast.error(res.data.EM);
    }
  };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = (data, acionts) => {
    return data.order.create({
      purchase_units: [{ amount: { currency_code: "USD", value: "0.01" } }],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert("TRansackalsfj");
    });
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Yêu cầu đặt tour"
        open={isShowModalBookingTour}
        onOk={() => {
          formInfo.submit();
        }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 15 }}
      >
        <div className={cx("p-4")}>
          <div className={cx("border p-3", "session1")}>
            <div className={cx("border row  ")}>
              <div className={cx("col-lg-2 ")}>
                <img
                  src={tourDetail?.image}
                  alt="notFound"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div className={cx("col-lg-3")}>{tourDetail?.name}</div>

              <div className={cx("col-lg-3")}>
                <div className={cx("row")}>
                  <div className={cx("col-lg-7")}>Người lớn</div>
                  <div className={cx("col-lg-4")}>
                    <span>X</span>
                    <span className={cx("mx-1")}></span>
                    <span>{numberTicketChild}</span>
                  </div>
                </div>
                <div className={cx("row")}>
                  <div className={cx("col-lg-7 ")}>Trẻ em</div>
                  <div className={cx("col-lg-4")}>
                    <span>X</span>
                    <span className={cx("mx-1")}></span>
                    <span>{numberTicketAdult}</span>
                  </div>
                </div>
              </div>

              <div className={cx("col-lg-2")}>
                <div>{activeCalendar?.priceAdult} VND</div>
                <div>{activeCalendar?.priceChild} VND</div>
              </div>

              <div className={cx("col-lg-2")}>
                <div>Tổng cộng</div>
                <div>{totalAmount} VND</div>
              </div>
            </div>

            <div className={cx("d-flex justify-content-between mt-3")}>
              <div className={cx("d-flex ")}>
                <div>Easier</div>

                <div
                  onClick={handleModalVoucherUser}
                  className={cx("poiter text-primary mx-5")}
                >
                  Chọn hoặc nhập mã
                </div>
                <div>
                  Mã Voucher :{" "}
                  <b> {voucherSelected?.Voucher?.nameVoucher || ""}</b>
                </div>
              </div>
              <div
                className={cx(
                  "d-flex align-items-center   w-50 justify-content-end"
                )}
              >
                <div className={cx("mx-5")}>
                  Tổng thanh toán : {resultAmount} VND
                </div>
                {isShowBTNPay ? (
                  <div>
                    <Button onClick={handleShowSession2} type="primary">
                      Đi Đến Thanh Toán
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {isShowSession2 ? (
            <div className={cx("border   my-2 p-3", "sesion2")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-6")}>
                  <div>
                    <div>
                      Quí khách vui lòng nhập thông tin liên hệ bên dưới
                    </div>
                  </div>
                  <div>
                    <Form name="basic" form={formInfo} onFinish={onFinishForm}>
                      <Form.Item
                        label="Họ và tên"
                        name="username"
                        labelCol={{
                          span: 5,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập họ và tên",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        labelCol={{
                          span: 5,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        labelCol={{
                          span: 5,
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập email",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
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
                            <PayPalScriptProvider options={initialOptions}>
                              <PayPalButtons style={{ layout: "horizontal" }} />
                            </PayPalScriptProvider>
                          </div>
                          <div>
                            <button className={cx("btnPay")}>
                              thanh toan khi nhan hang
                            </button>
                          </div>
                        </div>

                        <div className={cx("d-flex")}>
                          <div>
                            <button className={cx("btnPay")}>
                              thanh toan paypal
                            </button>
                          </div>
                          <div>
                            <button className={cx("btnPay")}>
                              thanh toan VNPAY
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={cx("row")}>
                        <div className={cx("col-lg-4")}>Tổng thanh toán</div>
                        <div className={cx("col-lg")}>{resultAmount} VND</div>
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
        setVoucherSelected={setVoucherSelected}
      />
    </div>
  );
}

export default ModalBookingTour;
