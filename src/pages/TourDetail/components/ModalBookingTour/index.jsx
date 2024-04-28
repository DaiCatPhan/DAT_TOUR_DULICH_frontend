import className from "classnames/bind";
import styles from "./ModalBookingTour.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Space, Table, Tag, Form, Input, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useEffect, useMemo, useState } from "react";
import { IconAsterisk } from "@tabler/icons-react";

import ModalVoucherUser from "../ModalVoucherUser";

import qs from "qs";
import { useSearchParams, useParams } from "react-router-dom";
import BookingService from "../../../../services/BookingService";
import Function from "../../../../components/Functions/function";

function ModalBookingTour(props) {
  const [searchParams] = useSearchParams();
  const [showModalSucces, setShowModalSucces] = useState(false);

  const {
    isShowModalBookingTour,
    setIsShowModalBookingTour,
    tourDetail,
    setTourDetail,
    activeCalendar,
    numberTicketAdult,
    numberTicketChild,
    totalAmount,
    getTourById,
  } = props;
  const [formInfo] = Form.useForm();
  tourDetail.key = tourDetail.id;

  const navigate = useNavigate();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const [isShowModalVoucherUser, setIsShowModalVoucherUser] = useState(false);
  const [dataModalVoucherUser, setDataModalVoucherUser] = useState({});
  const [voucherSelected, setVoucherSelected] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModalResult, setShowModalResult] = useState(false);

  const [dataCustomer, setDataCustomer] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const handleModalVoucherUser = (data) => {
    setIsShowModalVoucherUser(true);
    setDataModalVoucherUser(data);
  };

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalBookingTour(false);
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
    setDataCustomer({
      username: user?.username,
      phone: user?.phone,
      email: user?.email,
    });
  }, [user]);

  // THANH TOÁN VNPAY
  const handleBookingWithVNPAY = async () => {
    const data = {
      ID_Customer: user?.id,
      ID_Calendar: activeCalendar?.id,
      numberTicketChild: numberTicketChild,
      numberTicketAdult: numberTicketAdult,
    };
    if (voucherSelected) {
      data.ID_Voucher = voucherSelected?.Voucher?.id;
    }
    data.user = dataCustomer;

    const res = await BookingService.createVNP(data);
    console.log("res , ", res);
    if (res && res.data.EC == 0) {
      window.location.href = res.data.DT.url;
      getTourById();
    }
  };

  // THÁNH TOÁN TẠI QUẦY
  const handleBooking = async () => {
    const data = {
      ID_Customer: user?.id,
      ID_Calendar: activeCalendar?.id,
      numberTicketChild: numberTicketChild,
      numberTicketAdult: numberTicketAdult,
    };
    if (voucherSelected) {
      data.ID_Voucher = voucherSelected?.Voucher?.id;
    }

    const res = await BookingService.create(data);
    if (res && res.data.EC == 0) {
      setShowModalSucces(true);
      getTourById();
    } else {
      toast.error(res.data.EM);
    }
  };

  // MODAL sucess
  const ResultComponentSuscess = () => {
    const handleBill = () => {
      setIsShowModalBookingTour(false);
      navigate("/user/order-buy");
    };
    const handleBack = () => {
      setShowModalSucces(false);
      setIsShowModalBookingTour(false);
      navigate(`/tours/${tourDetail.id}`);
    };
    return (
      <Modal
        open={showModalSucces}
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
              <Button key="buy" onClick={handleBack}>
                Trở về
              </Button>,
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 15 }}
        footer={null}
      >
        <div className={cx("color_003c71")}>
          <div className={cx("border p-3", "session1")}>
            <div className={cx("row")}>
              <div className={cx("col-lg-2  ")}>
                <img
                  src={tourDetail?.image}
                  alt="notFound"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>

              <div className={cx("col-lg-4")}>
                <div className={cx("name")} x>
                  {tourDetail?.name}
                </div>
                <div>ngày khởi hành </div>
              </div>

              <div className={cx("col-lg-2")}>
                <div className={cx("row")}>
                  <div className={cx("col-lg-8")}>Người lớn</div>
                  <div className={cx("col-lg-2")}>
                    <div className={cx("mx-2 d-flex")}>
                      <span>x</span>
                      <span className={cx("mx-1")}>{numberTicketAdult}</span>
                    </div>
                  </div>
                </div>

                <div className={cx("row")}>
                  <div className={cx("col-lg-8")}>Trẻ em</div>
                  <div className={cx("col-lg-2")}>
                    <div className={cx("mx-2 d-flex text-bold")}>
                      <span>x</span>
                      <span className={cx("mx-1")}>{numberTicketChild}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={cx("col-lg-2")}>
                <div>
                  {Function.formatNumberWithCommas(activeCalendar?.priceAdult)}
                  <span className={cx("mx-2")}> VND</span>
                </div>
                <div>
                  {Function.formatNumberWithCommas(activeCalendar?.priceChild)}
                  <span className={cx("mx-2")}> VND</span>
                </div>
              </div>

              <div className={cx("col-lg-2", "contentCount")}>
                <div className={cx("item")}>Tổng cộng</div>
                <div className={cx("item")}>
                  {Function.formatNumberWithCommas(totalAmount)}
                  <span className={cx("mx-2")}> VND</span>
                </div>
              </div>
            </div>

            <div className={cx("d-flex justify-content-between mt-3")}>
              <div className={cx("d-flex ")}>
                <div>Voucher</div>

                <div
                  onClick={handleModalVoucherUser}
                  className={cx("poiter text-primary mx-5")}
                >
                  Chọn mã voucher
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
                <div className={cx("mx-5", "totalMoney")}>
                  <div className={cx("item")}> Tổng thanh toán :</div>
                  <div className={cx("item")}>
                    {Function.formatNumberWithCommas(resultAmount)}
                  </div>
                  <div className={cx("item")}>VND</div>
                </div>
              </div>
            </div>
          </div>

          <div className={cx("border   my-2 px-3", "sesion2")}>
            <div className={cx("my-2")}>
              <b>Quí khách vui lòng nhập thông tin liên hệ bên dưới</b>
            </div>
            <div className={cx("row")}>
              <div className={cx("col-lg-6")}>
                <div>
                  Email{" "}
                  <IconAsterisk width={10} className={cx("text-danger")} />
                </div>
                <Input
                  disabled
                  className={cx("disabled")}
                  value={dataCustomer?.email}
                />
              </div>
              <div className={cx("col-lg-6")}>
                <div>
                  Họ và tên{" "}
                  <IconAsterisk width={10} className={cx("text-danger")} />
                </div>

                <Input
                  placeholder="Basic usage"
                  value={dataCustomer?.username}
                  onChange={(e) =>
                    setDataCustomer({
                      ...dataCustomer,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className={cx("row my-3")}>
              <div className={cx("col-lg-6")}>
                <div>
                  Số điện thoại{" "}
                  <IconAsterisk width={10} className={cx("text-danger")} />
                </div>

                <Input
                  placeholder="Basic usage"
                  value={dataCustomer?.phone}
                  onChange={(e) =>
                    setDataCustomer({
                      ...dataCustomer,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className={cx("col-lg-6")}>
                <div>
                  Thanh toán{" "}
                  <IconAsterisk width={10} className={cx("text-danger")} />
                </div>

                <div>
                  <Button
                    className={cx(
                      "d-flex align-items-center justify-content-center w-100"
                    )}
                    style={{
                      borderColor: "#005baa",
                      color: "#005baa",
                    }}
                    onClick={handleBookingWithVNPAY}
                  >
                    <div>
                      <img
                        src="/src/assets/Payment/img_VNPAY.jpg"
                        alt="notFound"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div className={cx("mx-2")}>VN PAY</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ModalVoucherUser
        isShowModalVoucherUser={isShowModalVoucherUser}
        setIsShowModalVoucherUser={setIsShowModalVoucherUser}
        dataModalVoucherUser={dataModalVoucherUser}
        setDataModalVoucherUser={setDataModalVoucherUser}
        setVoucherSelected={setVoucherSelected}
      />
      <ResultComponentSuscess />
    </div>
  );
}

export default ModalBookingTour;
