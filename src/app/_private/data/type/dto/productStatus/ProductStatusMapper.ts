import { ProductStatusDto } from "./ProductStatusDto";

export default class ProductStatusMapper {
  static map(item: ProductStatusDto): ProductStatusDto {
    return {
      ...item,
    };
  }
}
