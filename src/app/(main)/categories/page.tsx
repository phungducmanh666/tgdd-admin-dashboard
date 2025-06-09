import { Flex } from "antd";
import CategoriesPageBody from "./template/body/body";
import CategoriesPageHeader from "./template/header/header";

const CategoriesPage = () => {
  return (
    <Flex vertical gap={20}>
      <CategoriesPageHeader />
      <CategoriesPageBody />
    </Flex>
  );
};

export default CategoriesPage;
