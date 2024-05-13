import className from "classnames/bind";
import styles from "./PaymentResult.module.scss";
const cx = className.bind(styles);
import { Button, Modal, Result } from "antd";

import qs from "qs";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import BookingService from "../../../../services/BookingService";

function PaymentResult() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const [showModalSucces, setShowModalSucces] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  // Lấy các biến từ URL sử dụng queryParams
  const vnp_Amount = searchParams.get("vnp_Amount");
  const vnp_BankCode = searchParams.get("vnp_BankCode");
  const vnp_BankTranNo = searchParams.get("vnp_BankTranNo");
  const vnp_CardType = searchParams.get("vnp_CardType");
  const vnp_OrderInfo = searchParams.get("vnp_OrderInfo");
  const vnp_PayDate = searchParams.get("vnp_PayDate");
  const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
  const vnp_TmnCode = searchParams.get("vnp_TmnCode");
  const vnp_TransactionNo = searchParams.get("vnp_TransactionNo");
  const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = searchParams.get("vnp_TxnRef");
  const vnp_SecureHash = searchParams.get("vnp_SecureHash");

  console.log(vnp_TxnRef);

  var signData = qs.stringify(
    {
      vnp_TmnCode,
      vnp_Amount,
      vnp_BankCode,
      vnp_BankTranNo,
      vnp_CardType,
      vnp_OrderInfo,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TransactionNo,
      vnp_TransactionStatus,
      vnp_TxnRef,
      vnp_SecureHash,
    },
    { encode: false }
  );

  const vnpay_return = async () => {
    const res = await BookingService.vnpay_return(signData);
    if (res && res.data.EC == 0) {
      setShowModalSucces(true);
    } else {
      setShowModalError(true);
    }
  };

  useEffect(() => {
    vnpay_return();
  }, []);

  const ResultComponentSuscess = () => {
    const handleBill = () => {
      navigate("/user/order-buy");
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
              <Button key="buy">Trở về</Button>,
            ]}
          />
        </div>
      </Modal>
    );
  };

  const ResultComponentError = () => {
    const handleCancel = () => {
      navigate(`/tours`);
    };
    return (
      <Modal
        open={showModalError}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div>
          <Result
            status="error"
            title="Thanh toán thất bại"
            subTitle="Chúng tôi rất tiếc khi quá trình thanh toán đơn hàng thất bại !!!"
            extra={[
              <Button onClick={handleCancel} key="buy">
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
      <ResultComponentSuscess />
      <ResultComponentError />
    </div>
  );
}

export default PaymentResult;
