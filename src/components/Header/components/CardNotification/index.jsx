import className from "classnames/bind";
import styles from "./CardNotification.module.scss";
const cx = className.bind(styles);

import moment from "moment";
import { Link } from "react-router-dom";

function CardNotification(props) {
  const { item } = props;
  return (
    <div className={cx("wrapper")}>
      <Link to={`/user/notification/${item?.id}`}>
        <div className={cx("card")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-9")}>
              <div className={cx("title")}>
                <b>{item?.title}</b>
              </div>
            </div>
            <div className={cx("col-lg-3")}>
              <div className={cx("date")}>
                {moment(item?.createdAt).format("DD-MM-YYYY")}
              </div>
            </div>
          </div>

          <div className={cx("content")}>
            {item && item?.contentTEXT && (
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.contentTEXT,
                }}
                className={cx("desTour")}
              ></div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardNotification;
