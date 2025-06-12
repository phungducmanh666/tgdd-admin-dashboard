import { BrandDto } from "@dto/brand/BrandDto";
import PhotoUrlMapper from "../../../../helper/mapper/photoUrl/PhotoUrlMapper";

export default class BrandMapper {
  static map(item: BrandDto): BrandDto {
    return {
      ...item,
      photoUrl: PhotoUrlMapper.map(item.photoUrl),
    };
  }
}
