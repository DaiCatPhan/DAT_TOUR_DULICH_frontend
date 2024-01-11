import className from "classnames/bind";
import styles from "./AdminHomePage.module.scss";
const cx = className.bind(styles);

import { IconBriefcase2 } from "@tabler/icons-react";

function AdminHomePage() {
  return (
    <div className={cx("row")}>
      <div className={cx("col-lg-6  ")}>
        <h1>Explore all tour of the world with us</h1>
        <div className={cx("fs-5 my-4")}>
          Lorem Ipsum available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which don't look
          even slightly believable.
        </div>
        <div>
          <div className={cx("d-flex align-items-center my-3")}>
            <div className={cx("mx-3")}>
              <div className={cx("rounded-circle border   ", "customIcon")}>
                <IconBriefcase2 className={cx("text-white")} />
              </div>
            </div>
            <div>
              <div className={cx("fs-3")}>Tour guide</div>
              <div>
                Lorem Ipsum available, but the majority have suffered alteration
                in some.
              </div>
            </div>
          </div>

          <div className={cx("d-flex align-items-center my-3")}>
            <div className={cx("mx-3")}>
              <div className={cx("rounded-circle border   ", "customIcon")}>
                <IconBriefcase2 className={cx("text-white")} />
              </div>
            </div>
            <div>
              <div className={cx("fs-3")}>Tour guide</div>
              <div>
                Lorem Ipsum available, but the majority have suffered alteration
                in some.
              </div>
            </div>
          </div>
          <div className={cx("d-flex align-items-center my-2")}>
            <div className={cx("mx-3")}>
              <div className={cx("rounded-circle border   ", "customIcon")}>
                <IconBriefcase2 className={cx("text-white")} />
              </div>
            </div>
            <div>
              <div className={cx("fs-3")}>Tour guide</div>
              <div>
                Lorem Ipsum available, but the majority have suffered alteration
                in some.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("col-lg-6  ")}>
        <img
          src="/src/assets/Admin/travel.png"
          alt="notFound"
          className={cx("w-100  ",'imageHome')}
        />
      </div>
    </div>
  );
}

export default AdminHomePage;
