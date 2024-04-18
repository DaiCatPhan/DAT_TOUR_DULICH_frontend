import className from "classnames/bind";
import styles from "./ModalUPdateProcessTour.module.scss";
const cx = className.bind(styles);
import { toast } from "react-toastify";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

import { useEffect, useState } from "react";
import { Button, Modal } from "antd";

import ProcessService from "../../../../services/ProcessService";

function ModalUPdateProcessTour(props) {
  const {
    isShowModalUpdateProcessTour,
    setDataModalUpdateProcessTour,
    getListTours,
    dataModalUpdateProcessTour,
  } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [processTour_TEXT, setProcessTour_TEXT] = useState("");
  const [processTour_HTML, setProcessTour_HTML] = useState("");
  const [ID_Tour, setID_Tour] = useState(0);
  const [ID_ProcessTour, setID_ProcessTour] = useState(0);

  useEffect(() => {
    setProcessTour_TEXT(
      dataModalUpdateProcessTour?.ProcessTour?.descriptionTEXT
    );
    setProcessTour_HTML(
      dataModalUpdateProcessTour?.ProcessTour?.descriptionHTML
    );
    setID_ProcessTour(dataModalUpdateProcessTour?.ProcessTour?.id);
    setID_Tour(dataModalUpdateProcessTour?.id);
  }, [dataModalUpdateProcessTour]);

  function handleEditorChange_ProcessTour({ html, text }) {
    setProcessTour_HTML(html);
    setProcessTour_TEXT(text);
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    // Gọi API cập nhật chương trình Tour
    const data = {
      ID_Tour: ID_Tour,
      idProcessTour: ID_ProcessTour,
      descriptionHTML: processTour_HTML,
      descriptionTEXT: processTour_TEXT,
    };

    const res = await ProcessService.updateProcessTour(data);

    if (res && res.data.EC === 0) {
      toast.success(res.data.EM);
      getListTours();
    } else {
      toast.error(res.data.EM);
    }
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setDataModalUpdateProcessTour(false);
    setProcessTour_TEXT(
      dataModalUpdateProcessTour?.ProcessTour?.descriptionTEXT
    );
    setProcessTour_HTML(
      dataModalUpdateProcessTour?.ProcessTour?.descriptionHTML
    );
    setID_ProcessTour(dataModalUpdateProcessTour?.ProcessTour?.id);
    setID_Tour(dataModalUpdateProcessTour?.id);
  };
  return (
    <div className={cx("wrapper")}>
      <Modal
        title="Cập nhật thông tin chương trình tour "
        open={isShowModalUpdateProcessTour}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1350}
        style={{ top: 5 }}
      >
        <div>
          <div className={cx("row   w-100")}>
            <h5>{dataModalUpdateProcessTour?.name}</h5>
            <MdEditor
              style={{ minHeight: "550px", maxHeight: "750px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={handleEditorChange_ProcessTour}
              value={processTour_TEXT}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalUPdateProcessTour;
