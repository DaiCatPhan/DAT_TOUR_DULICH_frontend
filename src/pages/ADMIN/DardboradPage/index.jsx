import className from "classnames/bind";
import styles from "./DashboardPage.module.scss";
const cx = className.bind(styles);

function DashboardPage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-3  ")}>
          <div className={cx("border border-primary p-5")}>
            <div>TỔNG SỐ ĐƠN HÀNG</div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("border border-warning p-5")}>
            <div>TỔNG SỐ ĐƠN HÀNG</div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("border border-success p-5")}>
            <div>TỔNG SỐ ĐƠN HÀNG</div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("border border-danger p-5")}>
            <div>TỔNG SỐ ĐƠN HÀNG</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
