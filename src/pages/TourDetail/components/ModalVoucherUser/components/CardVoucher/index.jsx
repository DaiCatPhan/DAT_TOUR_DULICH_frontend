import className from "classnames/bind";
import styles from "./CardVoucher.module.scss";
const cx = className.bind(styles);
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, message, Space } from "antd";

import VoucherService from "../../../../../../services/VoucherService";

function CardVoucher(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const { item } = props;
  const { id, nameVoucher, value, toDate, amount } = item;
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const handleSaveVoucher = async () => {
    if (!isAuthenticated) {
      toast.error("Bạn phải đăng nhập để nhận voucher");
      return;
    }
    const dataSend = {
      ID_Customer: user?.id,
      ID_Voucher: id,
      status: "0",
    };

    const res = await VoucherService.createVoucherUser(dataSend);
    console.log("res", res);
    if (res && res.data.EC === 0) {
      messageApi.open({
        type: "success",
        content: "Lưu voucher thành công",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
        },
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Voucher đã tồn tại trong kho !!!",
        style: {
          fontSize: "16px",
          fontWeight: "bold",
          padding: "10px",
        },
      });
    }
  };

  return (
    <div className={cx("cardVoucher")}>
      {contextHolder}
      <div className={cx("bg")}>
        <div className={cx("icon")}>
          <div>
            <img
              src="/src/assets/Voucher/4.png"
              alt="notFoung"
              height={70}
              width={70}
            />
          </div>
          <div>{nameVoucher}</div>
        </div>
      </div>
      <div className={cx("d-flex justify-content-between  p-2")}>
        <div className={cx("content")}>
          <div className={cx("title")}> {nameVoucher} giá trị tour</div>

          <button className={cx("btnVoucher")}>Dành riêng cho bạn</button>

          <div className={cx("dateUse")}>Hạn sử dụng : 12-2-2012</div>
        </div>
        <div className={cx("btnSave")}>
          <button onClick={handleSaveVoucher}>Chọn</button>
        </div>
      </div>
    </div>
  );
}

export default CardVoucher;
