import { FindAllDto } from "@dto/common/common";
import { VariantOptionDto } from "@dto/variantOption/VariantOptionDto";
import VariantOptionMapper from "@dto/variantOption/VariantOptionMapper";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import { FindAllPaginationProps } from "../../data/props/ApiProps";
import ApiClient from "../api-client";

interface Dto extends VariantOptionDto {}
const Mapper = VariantOptionMapper;

export default class VariantOptionApi {
  static UrlPrefix: string = "variant-options";
  static GenerateLinkFindAll(variantAttributeUid?: string, findAllParams?: FindAllPaginationProps): string {
    const requestParams = new URLSearchParams({});
    if (variantAttributeUid) {
      requestParams.append("variantAttributeUid", String(variantAttributeUid));
    }
    if (findAllParams) {
      const { currentPage, itemsPerPage, orderField, orderDirection } = findAllParams;
      requestParams.append("currentPage", String(currentPage));
      requestParams.append("itemsPerPage", String(itemsPerPage));
      requestParams.append("orderField", String(orderField));
      requestParams.append("orderDirection", String(orderDirection));
    }
    return ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}?${requestParams.toString()}`);
  }
  static async Insert(variantAttributeUid: string, name: string): Promise<Dto> {
    const item = {
      variantAttributeUid,
      name,
    };
    const response = await fetch(ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<Dto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindByUid(uid: string): Promise<Dto> {
    const response = await fetch(ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}/${uid}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<Dto>;
      const item = Mapper.map(data.metadata!);
      return item;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindAll(variantAttributeUid?: string, findAllPaginationParams?: FindAllPaginationProps): Promise<FindAllDto<Dto>> {
    const response = await fetch(VariantOptionApi.GenerateLinkFindAll(variantAttributeUid, findAllPaginationParams));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<Dto>>;
      const { data, pagination } = metadata!;
      const dataMapped = data.map((item) => Mapper.map(item));
      return { data: dataMapped, pagination };
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async UpdateName(uid: string, name: string): Promise<number> {
    const response = await fetch(ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}/${uid}/name`), {
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
    const response = await fetch(ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}/${uid}`), {
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

    const response = await fetch(ApiClient.GetUrl(`/${VariantOptionApi.UrlPrefix}/exists?${params.toString()}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<boolean>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
