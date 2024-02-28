import className from "classnames/bind";
import styles from "./List_TypeVoucher.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
function List_TypeVoucher() {
  return <div className={cx("wrapper")}>List_TypeVoucher</div>;
}

export default List_TypeVoucher;
