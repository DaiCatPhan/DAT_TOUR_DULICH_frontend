import className from "classnames/bind";
import styles from "./ModalChangeCalendar.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { useState } from "react";
import moment from "moment";

function ModalChangeCalendar(props) {
  const {
    isShowModalChangeCalendar,
    setIsShowModalChangeCalendar,
    dataModalChangeCalendar,
    setDataModalChangeCalendar,
    changeCalendar,
  } = props; 

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState({});

  const handleOk = () => {
    changeCalendar(activeCalendar);
    handleCancel();
  };
  const handleCancel = () => {
    setIsShowModalChangeCalendar(false);
  };
  const handlActiveBorderCalendar = (item) => {
    setActiveCalendar(item);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Thay đổi lịch "
        open={isShowModalChangeCalendar}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <div className={cx("row")}>
            {dataModalChangeCalendar?.map((item) => {
              return (
                <div className={cx("col-lg-4")} key={item?.id}>
                  <div
                    onClick={() => handlActiveBorderCalendar(item)}
                    className={
                      item.id === activeCalendar.id
                        ? cx("calendarCard", "date", "active")
                        : cx("calendarCard", "date")
                    }
                  >
                    {moment(item?.startDay).format("DD/MM")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalChangeCalendar;
