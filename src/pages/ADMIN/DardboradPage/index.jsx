import className from "classnames/bind";
import styles from "./DashboardPage.module.scss";
const cx = className.bind(styles);

import {
  IconArrowNarrowUp,
  IconBrandGoogleAnalytics,
  IconCurrencyDollar,
} from "@tabler/icons-react";

import RevenueService from "../../../services/RevenueService";
import { useEffect, useState } from "react";

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

  return (
    <div className={cx("wrapper")}>
      <div className={cx("row")}>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1")}>
              <IconCurrencyDollar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Earnings</div>
                </div>
                <div className={cx("item2-2")}>22,520</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1")}>
              <IconCurrencyDollar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Earnings</div>
                </div>
                <div className={cx("item2-2")}>22,520</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1")}>
              <IconCurrencyDollar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Earnings</div>
                </div>
                <div className={cx("item2-2")}>22,520</div>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("col-lg-3")}>
          <div className={cx("card")}>
            <div className={cx("item1")}>
              <IconCurrencyDollar style={{ width: "42", height: "42" }} />
            </div>

            <div className={cx("item2")}>
              <div>
                <div className={cx("item2-1")}>
                  <div>
                    <IconArrowNarrowUp style={{ width: "20", height: "17" }} />
                  </div>
                  <div>Earnings</div>
                </div>
                <div className={cx("item2-2")}>22,520</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
