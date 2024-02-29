import className from "classnames/bind";
import styles from "./Footer.module.scss";
const cx = className.bind(styles);

function Footer() {
  return (
    <div className={cx("  d-flex p-5 border")}>
      <div>
        <div className={cx("row")}>
          <div className={cx("col-lg-4")}>
            <div className={cx("title")}>Về iVIVU.com</div>
            <div className={cx("text-13")}>Chúng tôi</div>
            <div className={cx("text-13")}>iVIVU Blog</div>
            <div className={cx("text-13")}>PMS - Miễn phí</div>
          </div>
          <div className={cx("col-lg-4")}>
            <div className={cx("title")}>Thông Tin Cần Biết</div>
            <div className={cx("text-13")}>Điều kiện & Điều khoản</div>
            <div className={cx("text-13")}>Quy chế hoạt động</div>
            <div className={cx("text-13")}>Câu hỏi thường gặp</div>
          </div>
          <div className={cx("col-lg-4")}>
            <div className={cx("title")}>Đối tác</div>
            <div className={cx("text-13")}>Quy chế bảo hiểm Cathay</div>
            <div className={cx("text-13")}>Yêu cầu bồi thường Cathay</div>
            <div className={cx("text-13")}>Quy chế trả góp</div>
          </div>
        </div>
        <div className={cx("row my-3")}>
          <div className={cx("d-flex")}>
            <div>
              <div className={cx("d-flex align-items-end w-75 gap-3")}>
                <img
                  width={70}
                  height={70}
                  src="https://res.ivivu.com/hotel/img/ivv-agency-winner.svg"
                  alt=""
                />
                <div className={cx("title")}>
                  Đại lý Du lịch Trực tuyến Hàng đầu Việt Nam
                </div>
              </div>
            </div>
            <div>
              <div className={cx("d-flex align-items-end w-75 gap-3")}>
                <img
                  width={40}
                  height={70}
                  src="https://res.ivivu.com/img/hraa-logo.png"
                  alt=""
                />
                <div className={cx("title")}>
                  Đại lý Du lịch Trực tuyến Hàng đầu Việt Nam
                </div>
              </div>
            </div>
            <div>
              <div className={cx("d-flex align-items-end w-75 gap-3")}>
                <img
                  width={30}
                  height={70}
                  src="https://res.ivivu.com/hotel/img/apea.png"
                  alt=""
                />
                <div className={cx("title")}>
                  Đại lý Du lịch Trực tuyến Hàng đầu Việt Nam
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("row")}>
          <div className={cx("text-15 ")}>
            HCM: Lầu 2, Tòa nhà Anh Đăng, 215 Nam Kỳ Khởi Nghĩa, Phường 7, Quận
            3, Tp. Hồ Chí Minh (Xem bản đồ)
          </div>
          <div className={cx("text-15 my-2")}>
            HN: P308, Tầng 3, tòa nhà The One, số 2 Chương Dương Độ, P.Chương
            Dương, Q.Hoàn Kiếm, Hà Nội (Xem bản đồ)
          </div>
          <div className={cx("text-15")}>
            Cần Thơ: Tầng 7 - Tòa nhà STS - 11B Đại Lộ Hòa Bình, P. Tân An, Q.
            Ninh Kiều, TP. Cần Thơ (Xem bản đồ)
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>Được chứng nhận</div>
          <div className={cx("d-flex gap-4")}>
            <div>
              <img src="https://cdn1.ivivu.com/bocongthuong.png" alt="" />
            </div>
            <div>
              <img
                width={70}
                src="https://res.ivivu.com/img/iata_logo.webp"
                alt=""
              />
            </div>
          </div>
          <div>Bạn cần trợ giúp? Hãy gọi ngay!</div>
          <div>0328472724</div>
          <div>Tư vấn với Olivia - chatbot của iVIVU</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
