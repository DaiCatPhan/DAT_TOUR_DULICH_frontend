import className from "classnames/bind";
import styles from "./Blog.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";

import BlogService from "../../../services/BlogService";

function Blog() {
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(20);
  const [listBlog, setlistBlog] = useState([]);

  // GOI API LAY LIST TOUR
  const getListTours = async () => {
    const res = await BlogService.readAllBlog();
    if (res && res.data.EC == 0) {
      let cus = res.data.DT.blogs.map((item) => ({
        ...item,
        key: item.id,
      }));

      setlistBlog(cus);
      setTotal(res.data.DT.totalRows);
    }
  };

  useEffect(() => {
    getListTours();
  }, [current, pageSize]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("row my-5")}>
          <div className={cx("col-lg-8  ", "blogID")}>
            <div className={cx("px-5")}>
              {/* Blog */}
              {listBlog?.map((item) => {
                return (
                  <div className={cx("border mb-5")}>
                    <img src={item?.image} alt="notFound" />
                    <div className={cx("p-2")}>
                      <div className={cx("title")}>
                        Cuộc sống an nhiên trong show thời trang của Xuân Lan
                      </div>
                      <div className={cx("content")}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Modi repellat ad dolor repellendus, doloremque quod
                        officiis illum! Veniam minima aliquam vero molestiae
                        ipsa non, sunt maxime dignissimos Lorem ipsum dolor sit
                        amet consectetur adipisicing elit. Modi repellat ad
                        dolor repellendus, doloremque quod officiis illum!
                        Veniam minima aliquam vero molestiae ipsa non, sunt
                        maxime dignissimos
                      </div>
                      <div className={cx("desCom")}>
                        <div> admin | 4 bài luận</div>
                        <div>
                          {moment(item?.createdAt).format("DD-MM-YYYY")}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={cx("col-lg-4", "cardBlog")}>
            <div className={cx("border")}>
              <div
                className={cx(
                  "border d-flex justify-content-between align-items-center",
                  "title"
                )}
              >
                <div className={cx("d-flex")}>
                  <div>
                    <IconList />
                  </div>
                  <div className={cx("mx-2")}>Bài viết nổi bật</div>
                </div>
              </div>
              <div className={cx("p-3")}>
                {listBlog?.map((item) => {
                  return (
                    <Link to={`/tours/blogs/${item?.id}`}>
                      <div className={cx("d-flex border rounded mb-3 p-2")}>
                        <div>
                          <img
                            src={item?.image}
                            alt="notFound"
                            height={90}
                            width={90}
                            className={cx("rounded")}
                          />
                        </div>
                        <div className={cx("mx-2")}>
                          <div className={cx("titleCard")}>
                            Tin tuc rao ban du lieu Tin tuc rao ban du lieuTin
                            tuc rao ban du lieu Tin tuc rao ban du lieu Tin tuc
                            rao ban du lieuTin tuc rao ban du lieu lieuTin tuc
                            rao ban du lieu
                          </div>
                          <div className={cx("date")}>12/3/2024</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
