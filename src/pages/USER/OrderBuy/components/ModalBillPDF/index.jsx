import className from "classnames/bind";
import styles from "./ModalBillPDF.module.scss";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Canvas,
  Svg,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { Modal, Tag } from "antd";
const cx = className.bind(styles);
import moment from "moment";
import Funtion from "../../../../../components/Functions/function";

function ModalBillPDF(props) {
  const {
    isShowModalBillPDF,
    setIsShowModalBillPDF,
    dataModalBillPDF,
    setDataModalBillPDF,
  } = props;
  const { Calendar, Customer } = dataModalBillPDF;

  // Register font
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      padding: "16px 24px",
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      width: "100%",
    },

    header: {
      margin: "20px auto",
    },
    footer: {
      margin: "20px auto",
      fontSize: "15px",
    },

    table: {
      display: "table",
      width: "auto",
      border: "1px solid #bdbdbd",
      fontSize: "10px",
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
      borderBottom: "1px solid #bdbdbd",
    },
    tableCell: {
      borderRight: "1px solid #bdbdbd",
      padding: 8,
    },
    width_30: {
      width: "30%",
    },
    width_70: {
      width: "70%",
    },
  });

  const handleOk = async () => {};

  const handleCancel = () => {
    setIsShowModalBillPDF(false);
  };
  return (
    <div className={cx("wrapper")}>
      <div>
        <Modal
          open={isShowModalBillPDF}
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: "10px" }}
          className={cx("w-100")}
        >
          <PDFViewer style={{ width: "100%", height: "100vh" }}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View>
                  <Text style={styles.header}>ĐƠN ĐẶT TOUR</Text>

                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Họ và tên</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>{Customer?.username}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Email</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>{Customer?.email}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Số điện thoại</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>{Customer?.phone}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>TOUR</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>{Calendar?.Tour?.name}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Giá tour người lớn</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>
                          {Funtion.formatNumberWithCommas(Calendar?.priceAdult)}{" "}
                          vnd
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Giá tour trẻ em</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>
                          {Funtion.formatNumberWithCommas(Calendar?.priceChild)}
                          vnd
                        </Text>
                      </View>
                    </View>

                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Số lượt đặt </Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>
                          người lớn : {dataModalBillPDF?.numberTicketAdult}
                        </Text>
                        <Text>
                          trẻ em : {dataModalBillPDF?.numberTicketChild}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Trạng thái thanh toán</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>{dataModalBillPDF.payment_status}</Text>
                      </View>
                    </View>
                    <View style={styles.tableRow}>
                      <View style={[styles.tableCell, styles.width_30]}>
                        <Text>Tổng tiền</Text>
                      </View>
                      <View style={[styles.tableCell, styles.width_70]}>
                        <Text>
                          {Funtion.formatNumberWithCommas(
                            dataModalBillPDF?.total_money
                          )}{" "}
                          vnd
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.footer}>
                    Cám ơn Quý khách đã tin tưởng và trải nghiệm tour du lịch của chúng tôi!
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </Modal>
      </div>
    </div>
  );
}

export default ModalBillPDF;
