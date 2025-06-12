import { CategoryDto } from "@dto/category/CategoryDto";
import PhotoUrlMapper from "../../../../helper/mapper/photoUrl/PhotoUrlMapper";

export default class CategoryMapper {
  static map(item: CategoryDto): CategoryDto {
    return {
      ...item,
      photoUrl: PhotoUrlMapper.map(item.photoUrl),
    };
  }
}
