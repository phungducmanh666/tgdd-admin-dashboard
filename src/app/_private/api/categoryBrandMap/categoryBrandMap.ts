import { BrandDto } from "@dto/brand/brand";
import { CategoryBrandMapDto } from "@dto/categoryBrandMap/categoryBrandMap";
import { FindAllDto, OrderDirection } from "@dto/common/common";
import CategoryMapper from "@helper/mapper/category/CategoryMapper";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import ApiClient from "../api-client";

type FindAllPrams = {
  isBelong: boolean;
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
};

export default class CategoryBrandMapApi {
  static GenerateLinkFindAll(categoryUid: string, { isBelong, currentPage, itemsPerPage, orderField, orderDirection }: FindAllPrams): string {
    const requestParams = new URLSearchParams({
      isBelong: String(isBelong),
      currentPage: currentPage.toString(),
      itemsPerPage: itemsPerPage.toString(),
      orderField: orderField,
      orderDirection: orderDirection.toString(),
    });
    return ApiClient.GetUrl(`/categories/${categoryUid}/brands?${requestParams.toString()}`);
  }
  static GenerateLink(categoryUid: string, brandUid: string): string {
    return ApiClient.GetUrl(`/categories/${categoryUid}/brands/${brandUid}`);
  }

  static async Insert(categoryUid: string, brandUid: string): Promise<CategoryBrandMapDto> {
    const categoryBrandMap = {
      categoryUid,
      brandUid,
    };
    const response = await fetch(CategoryBrandMapApi.GenerateLink(categoryUid, brandUid), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryBrandMap),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<CategoryBrandMapDto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }

  static async FindAllBrands(categoryUid: string, params: FindAllPrams): Promise<FindAllDto<BrandDto>> {
    const response = await fetch(CategoryBrandMapApi.GenerateLinkFindAll(categoryUid, params));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<BrandDto>>;
      const { data, pagination } = metadata!;
      let dataMapped = data.map((item) => CategoryMapper.map(item));
      return { data: dataMapped, pagination };
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }

  static async Delete(categoryUid: string, brandUid: string): Promise<number> {
    const response = await fetch(CategoryBrandMapApi.GenerateLink(categoryUid, brandUid), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<number>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
