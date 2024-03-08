# React + Vite

import className from "classnames/bind";
import styles from "./Register.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

const user = useSelector((state) => state.account.user);
const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
