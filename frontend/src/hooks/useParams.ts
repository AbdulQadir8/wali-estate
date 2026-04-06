import { useState, useEffect } from 'react';

export function useParams() {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    setParams(paramsObj);

    const handlePopState = () => {
      const newSearchParams = new URLSearchParams(window.location.search);
      const newParamsObj: Record<string, string> = {};
      newSearchParams.forEach((value, key) => {
        newParamsObj[key] = value;
      });
      setParams(newParamsObj);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return params;
}
