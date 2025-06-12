import { CategoryDto } from "@dto/category/CategoryDto";
import PhotoUrlMapper from "../photoUrl/PhotoUrlMapper";

export default class CategoryMapper {
  static map(item: CategoryDto): CategoryDto {
    return {
      ...item,
      photoUrl: PhotoUrlMapper.map(item.photoUrl),
    };
  }
}
