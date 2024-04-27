import className from "classnames/bind";
import styles from "./ModalVoucherUser.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useEffect, useState } from "react";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { Empty } from "antd";

import VoucherService from "../../../../services/VoucherService";
import CardVoucher from "./components/CardVoucher";

import { useDispatch, useSelector } from "react-redux";

function ModalVoucherUser(props) {
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const {
    isShowModalVoucherUser,
    setIsShowModalVoucherUser,
    dataModalVoucherUser,
    setDataModalVoucherUser,
    setVoucherSelected,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listVoucher, setListVoucher] = useState([]);

  const getListVoucher = async () => {
    const res = await VoucherService.readVoucherUser(`id=${user?.id}`);
    if (res && res.data.EC == 0) {
      setListVoucher(res.data.DT);
    }
  };
  useEffect(() => {
    getListVoucher();
  }, [dataModalVoucherUser]);

  const handleOk = () => {};
  const handleCancel = () => {
    setIsShowModalVoucherUser(false);
    setDataModalVoucherUser({});
  };

  const handleSelectVoucher = (data) => {
    setVoucherSelected(data);
    setIsShowModalVoucherUser(false);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Kho voucher "
        open={isShowModalVoucherUser}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1200}
        style={{ top: 15 }}
      >
        <div className={cx("container")}>
          {listVoucher.length > 0 ? (
            <div className={cx("farmVoucher")}>
              <div>
                <div>
                  Số lượng có hạn , chỉ áp dụng cho người dùng và tour thỏa
                  mãn điều kiện chương trình
                </div>
                <div className={cx("row")}>
                  {listVoucher?.map((item) => {
                    return (
                      <div key={item?.id} className={cx("col-lg-6")}>
                        <div
                          className={cx(" my-2 d-flex justify-content-center")}
                        >
                          <CardVoucher
                            item={item}
                            handleSelectVoucher={() =>
                              handleSelectVoucher(item)
                            }
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default ModalVoucherUser;
