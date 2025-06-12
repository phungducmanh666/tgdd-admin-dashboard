import { ProductLineDto } from "@dto/productLine/ProductLineDto";

export default class ProductLineMapper {
  static map(item: ProductLineDto): ProductLineDto {
    return {
      ...item,
    };
  }
}
