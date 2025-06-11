import { AttributeGroupDto } from "@dto/attributeGroup/attributeGroup";

export default class AttributeGroupMapper {
  static map(attributeGroup: AttributeGroupDto): AttributeGroupDto {
    return {
      ...attributeGroup,
    };
  }
}
