import className from "classnames/bind";
import styles from "./Voucher.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import CardVoucher from "./components/CardVoucher";
import VoucherService from "../../../services/VoucherService";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Voucher() {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [listVoucher, setListVoucher] = useState([]);
  const [listVoucherUser, setListVoucherUser] = useState([]);

  console.log("listVoucher", listVoucher);
  console.log("listVoucherUser", listVoucherUser);

  const getListVoucher = async () => {
    const res = await VoucherService.readAllVoucher();
    console.log(res);
    if (res && res.data.EC == 0) {
      setListVoucher(res.data.DT.vouchers);
    }
  };
  const readVoucherUser = async () => {
    if (user?.id) {
      const res = await VoucherService.readVoucherUser(`id=${user?.id}`);
      console.log("res", res);
      if (res && res.data.EC === 0) {
        setListVoucherUser(res.data.DT);
      }
    }
  };
  useEffect(() => {
    getListVoucher();
    readVoucherUser();
  }, [user]);

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
              {/* {listVoucher?.map((item) => {
                return (
                  <div key={item?.id} className={cx("col-lg-6")}>
                    <div
                      className={cx(
                        "my-2 d-flex justify-content-center border"
                      )}
                    >
                      <CardVoucher item={item} className={cx("w-100")} /> 
                    </div>
                  </div>
                );
              })} */}

              {listVoucher?.map((item) => {
                // Kiểm tra xem voucher của người dùng có trong danh sách voucher chung không
                const isUserVoucher = listVoucherUser.some(
                  (userVoucher) => userVoucher.ID_Voucher === item.id
                );
                return (
                  <div key={item?.id} className={cx("col-lg-6")}>
                    <div
                      className={cx(
                        "my-2 d-flex justify-content-center border"
                      )}
                    >
                      {/* Truyền props active = true nếu voucher của người dùng trùng với danh sách voucher chung */}
                      <CardVoucher
                        item={item}
                        active={isUserVoucher}
                        className={cx("w-100")}
                      />
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
