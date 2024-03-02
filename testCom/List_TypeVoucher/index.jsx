import className from "classnames/bind";
import styles from "./List_TypeVoucher.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);
import { IconList, IconTrash, IconPencilMinus } from "@tabler/icons-react";

import { useEffect, useState } from "react";
import { Button, Modal, Table, Input, Form, DatePicker } from "antd";

import ModalCreateTypeVoucher from "./component/ModalCreateTypeVoucher";
import ModalDeleteTypeVoucher from "./component/ModalDeleteTypeVoucher";
import ModalUpdateTypeVoucher from "./component/ModalUpdateTypeVoucher";

function List_TypeVoucher() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listTypeVoucher, setListTypeVoucher] = useState([]);

  // GOI API LAY LIST TOUR
  const getListTypeVouchers = async () => {
    const res = await BlogService.readAllBlog(
      `page=${current}&limit=${pageSize}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.typevouchers.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListTypeVoucher(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  // useEffect(() => {
  //   getListTypeVouchers();
  // }, [current, pageSize]);
  const [isShowModalUpdateTypeVoucher, setIsShowModalUpdateTypeVoucher] =
    useState(false);
  const [dataModalUpdateTypeVoucher, setDataModalUpdateTypeVoucher] = useState(
    {}
  );
  const [isShowModalDeleteTypeVoucher, setIsShowModalDeleteTypeVoucher] =
    useState(false);
  const [dataModalDeleteTypeVoucher, setDataModalDeleteTypeVoucher] = useState(
    {}
  );
  const [isShowModalCreateTypeVoucher, setIsShowModalCreateTypeVoucher] =
    useState(false);
  const [dataModalCreateTypeVoucher, setDataModalCreateTypeVoucher] = useState(
    {}
  );
  const handleModalUpdateTypeVoucher = (data) => {
    setIsShowModalUpdateTypeVoucher(true);
    setDataModalUpdateTypeVoucher(data);
  };
  const handleModalDeleteTypeVoucher = (data) => {
    setIsShowModalDeleteTypeVoucher(true);
    setDataModalDeleteTypeVoucher(data);
  };
  const handleModalCreateTypeVoucher = async () => {
    setIsShowModalCreateTypeVoucher(true);
    setDataModalCreateTypeVoucher(data);
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
    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <IconTrash
              onClick={() => handleModalDeleteTypeVoucher(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            />
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateTypeVoucher(record)}
              color="orange"
              width={20}
              className={cx("poiter")}
            />
          </div>
        );
      },
    },
  ];

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

          <div>
            <button
              className={cx("btn btn-success")}
              onClick={handleModalCreateTypeVoucher}
            >
              Tạo kiểu voucher
            </button>
          </div>
        </div>
        <div className={cx("p-3")}>
          <Table dataSource={dataSource} columns={columns} bordered />
        </div>
      </div>
      <ModalCreateTypeVoucher
        isShowModalCreateTypeVoucher={isShowModalCreateTypeVoucher}
        setIsShowModalCreateTypeVoucher={setIsShowModalCreateTypeVoucher}
        dataModalCreateTypeVoucher={dataModalCreateTypeVoucher}
        setDataModalCreateTypeVoucher={setDataModalCreateTypeVoucher}
        getListTypeVouchers={getListTypeVouchers}
      />
      <ModalUpdateTypeVoucher
        isShowModalUpdateTypeVoucher={isShowModalUpdateTypeVoucher}
        setIsShowModalUpdateTypeVoucher={setIsShowModalUpdateTypeVoucher}
        dataModalUpdateTypeVoucher={dataModalUpdateTypeVoucher}
        setDataModalUpdateTypeVoucher={setDataModalUpdateTypeVoucher}
        getListTypeVouchers={getListTypeVouchers}
      />
      <ModalDeleteTypeVoucher
        isShowModalDeleteTypeVoucher={isShowModalDeleteTypeVoucher}
        setIsShowModalDeleteTypeVoucher={setIsShowModalDeleteTypeVoucher}
        dataModalDeleteTypeVoucher={dataModalDeleteTypeVoucher}
        setDataModalDeleteTypeVoucher={setDataModalDeleteTypeVoucher}
        getListTypeVouchers={getListTypeVouchers}
      />
    </div>
  );
}

export default List_TypeVoucher;
