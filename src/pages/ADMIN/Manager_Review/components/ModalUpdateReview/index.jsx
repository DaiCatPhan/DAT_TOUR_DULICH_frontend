import className from "classnames/bind";
import styles from "./ModalUpdateReview.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal, Radio } from "antd";
import { useEffect, useState } from "react";

import CommentService from "../../../../../services/CommentService";

function ModalUpdateReview(props) {
  const [show, setShow] = useState(null);
  const {
    isShowModalUpdateReview,
    setIsShowModalUpdateReview,
    dataModalUpdateReview,
    setDataModalUpdateReview,
    getListAllComment,
  } = props;

  useEffect(() => {
    setShow(dataModalUpdateReview?.show);
  }, [dataModalUpdateReview]);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = async () => {
    if (!show) {
      toast.warning("Vui lòng chọn trạng thái hiển thị !!!");
      return;
    }

    const res = await CommentService.updateComment({
      id: dataModalUpdateReview.id,
      show: show,
    });
    console.log("res", res);
    if (res && res.data.EC == 0) {
      toast.success("Cập nhật trạng thái hiển thị thành công !!");
      getListAllComment();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleCancel = () => {
    setIsShowModalUpdateReview(false);
    setDataModalUpdateReview({});
  };

  const onChange = (e) => {
    setShow(e.target.value);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Cập nhật đánh giá"
        open={isShowModalUpdateReview}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div>
          <Radio.Group onChange={onChange} value={show}>
            <Radio value={"1"}>HIỂN THỊ</Radio>
            <Radio value={"0"}>KHÔNG HIỂN THỊ</Radio>
          </Radio.Group>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUpdateReview;
