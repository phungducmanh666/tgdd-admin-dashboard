import { VariantAttributeDto } from "@dto/variantAttribute/VariantAttributeDto";

export default class VariantAttributeMapper {
  static map(item: VariantAttributeDto): VariantAttributeDto {
    return {
      ...item,
    };
  }
}
