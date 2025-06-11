import { FindAllDto } from "@dto/common/common";
import { ProductLineDto } from "@dto/productLine/productLine";
import ProductLineMapper from "@helper/mapper/productLine/ProductLineMapper";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import { FindAllPaginationProps } from "../../data/props/ApiProps";
import ApiClient from "../api-client";

export default class ProductLineApi {
  static UrlPrefix: string = "product-lines";

  static GenerateLinkFindAll(categoryUid: string | undefined, brandUid: string | undefined, findAllParams?: FindAllPaginationProps): string {
    let requestParams = new URLSearchParams({});
    if (categoryUid) {
      requestParams.append("categoryUid", String(categoryUid));
    }
    if (brandUid) {
      requestParams.append("brandUid", String(brandUid));
    }
    if (findAllParams) {
      const { currentPage, itemsPerPage, orderField, orderDirection } = findAllParams;
      requestParams.append("currentPage", String(currentPage));
      requestParams.append("itemsPerPage", String(itemsPerPage));
      requestParams.append("orderField", String(orderField));
      requestParams.append("orderDirection", String(orderDirection));
    }
    return ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}?${requestParams.toString()}`);
  }

  static async Insert(categoryUid: string, brandUid: string, name: string): Promise<ProductLineDto> {
    const category = {
      categoryUid,
      brandUid,
      name,
    };
    const response = await fetch(ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<ProductLineDto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindByUid(uid: string): Promise<ProductLineDto> {
    const response = await fetch(ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}/${uid}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<ProductLineDto>;
      const category = ProductLineMapper.map(data.metadata!);
      return category;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindAll(
    categoryUid: string | undefined,
    brandUid: string | undefined,
    findAllPaginationParams?: FindAllPaginationProps
  ): Promise<FindAllDto<ProductLineDto>> {
    const response = await fetch(ProductLineApi.GenerateLinkFindAll(categoryUid, brandUid, findAllPaginationParams));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<ProductLineDto>>;
      const { data, pagination } = metadata!;
      let dataMapped = data.map((item) => ProductLineMapper.map(item));
      return { data: dataMapped, pagination };
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async UpdateName(uid: string, name: string): Promise<number> {
    const response = await fetch(ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}/${uid}/name`), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<number>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async DeleteByUid(uid: string): Promise<number> {
    const response = await fetch(ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}/${uid}`), {
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
  static async IsNameExists(name: string): Promise<boolean> {
    const params = new URLSearchParams({
      name,
    });

    const response = await fetch(ApiClient.GetUrl(`/${ProductLineApi.UrlPrefix}/exists?${params.toString()}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<boolean>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
