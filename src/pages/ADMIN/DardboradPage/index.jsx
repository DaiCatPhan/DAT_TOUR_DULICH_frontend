import className from "classnames/bind";
import styles from "./DashboardPage.module.scss";
const cx = className.bind(styles);

import RevenueService from "../../../services/RevenueService";
import { useEffect, useState } from "react";

function DashboardPage() {
  const [listDate, setListDate] = useState({});
  const getData = async () => {
    const res = await RevenueService.Dashboard();
    if (res && res.data.EC == 0) {
      setListDate(res.data.DT);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-4  ")}>
          <div className={cx("border border-primary p-5")}>
            <div>TỔNG SỐ TOUR: {listDate.tour}</div>
          </div>
        </div>
        <div className={cx("col-lg-4")}>
          <div className={cx("border border-warning p-5")}>
            <div>TỔNG SỐ KHÁCH HÀNG : {listDate.user}</div>
          </div>
        </div>
        <div className={cx("col-lg-4")}>
          <div className={cx("border border-success p-5")}>
            <div>TỔNG SỐ ĐƠN HÀNG : {listDate.donHang}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
