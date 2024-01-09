import className from "classnames/bind";
import styles from "./Tours.module.scss";
const cx = className.bind(styles);

import TourViewed from "./components/TourViewed";

function Tours() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <section className={cx('pt-4')}>
          <div className={cx("d-flex justify-content-between ")}>
            <div className={cx("d-flex align-items-center  ")}>
              <div>
                <img
                  src="https://www.ivivu.com/du-lich/content/img/icon-support.svg"
                  alt="notFound"
                  className={cx("w-100 h-100")}
                />
              </div>
              <div className={cx("mx-2")}>
                <div>Tư Vấn Chuyên Nghiệp</div>
                <div>Hỗ trợ nhiệt tình, chăm sóc chu đáo</div>
              </div>
            </div>
            <div className={cx("d-flex align-items-center  ")}>
              <div>
                <img
                  src="https://www.ivivu.com/du-lich/content/img/icon-location.svg"
                  alt="notFound"
                  className={cx("w-100 h-100")}
                />
              </div>
              <div className={cx("mx-2")}>
                <div>Trải Nghiệm Đa Dạng</div>
                <div>Chọn tour phù hợp, giá tour hợp lý</div>
              </div>
            </div>
            <div className={cx("d-flex align-items-center  ")}>
              <div>
                <img
                  src="https://www.ivivu.com/du-lich/content/img/icon-payment.svg"
                  alt="notFound"
                  className={cx("w-100 h-100")}
                />
              </div>
              <div className={cx("mx-2")}>
                <div>Thanh Toán An Toàn</div>
                <div>Linh hoạt, rõ ràng, bảo mật</div>
              </div>
            </div>
          </div>
        </section>

        <section className={cx("listTourSeened", "my-4 pb-5")}>
          <div className={cx("d-flex     flex-wrap")}>
            <TourViewed />
            <TourViewed />
            <TourViewed />
            <TourViewed />
            <TourViewed />
            <TourViewed />
          </div>
        </section>


        <section className={cx("listTour")}></section>
      </div>
    </div>
  );
}

export default Tours;
