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
  const [formVoucher] = Form.useForm();

  const getListVoucherUser = async () => { 
    let condition = ``;
    if (user?.id) {
      condition += `id=${user?.id}`;
    }
    const res = await CustomerService.read(condition);
    if (res && res.data.EC == 0) {
      setListVoucherUser(res?.data?.DT?.VoucherUsers);
    }
  };
  useEffect(() => {
    getListVoucherUser();
  }, [user]);

  const onFinish = async (values) => {
    const { nameVoucher } = values;

    let condition = ``;
    if (user?.id) {
      condition += `id=${user?.id}`;
    }
    if (nameVoucher) {
      condition += `&nameVoucher=${nameVoucher}`;
    }
    const res = await CustomerService.read(condition);
    if (res && res.data.EC == 0) {
      setListVoucherUser(res?.data?.DT?.VoucherUsers);
    }
  };

  const F5_data = async () => {
    let condition = ``;
    if (user?.id) {
      condition += `id=${user?.id}`;
    }
    const res = await CustomerService.read(condition);
    if (res && res.data.EC == 0) {
      setListVoucherUser(res?.data?.DT?.VoucherUsers);
      formVoucher.resetFields();
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("storeVoucher")}>
        <div className={cx("d-flex align-items-center")}>
          <div className={cx("fs-4")}>Kho voucher</div>
          <div className={cx("mx-4", "poiter")}>
            <IconRefresh className={cx("text-success")} onClick={F5_data} />
          </div>
        </div>

        <div className={cx("formSearchVoucher")}>
          <div className={cx("px-3")}>
            <Form name="basic" onFinish={onFinish} form={formVoucher}>
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
