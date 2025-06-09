import useAsyncFunctionWrapper from "@/app/_private/hooks/useAsyncFunctionWrapper/useAsyncFunctionWrapper";
import { BrandDto } from "@dto/brand/brand";
import { FindAllDto, OrderDirection } from "@dto/common/common";
import { useCallback } from "react";
import BrandApi from "../../brand";

interface useBrandsProps {
  currentPage: number;
  itemsPerPage: number;
  orderField: string;
  orderDirection: OrderDirection;
}

export default function useBrands({ currentPage, itemsPerPage, orderField, orderDirection }: useBrandsProps) {
  const loadData = useCallback(() => {
    return BrandApi.FindAll({ currentPage, itemsPerPage, orderField, orderDirection });
  }, [currentPage, itemsPerPage, orderField, orderDirection]);

  return useAsyncFunctionWrapper<FindAllDto<BrandDto>>({
    asyncFunction: loadData,
    runNow: true,
  });
}
