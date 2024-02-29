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
import { Button, Modal } from "antd";
import { Space, Table, Tag } from "antd";
function List_TypeVoucher() {
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
              // onClick={handleModalCreateBlog}
            >
              Tạo kiểu voucher
            </button>
          </div>
        </div>
        <div className={cx("p-3")}>
          <Table dataSource={dataSource} columns={columns} bordered />
        </div>
      </div>
    </div>
  );
}

export default List_TypeVoucher;
