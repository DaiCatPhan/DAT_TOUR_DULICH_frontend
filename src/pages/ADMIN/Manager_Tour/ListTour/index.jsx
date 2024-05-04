import className from "classnames/bind";
import styles from "./ListTour.module.scss";
const cx = className.bind(styles);
import { Space, Button, Table, Tag, Modal, Input, Form } from "antd";
import { useEffect, useRef, useState } from "react";
import {
  IconEdit,
  IconPencilMinus,
  IconReload,
  IconTrash,
} from "@tabler/icons-react";
import { IconList } from "@tabler/icons-react";
import { Select } from "antd";

import ModalUpdateTour from "../components/ModalUpdateTour";
import ModalDeleteTour from "../components/ModalDeleteTour";
import ModalUPdateProcessTour from "../../Manager_ProcessTour/ModalUPdateProcessTour";

import TourService from "../../../../services/TourService";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import CategoryService from "../../../../services/CategoryService";

function ListTour() {
  const [pageSize, setPageSize] = useState(10);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listTour, setListTour] = useState([]);

  const [category_TYPE_TOUR, setCategory_TYPE_TOUR] = useState([]);
  const typeTour = category_TYPE_TOUR;

  const getCategorys = async () => {
    try {
      const TYPE_TOUR = await CategoryService.readAllCategory("type=TYPE_TOUR");
      if (TYPE_TOUR && TYPE_TOUR.data.EC == 0) {
        setCategory_TYPE_TOUR(TYPE_TOUR.data.DT.categories);
      }
    } catch (error) {
      console.log("error >>", error);
    }
  };

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
    getCategorys();
    getListTours();
  }, [current, pageSize]);

  const handleTableChange = (data) => {
    setCurrent(data.current);
    setPageSize(data.pageSize);
    setTotal(data.total);
  };

  const onFinishSearchTour = async (values) => {
    const { id, name, type } = values;
    const res = await TourService.getTours(
      `page=${current}&limit=${pageSize}&id=${id || ""}&name=${
        name || ""
      }&type=${type || ""}`
    );
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.tours.map((item) => ({
        ...item,
        key: item.id,
      }));

      setListTour(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  // search ant table
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columnsTour = [
    {
      title: "Mã Tour",
      dataIndex: "id",
      key: "id",
      ...getColumnSearchProps("id"),
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
      ...getColumnSearchProps("name"),
    },

    {
      title: "Thể loại",
      dataIndex: "type",
      key: "type",
      ...getColumnSearchProps("type"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return status == "1" ? (
          <div>Hoạt động</div>
        ) : (
          <div>Không hoạt động</div>
        );
      },
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
            {/* <IconTrash
              onClick={() => handleModalDeleteTour(record)}
              color="red"
              width={20}
              className={cx("poiter")}
            /> */}
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

  return (
    <div className={cx("border")}>
      <div
        className={cx(
          "title",
          "border d-flex align-items-center justify-content-between"
        )}
      >
        <div className={cx("d-flex align-items-center")}>
          <div>
            <IconList />
          </div>
          <div className={cx("mx-2")}>Danh sách tour du lịch</div>
        </div>
        <div>
          <IconReload
            className={cx("poiter", "text-primary")}
            onClick={() => {
              setCurrent(1);
              getListTours();
            }}
          />
        </div>
      </div>

      <div className={cx("p-4")}>
        <div className={cx("d-flex")}>
          <Form
            name="basic"
            onFinish={onFinishSearchTour}
            autoComplete="off"
            className={cx("m-auto")}
          >
            <div className={cx("row ", "width_1000")}>
              <div className={cx("col-lg-3")}>
                <Form.Item label="Mã tour" name="id">
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("col-lg-3")}>
                <Form.Item label="Tên tour" name="name">
                  <Input />
                </Form.Item>
              </div>
              <div className={cx("col-lg-3")}>
                <Form.Item label="Thể loại" name="type">
                  <Select placeholder="Chọn chủ đề ">
                    {typeTour?.map((item) => {
                      return (
                        <Select.Option value={item?.value} key={item?.id}>
                          {item?.value}
                        </Select.Option>
                      );
                    })}
                  </Select>
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
        setIsShowModalUpdateProcessTour={setIsShowModalUpdateProcessTour}
        dataModalUpdateProcessTour={dataModalUpdateProcessTour}
        setDataModalUpdateProcessTour={setDataModalUpdateProcessTour}
        getListTours={getListTours}
      />
    </div>
  );
}

export default ListTour;
