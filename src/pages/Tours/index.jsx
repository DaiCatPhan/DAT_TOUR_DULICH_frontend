import className from "classnames/bind";
import styles from "./Tours.module.scss";
const cx = className.bind(styles);

import TourViewed from "./components/TourViewed";
import CardTour from "../../components/CardTour";

function Tours() {
  const listTourSeened = [
    {
      id: 1,
      nameTour:
        "Tour Malaysia - Singapore 5N4Đ: TP.HCM - Kualar Lumpur - Singapore Tết Ta  ",
      image:
        "https://cdn2.ivivu.com/2023/07/13/16/ivivu-wiang-kum-kam-chiang-mai-120x120.jpg",
      price: "5000000",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {/* <section className={cx("listTourSeened")}>
          <div className={cx("py-4")}>
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
          </div>

          <div className={cx("d-flex  flex-wrap")}>
            {listTourSeened.map((tourSeened, index) => {
              return (
                <TourViewed
                  nameTour={tourSeened?.nameTour}
                  image={tourSeened?.image}
                  price={tourSeened?.price}
                  key={tourSeened?.id}
                />
              );
            })}
          </div>
        </section> */}

        <section className={cx("listTour")}>
          <div className={cx("row g-4")}>
            <div className={cx("col-lg-4")}>
              <CardTour />
            </div>
             
          </div>
        </section>
      </div>
    </div>
  );
}

export default Tours;
