# React + Vite

 

import className from "classnames/bind";
import styles from "./Register.module.scss";
const cx = className.bind(styles);


const user = useSelector((state) => state.account.user);
const isAuthenticated = useSelector((state) => state.account.isAuthenticated);