import className from "classnames/bind";
import styles from "./ListCustomer.module.scss";
const cx = className.bind(styles);
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Space, Table, Tag, Input, Form, Button, Tabs } from "antd";

import moment from "moment";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";
import { AudioOutlined } from "@ant-design/icons";
import { IconList } from "@tabler/icons-react";

import CustomerService from "../../../../services/CustomerService";

import ModalEditCustomer from "../ModalEditCustomer";
import ModalDeleteCustomer from "../ModalDeleteCustomer";
import ModalCreateCustomer from "../ModalCreateCustomer";

function ListCustomer() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listCustomer, setListCustomer] = useState([]);
  const [role, setRole] = useState("khách hàng");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // modal update tour , delete tour , update processTour
  const [isShowModalUpdateCustomer, setIsShowModalUpdateCustomer] =
    useState(false);
  const [dataModalUpdateCustomer, setDataModalUpdateCustomer] = useState({});
  const [isShowModalDeleteCustomer, setIsShowModalDeleteCustomer] =
    useState(false);
  const [dataModalDeleteCustomer, setDataModalDeleteCustomer] = useState({});
  const [isShowModalCreateCustomer, setIsShowModalCreateCustomer] =
    useState(false);
  const [dataModalCreateCustomer, setDataModalCreateCustomer] = useState({});
  const handleModalUpdateCustomer = (data) => {
    setIsShowModalUpdateCustomer(true);
    setDataModalUpdateCustomer(data);
  };
  const handleModalDeleteCustomer = (data) => {
    setIsShowModalDeleteCustomer(true);
    setDataModalDeleteCustomer(data);
  };
  const handleModalCreateCustomer = () => {
    setIsShowModalCreateCustomer(true);
  };

  // Gọi API lấy dữ liệu
  const getListCustomers = async () => {
    try {
      const res = await CustomerService.readAll(`role=${role}`);
      console.log("res", res);

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
  }, [role]);

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
    const { phone, username, email } = values;
    try {
      const res = await CustomerService.readAll(
        `role=${role}&username=${username || ""}&email=${email || ""}&phone=${
          phone || ""
        }`
      );
      console.log("onFinishSearchCustomer", res);

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

  const handleExportExcel = async () => {
    alert("Xuat Excel");
  };
  const itemsTab = [
    {
      key: "khách hàng",
      label: "Khách hàng",
    },
    {
      key: "!khách hàng",
      label: "Nhân viên",
    },
  ];

  const onChangeTab = (key) => {
    console.log(key);
    setRole(key);
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
          <button
            onClick={handleExportExcel}
            className={cx("btn btn-warning text-white mx-1")}
          >
            Xuất excel
          </button>
          <button
            onClick={handleModalCreateCustomer}
            className={cx("btn btn-success mx-1")}
          >
            Thêm
          </button>
        </div>
      </div>
      <div className={cx("px-4")}>
        <Tabs defaultActiveKey="1" items={itemsTab} onChange={onChangeTab} />

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
      <ModalCreateCustomer
        isShowModalCreateCustomer={isShowModalCreateCustomer}
        setIsShowModalCreateCustomer={setIsShowModalCreateCustomer}
        getListCustomers={getListCustomers}
      />
    </div>
  );
}

export default ListCustomer;
