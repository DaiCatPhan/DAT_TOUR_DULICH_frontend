import className from "classnames/bind";
import styles from "./ListVoucher.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { IconList, IconTrash, IconPencilMinus } from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { Button, Modal, Table, Input, Form, DatePicker } from "antd";
import { Tabs } from "antd";

import ModalCreateVoucher from "./component/ModalCreateVoucher";
import ModalDeleteVoucher from "./component/ModalDeleteVoucher";
import ModalUpdateVoucher from "./component/ModalUpdateVoucher";

import VoucherService from "../../../../services/VoucherService";
import Function from "../../../../components/Functions/function";

function ListVoucher() {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listVoucher, setListVoucher] = useState([]);
  const [tab, setTab] = useState("");

  // GOI API LAY LIST TOUR
  const getListVouchers = async () => {
    let condition = `page=${current}&limit=${pageSize}`;
    if (tab) {
      condition += `&${tab}`;
    }
    const res = await VoucherService.readAllVoucher(condition);

    if (res && res.data.EC == 0) {
      let cus = res.data.DT.vouchers.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListVoucher(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  useEffect(() => {
    getListVouchers();
  }, [current, pageSize, tab]);
  const [isShowModalUpdateVoucher, setIsShowModalUpdateVoucher] =
    useState(false);
  const [dataModalUpdateVoucher, setDataModalUpdateVoucher] = useState({});
  const [isShowModalDeleteVoucher, setIsShowModalDeleteVoucher] =
    useState(false);
  const [dataModalDeleteVoucher, setDataModalDeleteVoucher] = useState({});
  const [isShowModalCreateVoucher, setIsShowModalCreateVoucher] =
    useState(false);
  const [dataModalCreateVoucher, setDataModalCreateVoucher] = useState({});
  const handleModalUpdateVoucher = (data) => {
    setIsShowModalUpdateVoucher(true);
    setDataModalUpdateVoucher(data);
  };
  const handleModalDeleteVoucher = (data) => {
    setIsShowModalDeleteVoucher(true);
    setDataModalDeleteVoucher(data);
  };
  const handleModalCreateVoucher = async (data) => {
    setIsShowModalCreateVoucher(true);
    setDataModalCreateVoucher(data);
  };

  const onChangeTab = (key) => {
    setTab(key);
  };

  const onFinishFormSearch = async (values) => {
    const { title, createdAt } = values;
    const date_createdAt = createdAt?.$d;
    const res = await BlogService.readAllBlog(
      `title=${title || ""}&createdAt=${date_createdAt || ""}`
    );
    console.log("onFinishFormSearch", res);
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.blogs.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListBlog(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kiểu voucher",
      dataIndex: "typeVoucher",
      key: "typeVoucher",
    },
    {
      title: "Tên voucher",
      dataIndex: "nameVoucher",
      key: "nameVoucher",
    },
    {
      title: "Giá trị voucher",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Số lượng còn lại",
      dataIndex: "voucherRemaining",
      key: "voucherRemaining",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "fromDate",
      key: "fromDate",
      render: (data) => {
        return <div>{Function.formatDateMoment(data || 0)}</div>;
      },
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "toDate",
      key: "toDate",
      render: (data) => {
        return <div>{Function.formatDateMoment(data || 0)}</div>;
      },
    },
    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <IconTrash
              onClick={() => handleModalDeleteVoucher(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            />
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateVoucher(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border")}>
        <div
          className={cx(
            "title",
            "border d-flex justify-content-between align-items-center"
          )}
        >
          <div className={cx("d-flex")}>
            <div>
              <IconList />
            </div>
            <div className={cx("mx-2")}>Danh sách kiểu Voucher</div>
          </div>

          <div className={cx("mx-3")}>
            <button
              className={cx("btn btn-success")}
              onClick={handleModalCreateVoucher}
            >
              Thêm
            </button>
          </div>
        </div>
        <div className={cx("p-3")}>
          <div>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "",
                  label: "Tất cả",
                },
                {
                  key: "expired=true",
                  label: "Còn hạng sử dụng",
                },
                {
                  key: "expired=false",
                  label: "Hết hạng sử dụng",
                },
              ]}
              onChange={onChangeTab}
            />
          </div>
          <Table dataSource={listVoucher} columns={columns} bordered />
        </div>
      </div>
      <ModalCreateVoucher
        isShowModalCreateVoucher={isShowModalCreateVoucher}
        setIsShowModalCreateVoucher={setIsShowModalCreateVoucher}
        dataModalCreateVoucher={dataModalCreateVoucher}
        setDataModalCreateVoucher={setDataModalCreateVoucher}
        getListVouchers={getListVouchers}
      />
      <ModalUpdateVoucher
        isShowModalUpdateVoucher={isShowModalUpdateVoucher}
        setIsShowModalUpdateVoucher={setIsShowModalUpdateVoucher}
        dataModalUpdateVoucher={dataModalUpdateVoucher}
        setDataModalUpdateVoucher={setDataModalUpdateVoucher}
        getListVouchers={getListVouchers}
      />
      <ModalDeleteVoucher
        isShowModalDeleteVoucher={isShowModalDeleteVoucher}
        setIsShowModalDeleteVoucher={setIsShowModalDeleteVoucher}
        dataModalDeleteVoucher={dataModalDeleteVoucher}
        setDataModalDeleteVoucher={setDataModalDeleteVoucher}
        getListVouchers={getListVouchers}
      />
    </div>
  );
}

export default ListVoucher;
