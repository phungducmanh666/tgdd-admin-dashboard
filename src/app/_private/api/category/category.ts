import { CategoryDto } from "@dto/category/category";
import { FindAllDto, OrderDirection } from "@dto/common/common";
import CategoryMapper from "@helper/mapper/category/CategoryMapper";
import { ApiFailedResponse, ApiSuccessResponse } from "@helper/server/api/response/ApiResponse";
import ApiClient from "../api-client";

type FindAllProps = {
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
};

export default class CategoryApi {
  static UrlPrefix: string = "categories";

  static async Insert(name: string): Promise<CategoryDto> {
    const category = {
      name,
    };
    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<CategoryDto>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindByUid(uid: string): Promise<CategoryDto> {
    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}/${uid}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<CategoryDto>;
      const category = CategoryMapper.map(data.metadata!);
      return category;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async FindAll({ currentPage, itemsPerPage, orderField, orderDirection }: FindAllProps): Promise<FindAllDto<CategoryDto>> {
    const params = new URLSearchParams({
      currentPage: currentPage.toString(),
      itemsPerPage: itemsPerPage.toString(),
      orderField: orderField,
      orderDirection: orderDirection.toString(),
    });

    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}?${params.toString()}`));
    if (response.ok) {
      const { metadata } = (await response.json()) as ApiSuccessResponse<FindAllDto<CategoryDto>>;
      const { data, pagination } = metadata!;
      let dataMapped = data.map((item) => CategoryMapper.map(item));
      return { data: dataMapped, pagination };
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
  static async UpdateName(uid: string, name: string): Promise<number> {
    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}/${uid}/name`), {
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
  static async UpdatePhoto(uid: string, photo: File): Promise<number> {
    const formData = new FormData();
    formData.append("photo", photo);
    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}/${uid}/photo`), {
      method: "PATCH",
      body: formData,
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
    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}/${uid}`), {
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

    const response = await fetch(ApiClient.GetUrl(`/${CategoryApi.UrlPrefix}/exists?${params.toString()}`));
    if (response.ok) {
      const data = (await response.json()) as ApiSuccessResponse<boolean>;
      return data.metadata!;
    } else {
      const { error } = (await response.json()) as ApiFailedResponse;
      throw Error(error.message);
    }
  }
}
