import { Flex } from "antd";
import BrandsPageBody from "./template/body/body";
import BrandsPageHeader from "./template/header/header";

const BrandsPage = () => {
  return (
    <Flex vertical gap={20}>
      <BrandsPageHeader />
      <BrandsPageBody />
    </Flex>
  );
};

export default BrandsPage;
