import { BrandDto } from "@dto/brand/BrandDto";
import BrandMapper from "@dto/brand/BrandMapper";
import { FindAllDto } from "@dto/common/common";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import { FindAllPaginationProps } from "../../data/props/ApiProps";
import ApiClient from "../api-client";

interface Dto extends BrandDto {}
const Mapper = BrandMapper;

export default class CategoryBrandMapApi {
  static GenerateLinkFindAll(categoryUid: string, isBelong: boolean, findAllParams?: FindAllPaginationProps): string {
    const requestParams = new URLSearchParams({
      isBelong: String(isBelong),
    });
    if (findAllParams) {
      const { currentPage, itemsPerPage, orderField, orderDirection } = findAllParams;
      requestParams.append("currentPage", String(currentPage));
      requestParams.append("itemsPerPage", String(itemsPerPage));
      requestParams.append("orderField", String(orderField));
      requestParams.append("orderDirection", String(orderDirection));
    }
    return ApiClient.GetUrl(`/categories/${categoryUid}/brands?${requestParams.toString()}`);
  }
  static GenerateLink(categoryUid: string, brandUid: string): string {
    return ApiClient.GetUrl(`/categories/${categoryUid}/brands/${brandUid}`);
  }

  static async Insert(categoryUid: string, brandUid: string): Promise<Dto> {
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
      const data = (await response.json()) as ApiSuccessResponse<Dto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }

  static async FindAllBrands(categoryUid: string, isBelong: boolean, params?: FindAllPaginationProps): Promise<FindAllDto<BrandDto>> {
    const response = await fetch(CategoryBrandMapApi.GenerateLinkFindAll(categoryUid, isBelong, params));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<BrandDto>>;
      const { data, pagination } = metadata!;
      const dataMapped = data.map((item) => Mapper.map(item));
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
