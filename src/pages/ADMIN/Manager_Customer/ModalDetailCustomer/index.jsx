import className from "classnames/bind";
import styles from "./ModalDetailCustomer.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import Function from "../../../../components/Functions/function";

import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Radio,
  Modal,
  Table,
} from "antd";
import { Rate } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

function ModalDetailCustomer(props) {
  const {
    isShowModalDetailCustomer,
    setIsShowModalDetailCustomer,
    dataModalDetailCustomer,
    setDataModalDetailCustomer,
    getListCustomers,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const { Option } = Select;

  useEffect(() => {}, [dataModalDetailCustomer]);

  const handleCancel = () => {
    setIsShowModalDetailCustomer(false);
    setDataModalDetailCustomer({});
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const columnsBooking = [
    {
      title: "Mã đặt tour",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "Ngày đặt tour",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{moment(data?.createdAt).format("DD-MM-YYYY")}</div>;
      },
      width: 130,
    },
    {
      title: "Tour",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{data?.Calendar?.Tour?.name}</div>;
      },
      width: 400,
    },
    {
      title: "Lịch",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <div className={cx("d-flex")}>
              <div>Ngày khởi hành : </div>
              <div className={cx("mx-1")}></div>
              <div>{moment(data?.Calendar?.startDay).format("DD-MM-YYYY")}</div>
            </div>
            <div className={cx("d-flex")}>
              <div>Ngày kết thúc : </div>
              <div className={cx("mx-1")}></div>
              <div>{moment(data?.Calendar?.endDay).format("DD-MM-YYYY")}</div>
            </div>
          </div>
        );
      },
      width: 270,
    },
    {
      title: "Giá (vnd)",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <div className={cx("d-flex")}>
              <div>Giá người lớn : </div>
              <div className={cx("mx-1")}></div>
              <div>
                {Function.formatNumberWithCommas(data?.Calendar?.priceAdult)}
              </div>
            </div>
            <div className={cx("d-flex")}>
              <div>Giá trẻ em : </div>
              <div className={cx("mx-1")}></div>
              <div>
                {Function.formatNumberWithCommas(data?.Calendar?.priceChild)}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Lượt đặt",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <div>x {data?.numberTicketAdult}</div>
            <div>x {data?.numberTicketChild}</div>
          </div>
        );
      },
    },
    {
      title: "Tổng tiền (vnd)",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{Function.formatNumberWithCommas(data?.total_money)}</div>;
      },
    },
  ];

  const columnsReview = [
    {
      title: "Mã đánh giá",
      dataIndex: "id",
      key: "id",
      width: 50,
    },
    {
      title: "tour",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{data?.Tour?.name}</div>;
      },
    },
    {
      title: "nội dung",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{data?.content}</div>;
      },
      width: 400,
    },
    {
      title: "đánh giá sao",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <Rate defaultValue={data?.star} disabled />
          </div>
        );
      },
      width: 270,
    },
    {
      title: "Ngày đánh giá",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{moment(data?.createdAt).format("DD-MM-YYYY")}</div>;
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <Modal
        style={{ top: 10 }}
        title="Thông tin chi tiết của khách hàng"
        open={isShowModalDetailCustomer}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1400}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className={cx("wrapper")}>
          <div className={cx("my-4")}>
            <div>Thông tin khách hàng</div>
            <table className={cx("border w-100")}>
              <tr>
                <th>Email</th>
                <td>{dataModalDetailCustomer?.email}</td>
              </tr>
              <tr>
                <th>Họ tên</th>
                <td>{dataModalDetailCustomer?.username}</td>
              </tr>
              <tr>
                <th>Số điện thoại </th>
                <td>{dataModalDetailCustomer?.phone}</td>
              </tr>
              <tr>
                <th>Địa chỉ </th>
                <td>{dataModalDetailCustomer?.address}</td>
              </tr>
            </table>
          </div>
          <div>
            <div>Chi tiết đặt tour của khách hàng</div>
            <div>
              <Table
                dataSource={dataModalDetailCustomer?.bookingAr?.rows}
                columns={columnsBooking}
                bordered
              />
            </div>
          </div>

          <div>
            <div>Chi tiết review của khách hàng</div>
            <div>
              <Table
                dataSource={dataModalDetailCustomer?.reviewAr?.rows}
                columns={columnsReview}
                bordered
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalDetailCustomer;
