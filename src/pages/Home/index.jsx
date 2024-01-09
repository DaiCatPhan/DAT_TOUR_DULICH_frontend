import className from "classnames/bind";
import styles from "./Home.module.scss";
const cx = className.bind(styles);

import { IconDiscountCheckFilled } from "@tabler/icons-react";

import { Carousel } from "antd";

import TicketUI from "./components/TicketUI";

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
        <div className={cx("my-5")}></div>

        <section className={cx("cardIntroduce1")}>
          <h2>Cuối năm rồi , đi chơi thôi!</h2>
          <p>Thư giãn - nạp năng lượng - khám phá</p>
          <div className={cx("cardIntroduce")}>
            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/05/23/19/chon-2.jpg"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2022/01/14/16/chon-4.jpg"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/06/01/18/tb1.png"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/images/general/dangcap1.webp"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Quốc tế</h2>
                <p>Khám phá thế giới trong tầm tay</p>
              </div>
            </div>
          </div>
        </section>

        <div className={cx("my-5 ")}></div>

        <section className="adressTravel">
          <div className={cx("PLACE")}>
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
          </div>
        </section>

        <div className={cx("my-5 ")}></div>

        <section className={cx("aboutCompany")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-6 border")}>
              <h1 className={cx("mb-5")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </h1>
              <div className={cx("my-5")}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga
                ipsam harum ad earum eligendi, ducimus fugiat perspiciatis
                necessitatibus labore quas accusantium reiciendis corporis,
                velit culpa est nostrum obcaecati molestias dolorum!
              </div>
              <div>
                <div className={cx("d-flex justify-content-around my-5 ")}>
                  <TicketUI title={"Family Camping"} rotate={"rotate-10"} />
                  <TicketUI title={"Wild Camping"} rotate={"rotate10"} />
                </div>
                <div className={cx("d-flex justify-content-around my-5 ")}>
                  <TicketUI title={"Fishing"} rotate={"rotate-10"} />
                  <TicketUI title={"Mountain Biking"} rotate={"rotate10"} />
                </div>
                <div className={cx("d-flex justify-content-around my-5 ")}>
                  <TicketUI title={"Luxury Cabin"} rotate={"rotate-10"} />
                  <TicketUI title={"Couple Camping"} rotate={"rotate10"} />
                </div>
              </div>
            </div>
            <div className={cx("col-lg")}>
              <img
                src="https://gowilds.webtravel.vn/assets/images/about-1.jpg"
                alt="notFound"
              />
            </div>
          </div>
        </section>

        <section></section>

        <section></section>
      </div>
    </div>
  );
}

export default HomePage;
