import className from "classnames/bind";
import styles from "./Blog.module.scss";
const cx = className.bind(styles);
import { IconList } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { Input, Rate, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IconUserCircle } from "@tabler/icons-react";

import CommentService from "../../../services/CommentService";

const { TextArea } = Input;
function Blog() {
  let { id } = useParams();
  const user = useSelector((state) => state.account.user);
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const [content, setContent] = useState("");
  const [star, setStar] = useState("");
  const [listCommentLog, setListCommentLog] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getListCommentBLog = async () => {
    if (!id) {
      return toast.error("ID bài đăng không tồn tại !!!");
    }
    const res = await CommentService.readAll_CMB_Log(`id=${id}`);
    if (res && res.data.EC == 0) {
      setListCommentLog(res.data.DT);
    } else {
      console.log("res");
    }
  };

  useEffect(() => {
    getListCommentBLog();
  }, []);

  const handleStar = async (number) => {
    setStar(number);
  };
  const handleContent = async (e) => {
    setContent(e.target.value);
  };

  const handleCommentBlog = async () => {
    if (!user?.id && !isAuthenticated) {
      return toast.error("Bạn cần phải đăng nhập để bình luận !!!");
    }

    const data = {
      ID_Customer: user?.id,
      ID_Blog: id,
      content: content,
      star: star,
    };

    const res = await CommentService.createComment(data);
    if (res && res.data.EC == 0) {
      messageApi.open({
        type: "success",
        content: "Bình luận của bạn đã được gởi đi",
      });
      getListCommentBLog();
    } else {
      messageApi.open({
        type: "error",
        content: `${res.data.EM}`,
      });
    }
  };

  const Comment = ({ comment }) => {
    return (
      <div className={cx("comment")}>
        <div>
          <div className={cx("d-flex align-items-center")}>
            <div className={cx("imageName")}>T</div>
            <div>
              <div>
                <div> {comment?.customer?.username}</div>
                <div>
                  <Rate value={3} style={{ fontSize: "12px" }} />
                </div>
                <div>{comment?.createdAt}</div>
              </div>
            </div>
          </div>
          <div className={cx("content")}>{comment?.content}</div>
        </div>

        {comment.childComment && comment.childComment.length > 0 && (
          <div className={cx("replies")}>
            {comment.childComment.map((reply) => (
              <Comment key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const CommentsList = ({ comments }) => {
    return (
      <div className={cx("comments-list")}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  };

  return (
    <div className={cx("wrapper")}>
      {contextHolder}
      <div className={cx("container")}>
        <div className={cx("row my-5")}>
          <div className={cx("col-lg-8 ", "blogID")}>
            <div className={cx("px-5")}>
              <div>
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
                  doloremque quo omnis aliquid nostrum. Dolorem beatae
                  reiciendis non et nobis dolor voluptatibus eum. Veniam alias
                  sint ullam adipisci doloribus perferendis accusamus quibusdam
                  ea? Distinctio aut omnis facilis!
                </div>
              </div>
              <div className={cx("my-4")}>
                <div>Viết đánh giá của bạn</div>
                <div>
                  <TextArea rows={4} onChange={handleContent} />
                </div>

                <div className={cx("d-flex justify-content-between mt-1")}>
                  <div>
                    <Rate onChange={handleStar} />
                  </div>
                  <div>
                    <button
                      className={cx("btn btn-primary")}
                      onClick={handleCommentBlog}
                    >
                      Đăng
                    </button>
                  </div>
                </div>
              </div>

              <div className={cx("listComment")}>
                <CommentsList comments={listCommentLog} />
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
