import className from "classnames/bind";
import styles from "./StoreVoucher.module.scss";
const cx = className.bind(styles);

import { IconUserSquare } from "@tabler/icons-react";
import { Button, Checkbox, Form, Input } from "antd";
import CustomerService from "../../../services/CustomerService";
import { useEffect, useState } from "react";
import CardStoreVoucher from "./components/CardStoreVoucher";
import { useSelector } from "react-redux";
import { IconRefresh } from "@tabler/icons-react";

function StoreVoucher() {
  const [listVoucherUser, setListVoucherUser] = useState([]);
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  console.log("listVoucherUser", listVoucherUser);

  const getListVoucherUser = async () => {
    const res = await CustomerService.read(`id=${1}`);
    console.log("res", res);
    if (res && res.data.EC == 0) {
      setListVoucherUser(res.data.DT.VoucherUsers);
    }
  };
  useEffect(() => {
    getListVoucherUser();
  }, []);

  const onFinish = async (values) => {
    const data = listVoucherUser?.filter((item) => {
      return item?.Voucher?.nameVoucher === values.nameVoucher;
    });
    setListVoucherUser(data);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("storeVoucher")}>
        <div className={cx("d-flex align-items-center")}>
          <div className={cx("fs-4")}>Kho voucher</div>
          <div className={cx("mx-4", "poiter")}>
            <IconRefresh
              className={cx("text-success")}
              onClick={getListVoucherUser}
            />
          </div>
        </div>

        <div className={cx("formSearchVoucher")}>
          <div className={cx("px-3")}>
            <Form name="basic" onFinish={onFinish}>
              <div className={cx("d-flex   justify-content-between")}>
                <Form.Item
                  label="Mã Voucher"
                  name="nameVoucher"
                  className={cx("w-100")}
                >
                  <Input className={cx("mx-2")} />
                </Form.Item>
                <div className={cx("mx-3")}></div>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={cx("px-5")}
                  >
                    Tìm
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>

        <div>
          <div className={cx("row")}>
            {listVoucherUser?.map((item) => {
              return (
                <div key={item?.id} className={cx("col-lg-6")}>
                  <div className={cx(" my-2 d-flex justify-content-center")}>
                    <CardStoreVoucher item={item} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreVoucher;
