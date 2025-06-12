import { BrandDto } from "@dto/brand/BrandDto";
import PhotoUrlMapper from "../photoUrl/PhotoUrlMapper";

export default class BrandMapper {
  static map(item: BrandDto): BrandDto {
    return {
      ...item,
      photoUrl: PhotoUrlMapper.map(item.photoUrl),
    };
  }
}
