import className from "classnames/bind";
import styles from "./DashboardPage.module.scss";
const cx = className.bind(styles);

import {
  IconArrowNarrowUp,
  IconBrandGoogleAnalytics,
  IconCurrencyDollar,
  IconUmbrella,
  IconUserSquare,
  IconStar,
  IconCalendarEvent,
  IconMessage,
} from "@tabler/icons-react";
import { Table } from "antd";

import RevenueService from "../../../services/RevenueService";
import { useEffect, useState } from "react";
import Funtion from "../../../components/Functions/function";

function DashboardPage() {
  const [listDate, setListDate] = useState({});
  const getData = async () => {
    const res = await RevenueService.Dashboard();
    if (res && res.data.EC == 0) {
      setListDate(res.data.DT);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columnsTopCustomer = [
    {
      title: "Mã khách ",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Họ tên",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Số lượt đặt tour",
      dataIndex: "numberBooking",
      key: "numberBooking",
    },
  ];
  const columnsTopTour = [
    {
      title: "Mã tour",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "tour",
      dataIndex: "name",
      key: "name",
      width: 450,
    },
    {
      title: "Số lượt đặt",
      dataIndex: "booking",
      key: "booking",
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_167ee6")}>
              <IconCurrencyDollar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Doanh thu (VND)</div>
                </div>
                <div className={cx("item2-2")}>
                  {Funtion.formatNumberWithCommas(listDate?.totalMoney)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_4caf50")}>
              <IconBrandGoogleAnalytics style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Đơn đặt tour</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.bookingSuccess}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_da0c4d")}>
              <IconBrandGoogleAnalytics style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Đơn hủy tour</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.bookingFail}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_4c5caf")}>
              <IconUmbrella style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Tour</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.tour}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("my-5")}></div>

      <div className={cx("row")}>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_4caf50")}>
              <IconUserSquare style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Khách hàng</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.user}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_orange")}>
              <IconCalendarEvent style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Lịch</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.calendar}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_blue")}>
              <IconMessage style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Đánh giá tour</div>
                </div>
                <div className={cx("item2-2")}>{listDate?.review}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1", "bg_background_yellow")}>
              <IconStar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Đánh giá sao</div>
                </div>
                <div className={cx("item2-2")}>
                  {listDate?.star?.toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("my-5")}></div>

      <div className={cx("row")}>
        <div className={cx("col-lg-6")}>
          <div>
            <h5 className={cx("fw-bold text-primary")}>
              Thống kê 10 khách hàng có lượt đặt tour nhiều nhất
            </h5>
            <Table
              dataSource={listDate?.CustomerTopPromise}
              columns={columnsTopCustomer}
              bordered
            />
          </div>
        </div>
        <div className={cx("col-lg-6")}>
          <div>
            <h5 className={cx("fw-bold text-primary")}>
              Thống kê 10 tour có lượt khách đặt nhiều nhất
            </h5>
            <Table
              dataSource={listDate?.TourTop}
              columns={columnsTopTour}
              bordered
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
