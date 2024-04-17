import className from "classnames/bind";
import styles from "./Voucher.module.scss";
const cx = className.bind(styles);

import CardVoucher from "./components/CardVoucher";
import VoucherService from "../../../services/VoucherService";
import { useEffect, useState } from "react";

function Voucher() {
  const [listVoucher, setListVoucher] = useState([]);

  const getListVoucher = async () => {
    const res = await VoucherService.readAllVoucher();
    console.log(res);
    if (res && res.data.EC == 0) {
      setListVoucher(res.data.DT.vouchers);
    }
  };
  useEffect(() => {
    getListVoucher();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("farmVoucher")}>
          <img
            src="/src/assets/Voucher/3.png"
            alt="notFound"
            height={450}
            className={cx("w-100")}
          />

          <img
            src="/src/assets/Voucher/2.png"
            alt="notFound"
            height={250}
            className={cx("w-100")}
          />

          <img
            src="/src/assets/Voucher/1.png"
            alt="notFound"
            height={100}
            className={cx("w-100")}
          />

          <div>
            <div className={cx("row")}>
              {listVoucher?.map((item) => {
                return (
                  <div key={item?.id} className={cx("col-lg-6")}> 
                    <div className={cx("my-2 d-flex justify-content-center border")}>
                      <CardVoucher item={item} className={cx('w-100')} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Voucher;
