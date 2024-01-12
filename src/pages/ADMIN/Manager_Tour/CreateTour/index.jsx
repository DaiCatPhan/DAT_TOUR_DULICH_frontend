import className from "classnames/bind";
import styles from "./CreateTour.module.scss";
const cx = className.bind(styles);

function CreateTour() {
  return <div className={cx('wrapper  ')}>
    <div className={cx('row')}>
        <div className={cx('col-lg-9 border border-danger vh-100')}></div>
        <div className={cx('col-lg-3 border border-primary')}></div>
    </div>
  </div>;
}

export default CreateTour;
