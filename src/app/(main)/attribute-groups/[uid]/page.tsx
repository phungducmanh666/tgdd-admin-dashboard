import { Flex } from "antd";
import AttributeGroupPageBody from "./template/body/body";
import AttributeGroupPageHeader from "./template/header/header";

interface AttributeGroupPageProps {
  params: Promise<{ uid: string }>;
}

const AttributeGroupPage = async ({ params }: AttributeGroupPageProps) => {
  const { uid } = await params;
  return (
    <Flex vertical gap={20}>
      <AttributeGroupPageHeader uid={uid} />
      <AttributeGroupPageBody uid={uid} />
    </Flex>
  );
};

export default AttributeGroupPage;
