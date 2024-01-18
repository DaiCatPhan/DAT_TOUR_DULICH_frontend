import { Alert, Flex, Spin } from "antd";
function Spinn() {
  return (
    <Flex gap="small" vertical>
      <Spin tip="Loading...">
        <Alert
          style={{ height: "50px" }}
          message="Đang tiến hành upload hình ảnh"
          type="info"
        />
      </Spin>
    </Flex>
  );
}

export default Spinn;
