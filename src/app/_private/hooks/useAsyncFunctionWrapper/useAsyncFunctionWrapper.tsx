"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface useAsyncFunctionWrapperProps<T> {
  asyncFunction: () => Promise<T>;
  runNow: boolean;
}

export default function useAsyncFunctionWrapper<T>({ asyncFunction, runNow }: useAsyncFunctionWrapperProps<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mounted = useRef(false);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const res = await asyncFunction();
      if (!mounted) return;
      setData(res);
      setError(null);
    } catch (error) {
      if (!mounted) return;
      setError(error as Error);
      setData(null);
    } finally {
      if (!mounted) return;
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    mounted.current = true;
    if (runNow) {
      run();
    }
    return () => {
      mounted.current = false;
    };
  }, []);

  return { loading, data, error, run };
}
