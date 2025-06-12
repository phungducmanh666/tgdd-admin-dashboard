import { VariantOptionDto } from "@dto/variantOption/VariantOptionDto";

export default class VariantOptionMapper {
  static map(item: VariantOptionDto): VariantOptionDto {
    return {
      ...item,
    };
  }
}
