import className from "classnames/bind";
import styles from "./ListCustomer.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Form, Button } from "antd";

import moment from "moment";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { AudioOutlined } from "@ant-design/icons";
import { IconList } from "@tabler/icons-react";

import CustomerService from "../../../../services/CustomerService";

import ModalEditCustomer from "../ModalEditCustomer";
import ModalDeleteCustomer from "../ModalDeleteCustomer";

function ListCustomer() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listCustomer, setListCustomer] = useState([]);

  // modal update tour , delete tour , update processTour
  const [isShowModalUpdateCustomer, setIsShowModalUpdateCustomer] =
    useState(false);
  const [dataModalUpdateCustomer, setDataModalUpdateCustomer] = useState({});
  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);
  const [dataModalDeleteCustomer, setDataModalDeleteCustomer] = useState({});
  const handleModalUpdateCustomer = (data) => {
    setIsShowModalUpdateCustomer(true);
    setDataModalUpdateCustomer(data);
  };
  const handleModalDeleteCustomer = (data) => {
    setIsShowModalDeleteCustomer(true);
    setDataModalDeleteCustomer(data);
  };

  // Gọi API lấy dữ liệu
  const getListCustomers = async () => {
    try {
      const res = await CustomerService.readAll();

      if (res && res.data.EC === 0) {
        let cus = res.data.DT.users.map((item) => ({
          ...item,
          key: item.id,
        }));
        setListCustomer(cus);
        setTotal(res.data.DT.totalRows);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

  useEffect(() => {
    getListCustomers();
  }, []);

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "username",
      key: "age",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record) => <div>{moment(record).format("DD-MM-YYYY")}</div>,
    },

    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <IconTrash
              onClick={() => handleModalDeleteCustomer(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            />
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateCustomer(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
    },
  ];

  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
  };

  const onFinishSearchCustomer = async (values) => {
    const { id, username, email } = values;
    const res = await TourService.getTours();
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.tours.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  const handleExportExcel = async () => {
    alert("Xuat Excel");
  };

  return (
    <div className={cx("wrapper", "border")}>
      <div className={cx("title", "d-flex justify-content-between")}>
        <div className={cx("d-flex align-items-center")}>
          <div>
            <IconList />
          </div>
          <div className={cx("mx-2")}>Danh sách người dùng</div>
        </div>
        <div>
          <button onClick={handleExportExcel} className={cx("btn btn-success")}>
            Xuất excel
          </button>
        </div>
      </div>
      <div className={cx("p-4")}>
        <div className={cx("d-flex")}>
          <Form
            name="basic"
            onFinish={onFinishSearchCustomer}
            autoComplete="off"
            className={cx("m-auto")}
          >
            <div className={cx("row ", "width_1000")}>
              <div className={cx("col-lg-3")}>
                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>
              </div>

              <div className={cx("col-lg-3")}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>
              </div>

              <div className={cx("col-lg-3")}>
                <Form.Item label="Họ và tên" name="username">
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("col-lg-3 ")}>
                <div className={cx("text-center")}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className={cx("w-75")}
                    >
                      Tìm
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div>
          <Table
            dataSource={listCustomer}
            columns={columns}
            onChange={handleTableChange}
            pagination={{
              current: current,
              pageSize: pageSize,
              total: total,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "15", "20"],
            }}
            bordered
          />
        </div>
      </div>

      <ModalEditCustomer
        isShowModalUpdateCustomer={isShowModalUpdateCustomer}
        setIsShowModalUpdateCustomer={setIsShowModalUpdateCustomer}
        dataModalUpdateCustomer={dataModalUpdateCustomer}
        setDataModalUpdateCustomer={setDataModalUpdateCustomer}
        getListCustomers={getListCustomers}
      />
      <ModalDeleteCustomer
        isShowModalDeleteCustomer={isShowModalDeleteCustomer}
        setIsShowModalDeleteCustomer={setIsShowModalDeleteCustomer}
        dataModalDeleteCustomer={dataModalDeleteCustomer}
        setDataModalDeleteCustomer={setDataModalDeleteCustomer}
        getListCustomers={getListCustomers}
      />
    </div>
  );
}

export default ListCustomer;
