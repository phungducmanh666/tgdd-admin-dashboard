import { Flex } from "antd";
import BrandsPageBody from "./template/body/body";
import ProductStatusPageHeader from "./template/header/header";

const BrandsPage = () => {
  return (
    <Flex vertical gap={20}>
      <ProductStatusPageHeader />
      <BrandsPageBody />
    </Flex>
  );
};

export default BrandsPage;
