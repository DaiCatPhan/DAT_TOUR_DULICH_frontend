import className from "classnames/bind";
import styles from "./Tours.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import TourViewed from "./components/TourViewed";
import CardTour from "../../components/CardTour";

import TourService from "../../services/TourService";
import { useEffect, useState } from "react";

function Tours() {
  const [toursMienBac, setToursMienBac] = useState([]);
  const [toursMienTrung, setToursMienTrung] = useState([]);
  const [toursMienNam, setToursMienNam] = useState([]);
  const [toursDuLichHanhHuong, setToursDuLichHanhHuong] = useState([]);
  const [toursNoiDiaCaoCap, setToursNoiDiaCaoCap] = useState([]);
  const [toursTraiNghiemDiaPhuong, setToursTraiNghiemDiaPhuong] = useState([]);
  const [toursDuLichTayNguyen, setToursDuLichTayNguyen] = useState([]);
  const [toursViVuCuoiTuan, setToursViVuCuoiTuan] = useState([]);
  const [toursThamHiem, setToursThamHiem] = useState([]);

  const navigate = useNavigate();

  // Gọi API lấy dữ liệu
  const getTours = async () => {
    try {
      const toursMienBac = await TourService.getTours(
        "type=Tour Du Lịch Miền Bắc"
      );
      const toursMienTrung = await TourService.getTours(
        "type=Tour Du Lịch Miền Trung"
      );
      const toursMienNam = await TourService.getTours(
        "type=Tour Du Lịch Miền Nam"
      );

      const toursDuLichHanhHuong = await TourService.getTours(
        "type=Tour Du Lịch Hành Hương"
      );

      const toursNoiDiaCaoCap = await TourService.getTours(
        "type=Tour Nội Địa Cao Cấp"
      );

      const toursTraiNghiemDiaPhuong = await TourService.getTours(
        "type=Tour Trải Nghiệm Địa Phương"
      );

      const toursDuLichTayNguyen = await TourService.getTours(
        "type=Tour Du Lịch Tây Nguyên"
      );

      const toursViVuCuoiTuan = await TourService.getTours(
        "type=Tour Vi Vu Cuối Tuần"
      );

      const toursThamHiem = await TourService.getTours("type=Tour Thám Hiểm");

      const res = await TourService.getTours();

      if (res && res.data.EC === 0) {
        setToursMienBac(toursMienBac?.data?.DT);
        setToursMienTrung(toursMienTrung?.data?.DT);
        setToursMienNam(toursMienNam?.data?.DT);
        setToursDuLichHanhHuong(toursDuLichHanhHuong?.data?.DT);
        setToursNoiDiaCaoCap(toursNoiDiaCaoCap?.data?.DT);
        setToursTraiNghiemDiaPhuong(toursTraiNghiemDiaPhuong?.data?.DT);
        setToursDuLichTayNguyen(toursDuLichTayNguyen?.data?.DT);
        setToursViVuCuoiTuan(toursViVuCuoiTuan?.data?.DT);
        setToursThamHiem(toursThamHiem?.data?.DT);
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

  const handleClickTour = async (data) => {
    // Goi API them vào bảng tour đã xem

    navigate(`/tours/${data?.id}`);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("bg")}>
        <img
          src="https://cdn2.ivivu.com/2023/12/28/14/tour-20231227-1.png"
          alt="notFound"
          className={cx("w-100")}
          height={480}
        />
      </div>
      <div className={cx("container")}>
        <section className={cx("listTourSeened")}>
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
        </section>
      </div>

      {/* LIST TOPIC TOUR */}

      {/* Tour Du Lịch Hành Hương */}
      <div className={cx("bg-white border py-4")}>
        <div className={cx("listTour")}>
          <div className={cx("text")}>
            <h5 className={cx("topicTour")}>Tour Du Lịch Hành Hương</h5>
            <p className={cx("spanTopic")}>
              Hành Trình Tâm Linh , Cầu Nguyện An Lành
            </p>
          </div>
          <div className={cx("row m-auto  ")}>
            {toursDuLichHanhHuong?.tours?.slice(0, 6).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickTour(item)}
                  className={cx(
                    "col-lg-4 d-flex justify-content-center mb-3",
                    "poiter"
                  )}
                >
                  <CardTour item={item} />
                </div>
              );
            })}
          </div>
          <div className={cx("text-center   pb-3")}>
            <Link to={`/tours/topic?type=Tour Du Lịch Hành Hương`}>
              <button className={cx("btnSeenTour")}>Xem thêm tours</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Du Lịch Miền Bắc */}
      <div className={cx("bg-grey border py-4")}>
        <div className={cx("listTour")}>
          <div className={cx("text")}>
            <h5 className={cx("topicTour")}>Tour Du Lịch Miền Bắc</h5>
            <p className={cx("spanTopic")}>
              Hành Trình Tâm Linh , Cầu Nguyện An Lành
            </p>
          </div>
          <div className={cx("row m-auto  ")}>
            {toursDuLichHanhHuong?.tours?.slice(0, 6).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickTour(item)}
                  className={cx(
                    "col-lg-4 d-flex justify-content-center mb-3",
                    "poiter"
                  )}
                >
                  <CardTour item={item} />
                </div>
              );
            })}
          </div>
          <div className={cx("text-center   pb-3")}>
            <Link to={`/tours/topic?type=Tour Du Lịch Miền Bắc`}>
              <button className={cx("btnSeenTour")}>Xem thêm tours</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Du Lịch Miền Trung */}
      <div className={cx("bg-white border py-4")}>
        <div className={cx("listTour")}>
          <div className={cx("text")}>
            <h5 className={cx("topicTour")}>Tour Du Lịch Miền Trung</h5>
            <p className={cx("spanTopic")}>
              Hành Trình Tâm Linh , Cầu Nguyện An Lành
            </p>
          </div>
          <div className={cx("row m-auto  ")}>
            {toursDuLichHanhHuong?.tours?.slice(0, 6).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickTour(item)}
                  className={cx(
                    "col-lg-4 d-flex justify-content-center mb-3",
                    "poiter"
                  )}
                >
                  <CardTour item={item} />
                </div>
              );
            })}
          </div>
          <div className={cx("text-center   pb-3")}>
            <Link to={`/tours/topic?type=Tour Du Lịch Miền Trung`}>
              <button className={cx("btnSeenTour")}>Xem thêm tours</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Tour Du Lịch Miền Nam */}
      <div className={cx("bg-grey border py-4")}>
        <div className={cx("listTour")}>
          <div className={cx("text")}>
            <h5 className={cx("topicTour")}>Tour Du Lịch Miền Nam</h5>
            <p className={cx("spanTopic")}>
              Hành Trình Tâm Linh , Cầu Nguyện An Lành
            </p>
          </div>
          <div className={cx("row m-auto  ")}>
            {toursDuLichHanhHuong?.tours?.slice(0, 6).map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleClickTour(item)}
                  className={cx(
                    "col-lg-4 d-flex justify-content-center mb-3",
                    "poiter"
                  )}
                >
                  <CardTour item={item} />
                </div>
              );
            })}
          </div>
          <div className={cx("text-center   pb-3")}>
            <Link to={`/tours/topic?type=Tour Du Lịch Miền Nam`}>
              <button className={cx("btnSeenTour")}>Xem thêm tours</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tours;
