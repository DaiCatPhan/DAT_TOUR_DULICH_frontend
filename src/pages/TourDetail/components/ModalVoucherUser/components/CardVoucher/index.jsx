import className from "classnames/bind";
import styles from "./CardVoucher.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import { Button, message, Space } from "antd";

function CardVoucher(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const { item, handleSelectVoucher } = props;
  const { Voucher } = item;
  const { id, nameVoucher, value, toDate, amount } = Voucher;

  const handleSaveVoucher = async () => {
    handleSelectVoucher(item);
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
