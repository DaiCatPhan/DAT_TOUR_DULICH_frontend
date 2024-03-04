import className from "classnames/bind";
import styles from "./ModalDeleteVoucher.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import VoucherService from "../../../../../../services/VoucherService";

function ModalDeleteVoucher(props) {
  const {
    isShowModalDeleteVoucher,
    setIsShowModalDeleteVoucher,
    dataModalDeleteVoucher,
    setDataModalDeleteVoucher,
    getListVouchers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setIsShowModalDeleteVoucher(false);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await VoucherService.deleteVoucher({
      id: dataModalDeleteVoucher?.id,
      table: "Voucher",
    });
    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListVouchers();
      handleCancel();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };

  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Xóa voucher"
        open={isShowModalDeleteVoucher}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "red", borderColor: "red" } }}
      >
        <div>
          <div>
            Bạn có chắc chắn muốn xóa voucher
            <b className={cx("mx-1")}>{dataModalDeleteVoucher?.nameVoucher}</b>
          </div>
          <div className={cx("my-2")}>
            Lưu ý hành động không thể hoàn tất !!!
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDeleteVoucher;
