import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { CategoryDto } from "@dto/category/category";
import CategryApi from "../../category";

export default function useCategory(uid: string) {
  return useAsyncFunctionWrapper<CategoryDto>({
    asyncFunction: () => {
      return CategryApi.FindByUid(uid);
    },
    runNow: true,
  });
}
