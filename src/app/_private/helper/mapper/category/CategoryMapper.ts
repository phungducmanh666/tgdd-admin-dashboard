import { CategoryDto } from "@dto/category/category";
import PhotoUrlMapper from "../photoUrl/PhotoUrlMapper";

export default class CategoryMapper {
  static map(category: CategoryDto): CategoryDto {
    return {
      ...category,
      photoUrl: PhotoUrlMapper.map(category.photoUrl),
    };
  }
}
