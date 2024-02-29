import className from "classnames/bind";
import styles from "./Blog.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";
import { Link } from "react-router-dom";
function Blog() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("row my-5")}>
          <div className={cx("col-lg-8 ", "blogID")}>
            <div className={cx("  px-5")}>
              <img
                src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="notFound"
                className={cx("w-100")}
                height={400}
              />
              <div className={cx("title")}>
                Cuộc sống an nhiên trong show thời trang của Xuân Lan
              </div>
              <div className={cx("desCom")}>phan dai cat | 4 bài luận</div>
              <div className={cx("content")}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
                repellat ad dolor repellendus, doloremque quod officiis illum!
                Veniam minima aliquam vero molestiae ipsa non, sunt maxime
                dignissimos, accusamus laborum odit! Dolores doloribus
                doloremque quo omnis aliquid nostrum. Dolorem beatae reiciendis
                non et nobis dolor voluptatibus eum. Veniam alias sint ullam
                adipisci doloribus perferendis accusamus quibusdam ea?
                Distinctio aut omnis facilis!
              </div>
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
                <Link>
                  <div className={cx("d-flex border rounded mb-3 p-2")}>
                    <div>
                      <img
                        src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="notFound"
                        height={90}
                        width={90}
                        className={cx("rounded")}
                      />
                    </div>
                    <div className={cx("mx-2")}>
                      <div className={cx("titleCard")}>
                        Tin tuc rao ban du lieu Tin tuc rao ban du lieuTin tuc
                        rao ban du lieu Tin tuc rao ban du lieu Tin tuc rao ban
                        du lieuTin tuc rao ban du lieu lieuTin tuc rao ban du
                        lieu
                      </div>
                      <div className={cx("date")}>12/3/2024</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
