import { Flex } from "antd";
import CategoryPageBody from "./template/body/body";
import CategoryPageFooter from "./template/footer/footer";
import CategoryPageHeader from "./template/header/header";

interface CategoryPageProps {
  params: Promise<{ uid: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={20}>
      <CategoryPageHeader />
      <CategoryPageBody uid={uid} />
      <CategoryPageFooter uid={uid} />
    </Flex>
  );
};

export default CategoryPage;
