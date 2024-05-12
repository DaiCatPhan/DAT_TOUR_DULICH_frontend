import className from "classnames/bind";
import styles from "./Home.module.scss";
const cx = className.bind(styles);

import { IconDiscountCheckFilled } from "@tabler/icons-react";

import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import TicketUI from "./components/TicketUI";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Link } from "react-router-dom";

import TourService from "../../services/TourService";

function HomePage() {
  const navigate = useNavigate();
  const [listTourMostPopular, setListTourMostPopular] = useState([]); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [totalPage, setTotalPage] = useState(20);

  const getListTourMostPopular = async () => {
    const res = await TourService.readAllMostPopular(
      `page=${page}&limit=8&sortOrder=DESC&sortBooking=true`
    );
    if (res && res.data.EC == 0) {
      setListTourMostPopular(res.data.DT);
      setTotalPage(res.data.DT.totalRows);
    }
  };
  useEffect(() => {
    getListTourMostPopular();
  }, [page]);

  const handlePageChangePagination = (page, pageSize) => {
    setPage(page);
  };

  const dataTourLove = [
    {
      key: 1,
      content: "Phú Quốc",
      url: "https://cdn1.ivivu.com/iVivu/2023/03/02/10/phuquoc-show.webp",
    },
    {
      key: 2,
      content: "VŨNG TÀU",
      url: "https://cdn1.ivivu.com/iVivu/2023/03/02/10/vungtau-show.webp",
    },
    {
      key: 3,
      content: "ĐÀ LẠT",
      url: "https://cdn1.ivivu.com/iVivu/2023/03/02/10/dalat-show.webp",
    },
    {
      key: 4,
      content: "QUY NHƠN",
      url: "https://cdn1.ivivu.com/iVivu/2023/03/02/10/quynhon-show.webp",
    },
  ];

  const handleClickAddressTour = (data) => {
    navigate(`/tours/topic?name=${data.content}`);
  };
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
                <h2>Vui hè</h2>
                <p>Chạm vào mùa hè kỳ diệu</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2022/01/14/16/chon-4.jpg"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Villa</h2>
                <p>Vui hè , giải tỏa cái nóng </p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/iVivu/2023/06/01/18/tb1.png"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Team X</h2>
                <p>Nâng tầm chuyến du lịch của công ty và đội nhóm của bạn !</p>
              </div>
            </div>

            <div className={cx("item")}>
              <img
                src="https://cdn1.ivivu.com/images/general/dangcap1.webp"
                alt="notFound"
              />
              <div className={cx("content")}>
                <h2>Gift Voucher</h2>
                <p>Lưu trữ khoảnh khắc , trải nghiệm hành trình</p>
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
              {dataTourLove?.map((tour) => {
                return (
                  <div
                    className={cx("item", "poiter")}
                    onClick={() => handleClickAddressTour(tour)}
                  >
                    <img src={tour.url} alt="notFound" />
                    <div className={cx("content")}>
                      <h2>{tour.content}</h2>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className={cx("my-5 ")}></div>

        <section className={cx("tourPopolar")}>
          <h2 className={cx("title")}>TOUR PHỔ BIẾN NHẤT TRONG NĂM</h2>
          <div className={cx("row")}>
            {listTourMostPopular?.tours?.map((tour) => {
              return (
                <div key={tour.id} className={cx("col-lg-3")}>
                  <div className={cx("cardTour")}>
                    <a href={`/tours/${tour.id}`}>
                      <div className={cx("image")}>
                        <img src={tour?.image} alt="notFound" />
                      </div>
                      <div className={cx("content")}>
                        <div
                          className={cx("d-flex justify-content-between py-2")}
                        >
                          <div className={cx("duration")}>
                            {tour?.numbeOfDay} ngày {tour?.numberOfNight} đêm
                          </div>

                          <div className={cx("numberBooking")}>
                            lượt đặt : {tour?.booking}
                          </div>
                        </div>
                        <div className={cx("name")}>{tour?.name} </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={cx("text-center my-2")}>
            <Pagination
              defaultCurrent={1}
              total={totalPage}
              pageSize={limit}
              onChange={handlePageChangePagination}
            />
          </div>
        </section>

        <section className={cx("aboutCompany")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-6")}>
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
      </div>
    </div>
  );
}

export default HomePage;
