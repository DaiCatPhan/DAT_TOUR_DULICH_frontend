import className from "classnames/bind";
import styles from "./Tours.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";

import TourViewed from "./components/TourViewed";
import CardTour from "../../components/CardTour";

import TourService from "../../services/TourService";
import { useEffect, useState } from "react";

function Tours() {
  const [toursMienBac, setToursMienBac] = useState([]);
  const [toursMienTrung, setToursMienTrung] = useState([]);
  const [toursMienNam, setToursMienNam] = useState([]);
  // Gọi API lấy dữ liệu
  const getTours = async () => {
    try {
      const tourMienBac = await TourService.getTours("region=Miền Bắc");
      const tourMienTrung = await TourService.getTours("region=Miền Trung");
      const tourMienNam = await TourService.getTours("region=Miền Nam");
      const res = await TourService.getTours();

      if (res && res.data.EC === 0) {
        setToursMienBac(tourMienBac?.data?.DT);
        setToursMienTrung(tourMienTrung?.data?.DT);
        setToursMienNam(tourMienNam?.data?.DT);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getTours();
  }, []);

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
          <div>
            <h3 className={cx("  ")}>TOUR MIỀN TRUNG</h3>
            <div className={cx("row  g-4 m-auto ")}>
              {toursMienTrung?.tours?.slice(0, 6).map((item) => {
                return (
                  <div className={cx("col-lg-4 d-flex justify-content-center")}>
                    <CardTour item={item} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Tours;
