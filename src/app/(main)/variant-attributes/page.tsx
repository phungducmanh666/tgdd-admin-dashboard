import { Flex } from "antd";
import VariantAttributesPageBody from "./template/body/body";
import VariantAttributesPageHeader from "./template/header/header";

const BrandsPage = () => {
  return (
    <Flex vertical gap={20}>
      <VariantAttributesPageHeader />
      <VariantAttributesPageBody />
    </Flex>
  );
};

export default BrandsPage;
