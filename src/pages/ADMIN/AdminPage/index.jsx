import className from "classnames/bind";
import styles from "./AdminHomePage.module.scss";
const cx = className.bind(styles);

import { IconBriefcase2 } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";

function AdminHomePage() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row   ", "bodyWrapper")}>
        <div className={cx("col-lg-6  ")}>
          <div className={cx("col_left")}>
            <div className={cx("item1")}>
              <button className={cx("btn btn-warning color-black")}>
                Know before you go
              </button>
              <img
                width={30}
                height={30}
                src="/src/assets/Admin/traidat.webp"
                alt="notFound"
                className={cx("mx-3")}
              />
            </div>
            <div className={cx("item2")}>
              Traveling opens the door to creating
              <span className={cx("text-warning mx-2")}>memories</span>
            </div>
            <div className={cx("item3")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur eos suscipit quisquam ratione! Unde nam reprehenderit
              dolor, quaerat eligendi debitis adipisci eaque sequi ipsam omnis
              earum facere vel molestias assumenda.
            </div>
          </div>
        </div>
        <div className={cx("col-lg-6  ")}>
          <div className={cx("col_right")}>
            <div className={cx("item1")}>
              <img src="/src/assets/Admin/home/2.jpg" alt="notFound" />
            </div>

            <div className={cx("item2")}>
              <img src="/src/assets/Admin/home/4.jpg" alt="notFound" />
            </div>

            <div className={cx("item3")}>
              <img src="/src/assets/Admin/home/3.jpg" alt="notFound" />
            </div>
          </div>
        </div>
      </div>
      <div className={cx("row")}>
        <div className={cx("col-lg-7")}>
          <div className={cx("card")}>
            <div className={cx("item", "item1")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Location</b>
                </div>
                <div>Where ara you going</div>
              </div>
            </div>

            <div className={cx("item")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Distance</b>
                </div>
                <div>Distance km/h</div>
              </div>
            </div>

            <div className={cx("item", "item3")}>
              <div className={cx("mx-2")}>
                <IconMapPin color="orange" />
              </div>
              <div>
                <div>
                  <b>Max people</b>
                </div>
                <div className={cx("text-center")}>0</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
