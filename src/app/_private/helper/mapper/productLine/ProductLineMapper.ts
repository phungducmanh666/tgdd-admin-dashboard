import { ProductLineDto } from "@dto/productLine/productLine";

export default class ProductLineMapper {
  static map(item: ProductLineDto): ProductLineDto {
    return {
      ...item,
    };
  }
}
