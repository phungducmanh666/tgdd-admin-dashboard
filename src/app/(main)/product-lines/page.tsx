import { Flex } from "antd";
import ProductLinesPageBody from "./template/body/body";
import ProductLinesPageHeader from "./template/header/header";

const BrandsPage = () => {
  return (
    <Flex vertical gap={20}>
      <ProductLinesPageHeader />
      <ProductLinesPageBody />
    </Flex>
  );
};

export default BrandsPage;
