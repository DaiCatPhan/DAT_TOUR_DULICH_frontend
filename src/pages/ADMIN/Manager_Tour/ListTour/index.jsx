import className from "classnames/bind";
import styles from "./ListTour.module.scss";
const cx = className.bind(styles);
import { Space, Table, Tag, Modal } from "antd";
import { useEffect, useState } from "react";
import { IconEdit, IconPencilMinus, IconTrash } from "@tabler/icons-react";

import ModalUpdateTour from "../components/ModalUpdateTour";
import ModalDeleteTour from "../components/ModalDeleteTour";
import ModalUPdateProcessTour from "../../Manager_ProcessTour/ModalUPdateProcessTour";

import TourService from "../../../../services/TourService";
import { Link } from "react-router-dom";

function ListTour() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listTour, setListTour] = useState([]);

  // modal update tour , delete tour , update processTour
  const [isShowModalUpdateTour, setIsShowModalUpdateTour] = useState(false);
  const [dataModalUpdateTour, setDataModalUpdateTour] = useState({});
  const [isShowModalDeleteTour, setIsShowModalDeleteTour] = useState(false);
  const [dataModalDeleteTour, setDataModalDeleteTour] = useState({});
  const [isShowModalUpdateProcessTour, setIsShowModalUpdateProcessTour] =
    useState(false);
  const [dataModalUpdateProcessTour, setDataModalUpdateProcessTour] = useState(
    {}
  );

  const handleModalUpdateTour = (data) => {
    setIsShowModalUpdateTour(true);
    setDataModalUpdateTour(data);
  };
  const handleModalDeleteTour = (data) => {
    setIsShowModalDeleteTour(true);
    setDataModalDeleteTour(data);
  };
  const handleModalUpdateProcessTour = (data) => {
    setIsShowModalUpdateProcessTour(true);
    setDataModalUpdateProcessTour(data);
  };

  // GOI API LAY LIST TOUR
  const getListTours = async () => {
    const res = await TourService.getTours(`page=${current}&limit=${pageSize}`);
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.tours.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  useEffect(() => {
    getListTours();
  }, [current, pageSize]);

  const columnsTour = [
    {
      title: "Mã Tour",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ảnh tour ",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Image"
          style={{ width: "100px", height: "100px" }}
        />
      ),
    },
    {
      title: "Tên Tour",
      dataIndex: "name",
      key: "name",
      render: (name) => {
        return <div>{name}</div>;
      },
    },

    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Chương trình tour",
      dataIndex: "",
      key: "managerProcessTour",
      render: (managerProcessTour) => {
        return (
          <div className={cx("poiter")}>
            <Tag
              onClick={() => handleModalUpdateProcessTour(managerProcessTour)}
              color="geekblue"
            >
              chương trình tour
            </Tag>
          </div>
        );
      },
    },

    {
      title: "Lịch",
      dataIndex: "",
      key: "managerCalendar",
      render: (managerCalendar) => {
        return (
          <Link to={`/admin/managerCalendar/${managerCalendar?.id}`}>
            <Tag color="purple">cập nhật lịch</Tag>
          </Link>
        );
      },
    },

    {
      title: "Action",

      key: "Action",
      render: (record) => {
        return (
          <div className={cx("poiter d-flex")}>
            <IconTrash
              onClick={() => handleModalDeleteTour(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            />
            <div className={cx("m-2")}></div>
            <IconPencilMinus
              onClick={() => handleModalUpdateTour(record)}
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

  return (
    <div>
      <div>List Tour</div>
      <div></div>
      <div>
        <Table
          dataSource={listTour}
          columns={columnsTour}
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
      <ModalUpdateTour
        isShowModalUpdateTour={isShowModalUpdateTour}
        setIsShowModalUpdateTour={setIsShowModalUpdateTour}
        dataModalUpdateTour={dataModalUpdateTour}
        setDataModalUpdateTour={setDataModalUpdateTour}
        getListTours={getListTours}
      />
      <ModalDeleteTour
        isShowModalDeleteTour={isShowModalDeleteTour}
        setIsShowModalDeleteTour={setIsShowModalDeleteTour}
        dataModalDeleteTour={dataModalDeleteTour}
        setDataModalDeleteTour={setDataModalDeleteTour}
        getListTours={getListTours}
      />
      <ModalUPdateProcessTour
        isShowModalUpdateProcessTour={isShowModalUpdateProcessTour}
        setDataModalUpdateProcessTour={setIsShowModalUpdateProcessTour}
        dataModalUpdateProcessTour={dataModalUpdateProcessTour}
        getListTours={getListTours}
      />
    </div>
  );
}

export default ListTour;
