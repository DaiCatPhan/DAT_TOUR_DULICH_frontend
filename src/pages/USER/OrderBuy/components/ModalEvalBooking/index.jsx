import className from "classnames/bind";
import styles from "./ModalEvalBooking.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { useState } from "react";
const { TextArea } = Input;
import { Rate } from "antd";

import CommentService from "../../../../../services/CommentService";

import { useDispatch, useSelector } from "react-redux";
function ModalEvalBooking(props) {
  const user = useSelector((state) => state.account.user);
  const {
    isShowModalEvalBooking,
    setIsShowModalEvalBooking,
    dataModalEvalBooking,
    setDataModalEvalBooking,
    getListBookingTour,
  } = props;
  console.log(dataModalEvalBooking);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [star, setStar] = useState(5);

  const handleTextAreaChange = (e) => {
    setTextAreaValue(e.target.value); // Cập nhật giá trị của TextArea
  };

  const handleOk = async () => {
    if (!textAreaValue) {
      toast.warning("Vui lòng điện nội dung đánh giá !!!");
      return;
    }
    if (!star) {
      toast.warning("Vui lòng đánh sao chất lượng sao  !!!");
      return;
    }
    const data = {
      ID_Customer: dataModalEvalBooking?.Customer?.id,
      ID_Tour: dataModalEvalBooking?.Calendar?.ID_Tour,
      content: textAreaValue,
      star: star,
    };

    console.log("adfa", data);

    const res = await CommentService.createComment(data);
    if (res && res.data.EC == 0) {
      toast.success("Đánh giá thành công");
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleCancel = () => {
    setIsShowModalEvalBooking(false);
    setTextAreaValue("");
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        open={isShowModalEvalBooking}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={700}
      >
        <div>
          <div className={cx("cancelEval")}>
            <h4 className={cx("text-center text-warning")}>ĐÁNH GIÁ TOUR</h4>
            <div>
              <div className={cx("titleReason")}>
                Hãy để lại cảm nhận và đánh giá của bạn
              </div>
              <TextArea
                rows={5}
                value={textAreaValue}
                onChange={handleTextAreaChange}
              />
              <Rate value={star} onChange={(number) => setStar(number)} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalEvalBooking;
