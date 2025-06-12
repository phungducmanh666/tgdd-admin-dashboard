import { AttributeGroupDto } from "@dto/attributeGroup/AttributeGroupDto";

export default class AttributeGroupMapper {
  static map(item: AttributeGroupDto): AttributeGroupDto {
    return {
      ...item,
    };
  }
}
