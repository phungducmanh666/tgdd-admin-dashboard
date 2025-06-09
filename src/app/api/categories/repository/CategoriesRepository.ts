import { CategoryDto } from "@dto/category/category";
import JsonIO from "@helper/json/JsonIO";
import path from "path";

export default class CategoriesRepository {
  static DBFilePath = path.join(process.cwd(), "/src/app/api/categories/db/data.json");
  static CategoriesData: CategoryDto[] | null = null;

  static GetAllData() {
    if (CategoriesRepository.CategoriesData) return;
    const filePath: string = CategoriesRepository.DBFilePath;
    CategoriesRepository.CategoriesData = JsonIO.ReadJson<CategoryDto[]>(filePath);
  }

  static FindAll(): CategoryDto[] {
    CategoriesRepository.GetAllData();
    return CategoriesRepository.CategoriesData || [];
  }
}
