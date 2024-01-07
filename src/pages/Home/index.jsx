import className from "classnames/bind";
import styles from "./Home.module.scss";
const cx = className.bind(styles);

import { Carousel } from "antd";

function HomePage() {
  return (
    <div className={cx("wrapper")}>
      <section className={cx("SLIDE")}>
        <div>
          <Carousel autoplay>
            <div>
              <img
                className={cx("imageSlide")}
                src="https://saigontourist.com.vn/img/application/homepage/new-banner/1.jpg"
                alt="NOTFOUND"
              />
            </div>
            <div>
              <img
                className={cx("imageSlide")}
                src="https://saigontourist.com.vn/img/application/homepage/new-banner/2.jpg"
                alt="NOTFOUND"
              />
            </div>
            <div>
              <img
                className={cx("imageSlide")}
                src="https://saigontourist.com.vn/img/application/homepage/new-banner/4.jpg"
                alt="NOTFOUND"
              />
            </div>
            <div>
              <img
                className={cx("imageSlide")}
                src="https://saigontourist.com.vn/img/application/homepage/new-banner/5.jpg"
                alt="NOTFOUND"
              />
            </div>
          </Carousel>
        </div>
      </section>

      <div className={cx("container")}>
        <section className="PLACE">
          <h1>Điểm đến yêu thích trong nước</h1>
          <p>Lên rừng xuống biển . Trọn vẹn Việt Nam</p>
          <div className={cx("adressTravel")}>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/03/02/10/phuquoc-show.webp"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Phú Quốc</h2>
              </div>
            </div>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/03/02/10/vungtau-show.webp"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Vũng tàu</h2>
              </div>
            </div>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/03/02/10/quynhon-show.webp"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Đà lạt</h2>
              </div>
            </div>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/03/02/10/dalat-show.webp"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Quy nhơn</h2>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={cx("cardIntroduce")}>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/05/23/19/chon-2.jpg"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/05/23/19/chon-2.jpg"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/05/23/19/chon-2.jpg"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/05/23/19/chon-2.jpg"
                alt=""
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>
          </div>
        </section>

        <section></section>

        <section></section>

        <section></section>
      </div>
    </div>
  );
}

export default HomePage;
