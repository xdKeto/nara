import { createContext, useContext } from "react";
import { useFetch } from "../utils/api";

export const FetchDataContext = createContext({ data: null, loading: true, error: null });

export const FetchDataProvider = ({ children }) => {
  const { data, loading, error } = useFetch(
    "/api/global?pLevel=6"
  );
  return <FetchDataContext.Provider value={{ data, loading, error }}>{children}</FetchDataContext.Provider>;
};

export const useFetchData = () => {
  return useContext(FetchDataContext);
};
