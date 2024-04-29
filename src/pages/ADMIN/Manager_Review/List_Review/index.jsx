import className from "classnames/bind";
import styles from "./List_Review.module.scss";
import { useEffect, useState } from "react";
const cx = className.bind(styles);
import { Button, DatePicker, Form, Input, Select, Table } from "antd";
import { Rate } from "antd";
import { Tag } from "antd";
import moment from "moment";
import { IconEdit } from "@tabler/icons-react";
import CommentService from "../../../../services/CommentService";

function List_Review() {
  const [listAllComment, setListAllComment] = useState([]);

  const getListAllComment = async () => {
    const res = await CommentService.readAll();
    if (res && res.data.EC == 0) {
      setListAllComment(res.data.DT);
    }
  };
  useEffect(() => {
    getListAllComment();
  }, []);

  const handleShow = (data) => {
    if (data === "1") {
      return <Tag color="blue">hiển thị</Tag>;
    } else if (data == "0") {
      return <Tag color="red">không hiển thị</Tag>;
    }
  };

  const onFinishSearchComment = async (values) => {
    const { star, nameTour, createdAt } = values;

    console.log("values", moment(createdAt?.$d).format("YYYY-MM-DD"));
    const createdAtCus = moment(createdAt?.$d).format("YYYY-MM-DD");

    const res = await CommentService.readAll(
      `star=${star || ""}&nameTour=${nameTour || ""}&createdAt=${
        createdAtCus || ""
      }`
    );
    if (res && res.data.EC == 0) {
      setListAllComment(res.data.DT);
    }

    try {
    } catch (error) {
      console.log("error >>", error);
    }
  };

  const columns = [
    {
      title: "khách hàng",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{data?.Customer?.username}</div>;
      },
    },
    {
      title: "số sao đánhg giá",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <Rate allowHalf defaultValue={data?.star} className={cx("star")} />
          </div>
        );
      },
    },
    {
      title: "đánh giá",
      dataIndex: "content",
      key: "content",
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
      title: "ngày đánh giá",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>{moment(data?.createdAt).format("DD-MM-YYYY, h:mm  a")}</div>
        );
      },
    },

    {
      title: "trạng thái",
      dataIndex: "",
      key: "",
      render: (data) => {
        return <div>{handleShow(data?.show)}</div>;
      },
    },

    {
      title: "Cập nhật",
      dataIndex: "",
      key: "",
      render: (data) => {
        return (
          <div>
            <IconEdit color="orange" />
          </div>
        );
      },
    },
  ];

  return (
    <div className={cx("wrapper")}>
      <div className={cx("border_665dfe")}>
        <div className={cx("border_b_665dfe", "p-2", "color_665dfe")}>
          <b>Danh sách đánh giá</b>
        </div>

        <div className={cx("p-2")}>
          <div>
            <Form name="basic" onFinish={onFinishSearchComment}>
              <div className={cx("d-flex   justify-between  ")}>
                <div className={cx("w-100")}>
                  <Form.Item label="Số sao đánh giá" name="star">
                    <Select placeholder="Chọn số sao đánh giá">
                      <Option value="5">5</Option>
                      <Option value="4">4</Option>
                      <Option value="3">3</Option>
                      <Option value="2">2</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </Form.Item>
                </div>

                <div className={cx("mx-2")}></div>

                <div className={cx("w-100")}>
                  <Form.Item label="Chọn tour" name="nameTour">
                    <Input />
                  </Form.Item>
                </div>
                <div className={cx("mx-2")}></div>

                <div className={cx("w-100")}>
                  <Form.Item label="Chọn ngày" name="createdAt">
                    <DatePicker className={cx("w-100")} />
                  </Form.Item>
                </div>
                <div className={cx("mx-2")}></div>

                <div className={cx("w-100")}>
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
            <Table dataSource={listAllComment} columns={columns} bordered />
          </div>
        </div>
      </div>
    </div>
  );
}

export default List_Review;
