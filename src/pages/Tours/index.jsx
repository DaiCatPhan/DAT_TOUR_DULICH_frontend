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
  const [toursDuLichDongTayBac, setToursDuLichDongTayBac] = useState([]);
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
      const tourMienBac = await TourService.getTours(
        "type=Tour Du Lịch Miền Bắc&status=1"
      );
      const tourMienTrung = await TourService.getTours(
        "type=Tour Du Lịch Miền Trung&status=1"
      );
      const tourMienNam = await TourService.getTours(
        "type=Tour Du Lịch Miền Nam&status=1"
      );

      const tourDuLichHanhHuong = await TourService.getTours(
        "type=Tour Du Lịch Hành Hương&status=1"
      );

      const tourDuLichDongTayBac = await TourService.getTours(
        "type=Tour Du Lịch Đông Tây Bắc&status=1"
      );

      const tourNoiDiaCaoCap = await TourService.getTours(
        "type=Tour Nội Địa Cao Cấp&status=1"
      );

      const tourTraiNghiemDiaPhuong = await TourService.getTours(
        "type=Tour Trải Nghiệm Địa Phương&status=1"
      );

      const tourDuLichTayNguyen = await TourService.getTours(
        "type=Tour Du Lịch Tây Nguyên&status=1"
      );

      const tourViVuCuoiTuan = await TourService.getTours(
        "type=Tour Vi Vu Cuối Tuần&status=1"
      );

      const tourThamHiem = await TourService.getTours(
        "type=Tour Thám Hiểm&status=1"
      );

      const res = await TourService.getTours();

      if (res && res.data.EC === 0) {
        setToursMienBac(tourMienBac?.data?.DT);
        setToursMienTrung(tourMienTrung?.data?.DT);
        setToursMienNam(tourMienNam?.data?.DT);
        setToursDuLichHanhHuong(tourDuLichHanhHuong?.data?.DT);
        setToursDuLichDongTayBac(tourDuLichDongTayBac?.data?.DT);
        setToursNoiDiaCaoCap(tourNoiDiaCaoCap?.data?.DT);
        setToursTraiNghiemDiaPhuong(tourTraiNghiemDiaPhuong?.data?.DT);
        setToursDuLichTayNguyen(tourDuLichTayNguyen?.data?.DT);
        setToursViVuCuoiTuan(tourViVuCuoiTuan?.data?.DT);
        setToursThamHiem(tourThamHiem?.data?.DT);
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
      console.log("getToursViewded", res);

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
    const ID_Customer = user?.id;
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
        <div className={cx("  p-4")}>
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
            {isAuthenticated && toursViewed.length > 0 ? (
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

      {/* Tour Du Lịch Miền Nam */}
      {toursMienNam?.tours?.length > 0 && (
        <div className={cx("bg-white border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Du Lịch Miền Nam</h5>
              <p className={cx("spanTopic")}>
                Miền Nam Việt Nam: Đất Trời Nắng Gió và Nét Văn Hóa Sôi Động
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursMienNam?.tours?.slice(0, 6).map((item) => {
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
      )}

      {/* Tour Du Lịch Miền Trung */}
      {toursMienTrung?.tours?.length > 0 && (
        <div className={cx("bg-grey border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Du Lịch Miền Trung</h5>
              <p className={cx("spanTopic")}>
                Miền Trung Việt Nam: Hành Trình Khám Phá Đất Nước Trung Ương
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursMienTrung?.tours?.slice(0, 6).map((item) => {
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
      )}

      {/* Tour Du Lịch Miền Bắc*/}
      {toursMienBac?.tours?.length > 0 && (
        <div className={cx("bg-white border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Du Lịch Miền Bắc</h5>
              <p className={cx("spanTopic")}>
                Khám Phá Miền Bắc Việt Nam: Hành Trình Qua Thành Phố Cổ và Cảnh
                Đẹp Tự Nhiên
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursMienBac?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Hành Hương */}
      {toursDuLichHanhHuong?.tours?.length > 0 && (
        <div className={cx("bg-grey border  py-4")}>
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
      )}
      {/* Tour Du Lịch Tây Bắc */}
      {toursDuLichDongTayBac?.tours?.length > 0 && (
        <div className={cx("bg-white border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Du Lịch Tây Bắc</h5>
              <p className={cx("spanTopic")}>
                Hành Trình Tâm Linh , Cầu Nguyện An Lành
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursDuLichDongTayBac?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Nội Địa Cao Cấp */}
      {toursNoiDiaCaoCap?.tours?.length > 0 && (
        <div className={cx("bg-grey border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Nội Địa Cao Cấp</h5>
              <p className={cx("spanTopic")}>
                Tour Nội Địa Cao Cấp: Trải Nghiệm Sang Trọng và Đẳng Cấp
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursNoiDiaCaoCap?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Trải Nghiệm Địa Phương */}
      {toursTraiNghiemDiaPhuong?.tours?.length > 0 && (
        <div className={cx("bg-white border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Trải Nghiệm Địa Phương</h5>
              <p className={cx("spanTopic")}>
                Trải Nghiệm Địa Phương: Chuyến Du Lịch Tinh Tế Khám Phá Văn Hóa
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursTraiNghiemDiaPhuong?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Tây Nguyên*/}
      {toursDuLichTayNguyen?.tours?.length > 0 && (
        <div className={cx("bg-grey border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Tây Nguyên</h5>
              <p className={cx("spanTopic")}>
                Khám Phá Tây Nguyên: Hành Trình Đầy Màu Sắc và Văn Hóa
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursDuLichTayNguyen?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Vi Vu Cuối Tuần*/}
      {toursViVuCuoiTuan?.tours?.length > 0 && (
        <div className={cx("bg-white border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Vi Vu Cuối Tuần</h5>
              <p className={cx("spanTopic")}>
                Tour Vi vu Cuối Tuần: Khám Phá Nhanh Gọn Và Đầy Hứng Khởi
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursViVuCuoiTuan?.tours?.slice(0, 6).map((item) => {
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
      )}
      {/* Tour Du Lịch Thám hiểm*/}
      {toursThamHiem?.tours?.length > 0 && (
        <div className={cx("bg-grey border py-4")}>
          <div className={cx("listTour")}>
            <div className={cx("text")}>
              <h5 className={cx("topicTour")}>Tour Thám Hiểm</h5>
              <p className={cx("spanTopic")}>
                Tour Thám Hiểm: Khám Phá Những Vùng Đất Hoang Sơ
              </p>
            </div>
            <div className={cx("row m-auto  ")}>
              {toursThamHiem?.tours?.slice(0, 6).map((item) => {
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
      )}
    </div> 
  );
}

export default Tours;
