import className from "classnames/bind";
import styles from "./ModalBookingTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Space, Table, Tag, Form, Input, Result } from "antd";
import { useNavigate } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";

import ModalVoucherUser from "../ModalVoucherUser";
import { useSelector } from "react-redux";

import BookingTourService from "../../../../services/BookingService";

import PayPalButton from "../PayPalButton";

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

  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isShowSession2, setIsShowSession2] = useState(false);
  const [isShowBTNPay, setIsShowBTNPay] = useState(true);

  const [isShowModalVoucherUser, setIsShowModalVoucherUser] = useState(false);
  const [dataModalVoucherUser, setDataModalVoucherUser] = useState({});
  const [voucherSelected, setVoucherSelected] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showBtnPayHome, setShowBtnPayHome] = useState(false);
  const [showModalResult, setShowModalResult] = useState(false);

  const handleClickPaymentMethodHome = () => {
    setShowBtnPayHome(true);
    setPaymentMethod("TẠI QUẦY");
  };

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
  }, [user]);

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

    setConfirmLoading(true);
    setTimeout(async () => {
      const res = await BookingTourService.create(dataSend);
      console.log("res >>>>>>>>>", res);
      setConfirmLoading(false);
      if (res && res.data.EC == 0) {
        setShowModalResult(true);
        setIsShowModalBookingTour(false);
      } else {
        toast.error(res.data.EM);
      }
    }, 1000);
  };

  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  function createOrder() {
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  }

  function onApprove(data) {
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        const name = orderData.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
      });
  }

  const ResultComponent = () => {
    const handleBill = () => {
      navigate("/user/order-buy");
    };
    return (
      <Modal
        open={showModalResult}
        onCancel={() => setShowModalResult(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <Result
            status="success"
            title="Chúc mừng bạn đã đặc tour thành công"
            subTitle="Mã tour : 2017182818828182881 . Chúng tôi đã gửi mail đến bạn vui lòng xác nhận "
            extra={[
              <Button type="primary" key="console" onClick={handleBill}>
                Hóa đơn
              </Button>,
              <Button key="buy">Trở về</Button>,
            ]}
          />
        </div>
      </Modal>
    );
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
            <div className={cx("d-flex justify-content-between ")}>
              <div>
                <img
                  src={tourDetail?.image}
                  alt="notFound"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div>{tourDetail?.name}</div>

              <div>
                <div className={cx("row")}>
                  <div className={cx("col-lg-8")}>Người lớn</div>
                  <div className={cx("col-lg-2")}>
                    <div className={cx("mx-2 d-flex")}>
                      <span>x</span>
                      <span>{numberTicketChild}</span>
                    </div>
                  </div>
                </div>

                <div className={cx("row")}>
                  <div className={cx("col-lg-8")}>Trẻ em</div>
                  <div className={cx("col-lg-2")}>
                    <div className={cx("mx-2 d-flex text-bold")}>
                      <span>x</span>
                      <span>{numberTicketAdult}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div>{activeCalendar?.priceAdult} VND</div>
                <div>{activeCalendar?.priceChild} VND</div>
              </div>

              <div>
                <div className={cx("titleCount")}>Tổng cộng</div>
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
            <div className={cx("border   my-2 px-3", "sesion2")}>
              <div className={cx("row")}>
                <div className={cx("col-lg-6")}>
                  <div className={cx("my-2")}>
                    <b>Quí khách vui lòng nhập thông tin liên hệ bên dưới</b>
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
                        <Input className={cx("disabled")} />
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className={cx("col-lg-6")}>
                  <div>
                    <div>Phương thức thanh toán</div>
                    <div>
                      <div className={cx("d-flex border")}>
                        <div>
                          <PayPalButton amount={resultAmount} />
                        </div>
                        <div>
                          <button
                            onClick={handleClickPaymentMethodHome}
                            className={
                              showBtnPayHome
                                ? cx("btnPayHome", "active")
                                : cx("btnPayHome")
                            }
                          >
                            Thanh toán khi nhận hàng
                          </button>
                        </div>
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
      <ResultComponent />
    </div>
  );
}

export default ModalBookingTour;
