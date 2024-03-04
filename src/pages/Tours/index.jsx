import className from "classnames/bind";
import styles from "./Tours.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import TourViewed from "./components/TourViewed";
import CardTour from "../../components/CardTour";
import FormSearch from "./components/FormSearch";

import TourService from "../../services/TourService";
import ViewedService from "../../services/ViewedService";

import { useDispatch, useSelector } from "react-redux";

function Tours() {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [toursMienBac, setToursMienBac] = useState([]);
  const [toursMienTrung, setToursMienTrung] = useState([]);
  const [toursMienNam, setToursMienNam] = useState([]);
  const [toursDuLichHanhHuong, setToursDuLichHanhHuong] = useState([]);
  const [toursNoiDiaCaoCap, setToursNoiDiaCaoCap] = useState([]);
  const [toursTraiNghiemDiaPhuong, setToursTraiNghiemDiaPhuong] = useState([]);
  const [toursDuLichTayNguyen, setToursDuLichTayNguyen] = useState([]);
  const [toursViVuCuoiTuan, setToursViVuCuoiTuan] = useState([]);
  const [toursThamHiem, setToursThamHiem] = useState([]);
  const [toursViewed, setToursViewed] = useState([]);
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

  // Gọi API lấy dữ liệu
  const getToursViewded = async () => {
    try {
      const ID_Customer = user?.id;
      const res = await ViewedService.readAll(`ID_Customer=${ID_Customer}`);

      if (res && res.data.EC === 0) {
        setToursViewed(res?.data?.DT);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  // Lấy Tour đã xem

  useEffect(() => {
    getTours();
    getToursViewded();
  }, [user?.id]);

  const handleClickTour = async (data) => {
    // Goi API them vào bảng tour đã xem
    const ID_Tour = data?.id;
    const ID_Customer = 1;
    const res = await ViewedService.create({ ID_Tour, ID_Customer });
    if (res && res.data.EC === 0) {
      navigate(`/tours/${data?.id}`);
    } else {
      navigate(`/tours/${data?.id}`);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("bgTourPage")}>
        <img
          src="https://cdn2.ivivu.com/2023/12/28/14/tour-20231227-1.png"
          alt="notFound"
          className={cx("w-100", "imageTourPage")}
          height={500}
        />
        <div className={cx("formSearch")}>
          <FormSearch />
        </div>
      </div>

      <div className={cx("listTourSeened")}>
        <div className={cx("border p-4")}>
          <div className={cx("d-flex justify-content-between mx-2")}>
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

          <div className={cx("my-4 ")}>
            {isAuthenticated ? (
              <p className={cx("colorTitle", "fs-2")}>
                Tours du lịch bạn đã xem gần đây
              </p>
            ) : (
              <div></div>
            )}

            <div className={cx("listMap")}>
              {toursViewed?.map((tourSeened) => {
                return (
                  <div className={cx("item")} key={tourSeened?.id}>
                    <TourViewed
                      item={tourSeened}
                      getToursViewded={getToursViewded}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tour Du Lịch Hành Hương */}
      <div className={cx("bg-white border  py-4")}>
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
