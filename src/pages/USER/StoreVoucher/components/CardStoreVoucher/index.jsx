import className from "classnames/bind";
import styles from "./CardStoreVoucher.module.scss";
const cx = className.bind(styles);
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

import VoucherService from "../../../../../services/VoucherService";

function CardStoreVoucher(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { item } = props;
  // const { Voucher } = item;

  // const { id, nameVoucher, value, toDate, amount } = Voucher;

  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);

  const handleSaveVoucher = async () => {
    // if (!isAuthenticated) {
    //   toast.error("Bạn phải đăng nhập để nhận voucher");
    //   return;
    // }
    navigate("/tours");
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
              s
            />
          </div>
          <div>{item?.Voucher?.nameVoucher}</div>
        </div>
      </div>
      <div className={cx("d-flex justify-content-between  p-2")}>
        <div className={cx("content")}>
          <div className={cx("title")}>
            {item?.Voucher?.nameVoucher} giá trị tour
          </div>

          <button className={cx("btnVoucher")}>Dành riêng cho bạn</button>

          <div className={cx("dateUse")}>Hạn sử dụng : 12-2-2012</div>
        </div>
        <div className={cx("btnSave")}>
          <button onClick={handleSaveVoucher}>Dùng ngay</button>
        </div>
      </div>
    </div>
  );
}

export default CardStoreVoucher;
