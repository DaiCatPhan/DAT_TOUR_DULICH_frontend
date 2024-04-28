import className from "classnames/bind";
import styles from "./CardNotification.module.scss";
const cx = className.bind(styles);
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";

function CardNotification(props) {
  const navigate = useNavigate();
  const { item, handleUpdateNotification } = props;
  const hanleOnlick = () => {
    navigate(`/user/notification/${item?.id}`);
    handleUpdateNotification(item);
  };
  return (
    <div className={cx("wrapper")}>
      <div onClick={hanleOnlick} className={cx("poiter")}>
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
      </div>
    </div>
  );
}

export default CardNotification;
