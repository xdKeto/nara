import { createContext, useContext, useMemo } from "react";
import { useFetch } from "../utils/api";

export const FetchDataContext = createContext({ 
  data: null, 
  loading: true, 
  error: null,
  refresh: () => {} 
});

export const FetchDataProvider = ({ children }) => {
  const { data, loading, error, refresh } = useFetch(
    "/api/global?pLevel=6"
  );

  const value = useMemo(() => ({
    data, 
    loading, 
    error, 
    refresh
  }), [data, loading, error, refresh]);

  return <FetchDataContext.Provider value={value}>{children}</FetchDataContext.Provider>;
};

export const useFetchData = () => {
  return useContext(FetchDataContext);
};
