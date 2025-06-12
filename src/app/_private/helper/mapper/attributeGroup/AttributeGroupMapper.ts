import { AttributeGroupDto } from "@dto/attributeGroup/attributeGroup";

export default class AttributeGroupMapper {
  static map(item: AttributeGroupDto): AttributeGroupDto {
    return {
      ...item,
    };
  }
}
