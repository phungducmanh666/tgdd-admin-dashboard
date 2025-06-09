import { Flex } from "antd";
import BrandPageBody from "./template/body/body";
import BrandPageFooter from "./template/footer/footer";
import BrandPageHeader from "./template/header/header";

interface CategoryPageProps {
  params: Promise<{ uid: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={20}>
      <BrandPageHeader />
      <BrandPageBody uid={uid} />
      <BrandPageFooter />
    </Flex>
  );
};

export default CategoryPage;
