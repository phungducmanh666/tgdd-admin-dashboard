import { Flex } from "antd";
import VariantAttributesPageBody from "./template/body/body";
import VariantAttributePageHeader from "./template/header/header";

interface AttributeGroupPageProps {
  params: Promise<{ uid: string }>;
}

const AttributeGroupPage = async ({ params }: AttributeGroupPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={20}>
      <VariantAttributePageHeader uid={uid} />
      <VariantAttributesPageBody uid={uid} />
    </Flex>
  );
};

export default AttributeGroupPage;
