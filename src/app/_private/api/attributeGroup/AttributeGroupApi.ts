import { AttributeGroupDto } from "@dto/attributeGroup/AttributeGroupDto";
import AttributeGroupMapper from "@dto/attributeGroup/AttributeGroupMapper";
import { FindAllDto } from "@dto/common/common";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import { FindAllPaginationProps } from "../../data/props/ApiProps";
import ApiClient from "../api-client";

interface Dto extends AttributeGroupDto {}
const Mapper = AttributeGroupMapper;

export default class AttributeGroupApi {
  static UrlPrefix: string = "attribute-groups";
  static GenerateLinkFindAll(categoryUid?: string, findAllParams?: FindAllPaginationProps): string {
    const requestParams = new URLSearchParams({});
    if (categoryUid) {
      requestParams.append("categoryUid", categoryUid);
    }
    if (findAllParams) {
      const { currentPage, itemsPerPage, orderField, orderDirection } = findAllParams;
      requestParams.append("currentPage", String(currentPage));
      requestParams.append("itemsPerPage", String(itemsPerPage));
      requestParams.append("orderField", String(orderField));
      requestParams.append("orderDirection", String(orderDirection));
    }
    return ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}?${requestParams.toString()}`);
  }
  static async Insert(categoryUid: string, name: string): Promise<Dto> {
    const category = {
      categoryUid,
      name,
    };
    const response = await fetch(ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
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
    const response = await fetch(ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}/${uid}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<Dto>;
      const category = Mapper.map(data.metadata!);
      return category;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindAll(categoryUid?: string, findAllPaginationParams?: FindAllPaginationProps): Promise<FindAllDto<Dto>> {
    const response = await fetch(AttributeGroupApi.GenerateLinkFindAll(categoryUid, findAllPaginationParams));
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
    const response = await fetch(ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}/${uid}/name`), {
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
    const response = await fetch(ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}/${uid}`), {
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

    const response = await fetch(ApiClient.GetUrl(`/${AttributeGroupApi.UrlPrefix}/exists?${params.toString()}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<boolean>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
