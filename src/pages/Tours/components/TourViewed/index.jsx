import className from "classnames/bind";
import styles from "./TourViewed.module.scss";
const cx = className.bind(styles);

function TourViewed() {
  return (
    <div className={cx("   rounded ", "TourSeened")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-4 p-0")}>
          <img
            src="https://cdn2.ivivu.com/2023/07/13/16/ivivu-wiang-kum-kam-chiang-mai-120x120.jpg"
            alt="notFound"
            className={cx("w-100 h-100")}
          />
        </div>
        <div className={cx("col-lg-8 px-3")}>
          <div className={cx("colorTitle")}>
            Tour Thái Lan 4N3Đ (Tết Âm Lịch 2024): Hà Nội - Chiang Mai - Chiang
            Rai - Tam Giác Vàng - Chùa Xanh
          </div>
          <div className={cx("d-flex justify-content-between")}>
            <div></div>
            <p className={cx("colorPrice")}>
              8.400.000 <span>VND</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourViewed;
