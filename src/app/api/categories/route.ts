import { CategoryDto } from "@dto/category/CategoryDto";
import { FindAllDto } from "@dto/common/common";
import { delay } from "@helper/delay/delay";
import ApiResponse from "@helper/server/api/response/ApiResponse";
import CategoriesRepository from "./repository/CategoriesRepository";

export async function GET(request: Request) {
  await delay(1000);

  const categories = CategoriesRepository.FindAll();

  const responseData: FindAllDto<CategoryDto> = {
    data: categories,
    pagination: {
      totalItems: 1,
      currentPage: 1,
      itemsPerPage: 1,
      totalPages: 1,
    },
  };

  return new Response(ApiResponse.Ok(responseData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
