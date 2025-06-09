"use client";

import { useCallback, useEffect, useState } from "react";

interface useAsyncFunctionWrapperProps<T> {
  asyncFunction: () => Promise<T>;
  runNow: boolean;
}

export default function useAsyncFunctionWrapper<T>({ asyncFunction, runNow }: useAsyncFunctionWrapperProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const res = await asyncFunction();
      setData(res);
      setError(null);
    } catch (error) {
      setError(error as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (runNow) {
      run();
    }
  }, []);

  return { loading, data, error, run };
}
