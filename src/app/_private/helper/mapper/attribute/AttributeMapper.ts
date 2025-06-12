import { AttributeDto } from "@dto/attribute/attribute";

export default class AttributeMapper {
  static map(item: AttributeDto): AttributeDto {
    return {
      ...item,
    };
  }
}
