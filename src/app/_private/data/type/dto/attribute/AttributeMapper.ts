import { AttributeDto } from "@dto/attribute/AttributeDto";

export default class AttributeMapper {
  static map(item: AttributeDto): AttributeDto {
    return {
      ...item,
    };
  }
}
