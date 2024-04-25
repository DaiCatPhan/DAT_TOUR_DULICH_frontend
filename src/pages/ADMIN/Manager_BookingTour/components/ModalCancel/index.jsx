import className from "classnames/bind";
import styles from "./ModalCancel.module.scss";
const cx = className.bind(styles);

import { toast } from "react-toastify";
import { Button, Modal } from "antd";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Result, Typography } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import BookingService from "../../../../../services/BookingService";

function ModalCancel(props) {
  const {
    isShowModalCancel,
    setIsShowModalCancel,
    dataModalCancel,
    setDataModalCancel,
    listCalendarWithTour,
    submit,
  } = props;

  const [reason_TEXT, setReason_TEXT] = useState("");
  const [reason_HTML, setReason_HTML] = useState("");

  const [confirmLoading, setConfirmLoading] = useState(false);
  function convertTextToHTML(text) {
    // Xử lý các định dạng đặc biệt của văn bản và chuyển đổi thành HTML
    // Ví dụ: chuyển đổi các dấu * thành thẻ <strong>
    const html = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    return html;
  }
  useEffect(() => {
    setReason_TEXT(`Tiếc rằng chúng tôi phải gửi thông báo này đến quý khách. Chúng tôi muốn thông báo rằng do lịch đăng ký của tour 

  **${listCalendarWithTour?.name}** 
  
  **${moment(dataModalCancel?.startDay).format("DD-MM-YYYY")} / ${moment(
      dataModalCancel?.startDay
    ).format("DD-MM-YYYY")}** 

    
  của quý khách không đạt đủ số lượng người cần thiết, vì vậy chúng tôi buộc phải hủy tour đó.
    
  Chúng tôi hiểu rằng điều này có thể gây không tiện cho kế hoạch của quý khách và **xin chân thành xin lỗi về sự bất tiện này**. Để đền bù cho sự phiền toái này, chúng tôi muốn đề xuất hai lựa chọn cho quý khách:
        
  **Chuyển Tour**: Quý khách có thể chọn chuyển sang một tour khác trong danh sách tour của chúng tôi, nếu có sẵn. Chúng tôi sẽ hỗ trợ quý khách trong quá trình chuyển đổi này và cung cấp thông tin chi tiết về các tour khác.
        
  **Hoàn Tiền**: Nếu quý khách không muốn chuyển sang tour khác, chúng tôi sẽ hoàn lại toàn bộ số tiền đã thanh toán cho tour bị hủy.
  Xin vui lòng liên hệ với chúng tôi qua số điện thoại hoặc email được cung cấp trong thông báo này để thông báo về lựa chọn của quý khách hoặc nếu có bất kỳ câu hỏi nào khác. Chúng tôi sẽ làm hết sức mình để giúp đỡ và đảm bảo rằng quý khách có trải nghiệm du lịch tốt nhất có thể.
        
  **Một lần nữa, chúng tôi thành thật xin lỗi về sự bất tiện này và hy vọng nhận được sự hiểu thông cảm từ phía quý khách.** `);

    const convertedHTML = convertTextToHTML(reason_TEXT);
    setReason_HTML(convertedHTML);
  }, [listCalendarWithTour, dataModalCancel]);

  const handleOk = async () => {
    submit({
      reason_TEXT: reason_TEXT,
      reason_HTML: reason_HTML,
    });

    handleCancel();
  };
  const handleCancel = () => {
    setIsShowModalCancel(false);
    setDataModalCancel({});
  };
  function handleReason({ html, text }) {
    setReason_HTML(html);
    setReason_TEXT(text);
  }

  return (
    <div className={cx("wrapper")}>
      <Modal
        title={
          <div className={cx("text-danger")}>
            HỦY TOUR VÀ GỬI THÔNG BÁO CHUYỂN TOUR CHO KHÁCH HÀNG
          </div>
        }
        open={isShowModalCancel}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        style={{ top: "10px" }}
        width={1000}
      >
        <div>
          <div className={cx("d-flex")}>
            <div>TOUR : </div>
            <div className={cx("mx-1")}></div>
            <div>
              <b>{listCalendarWithTour?.name}</b>
            </div>
          </div>
          <div className={cx("d-flex")}>
            <div>LỊCH : </div>
            <div className={cx("mx-2")}></div>
            <div>
              <b>{moment(dataModalCancel?.startDay).format("DD-MM-YYYY")}</b>
            </div>
            <div className={cx("mx-2")}>/</div>
            <div>
              <b>{moment(dataModalCancel?.endDay).format("DD-MM-YYYY")}</b>
            </div>
          </div>

          <div>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleReason}
              value={reason_TEXT}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCancel;
