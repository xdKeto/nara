import { useState, useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { retries = 3, cacheTime = 3600000 } = options;

  useEffect(() => {
    const fetchData = async () => {
      const cacheKey = `strapi_cache_${endpoint}`;
      const cachedData = localStorage.getItem(cacheKey);
      
      if (cachedData) {
        const { timestamp, result } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheTime) {
          setData(result);
          setLoading(false);
          return;
        }
      }

      setLoading(true);
      setError(null);

      let attempt = 0;
      let success = false;

      while (attempt < retries && !success) {
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : undefined,
          };

          const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });

          if (!response.ok) {
            if (response.status >= 500) {
              throw new Error(`Server is starting up (Cold Start): ${response.status}`);
            } else {
              const errorText = await response.text();
              throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
            }
          }

          const result = await response.json();
          setData(result.data);
          
          localStorage.setItem(cacheKey, JSON.stringify({ 
            timestamp: Date.now(), 
            result: result.data 
          }));
          
          success = true;

        } catch (err) {
          attempt++;
          if (attempt >= retries || !err.message.includes('Cold Start')) {
            setError(err.message);
            break;
          }
          await sleep(3000); 
        }
      }
      
      setLoading(false);
    };

    fetchData();
  }, [endpoint, cacheTime, retries]);

  return { data, loading, error };
};

export const getStrapiURL = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}${path}`;
};
