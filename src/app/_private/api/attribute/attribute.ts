import { AttributeDto } from "@dto/attribute/attribute";
import { FindAllDto } from "@dto/common/common";
import AttributeMapper from "@helper/mapper/attribute/AttributeMapper";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import { FindAllPaginationProps } from "../../data/props/ApiProps";
import ApiClient from "../api-client";

export default class AttributeApi {
  static UrlPrefix: string = "attributes";
  static GenerateLinkFindAll(attributeGroupUid?: string, findAllParams?: FindAllPaginationProps): string {
    const requestParams = new URLSearchParams({});
    if (attributeGroupUid) {
      requestParams.append("attributeGroupUid", attributeGroupUid);
    }
    if (findAllParams) {
      const { currentPage, itemsPerPage, orderField, orderDirection } = findAllParams;
      requestParams.append("currentPage", String(currentPage));
      requestParams.append("itemsPerPage", String(itemsPerPage));
      requestParams.append("orderField", String(orderField));
      requestParams.append("orderDirection", String(orderDirection));
    }
    return ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}?${requestParams.toString()}`);
  }
  static async Insert(attributeGroupUid: string, name: string): Promise<AttributeDto> {
    const attribute = {
      attributeGroupUid,
      name,
    };
    const response = await fetch(ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attribute),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<AttributeDto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindByUid(uid: string): Promise<AttributeDto> {
    const response = await fetch(ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}/${uid}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<AttributeDto>;
      const item = AttributeMapper.map(data.metadata!);
      return item;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindAll(attributeGroupUid?: string, findAllPaginationParams?: FindAllPaginationProps): Promise<FindAllDto<AttributeDto>> {
    const response = await fetch(AttributeApi.GenerateLinkFindAll(attributeGroupUid, findAllPaginationParams));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<AttributeDto>>;
      const { data, pagination } = metadata!;
      const dataMapped = data.map((item) => AttributeMapper.map(item));
      return { data: dataMapped, pagination };
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async UpdateName(uid: string, name: string): Promise<number> {
    const response = await fetch(ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}/${uid}/name`), {
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
    const response = await fetch(ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}/${uid}`), {
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

    const response = await fetch(ApiClient.GetUrl(`/${AttributeApi.UrlPrefix}/exists?${params.toString()}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<boolean>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
