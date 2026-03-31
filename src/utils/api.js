import { useState, useEffect, useCallback, useRef } from "react";

const API_BASE_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Robust fetch hook for Strapi with SWR caching, Cold Start retries, and Silent Refresh.
 * @param {string} endpoint - API endpoint
 * @param {object} options - { retries, cacheTime }
 */
export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);
  
  const { retries = 5, cacheTime = 3600000 } = options; // Default 1 hour cache

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(async (isRefresh = false) => {
    const cacheKey = `strapi_cache_${endpoint}`;
    const cachedData = localStorage.getItem(cacheKey);
    let hasValidCache = false;

    // 1. Initial Cache Check (SWR Part 1)
    if (cachedData && !isRefresh) {
      try {
        const { timestamp, result } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheTime) {
          setData(result);
          setLoading(false);
          hasValidCache = true;
        }
      } catch (e) {
        console.error("Cache parse error", e);
      }
    }

    // If no valid cache, we show loading screen (Blocking UI)
    if (!hasValidCache) {
      setLoading(true);
      setError(null);
    }

    // 2. Background Fetch (SWR Part 2 / Cold Start Handling)
    let attempt = 0;
    let success = false;
    // Progressive delays: 3s, 6s, 9s, 12s, 15s
    const delays = [3000, 6000, 9000, 12000, 15000];

    while (attempt < retries && !success) {
      if (!isMounted.current) break;

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : undefined,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });

        if (!response.ok) {
          // Status >= 500 triggers retry logic
          if (response.status >= 500) {
            throw new Error(`Server Cold Start (Status: ${response.status})`);
          } else {
            const errorText = await response.text();
            throw new Error(`HTTP Error ${response.status}: ${errorText}`);
          }
        }

        const result = await response.json();
        
        if (isMounted.current) {
          setData(result.data);
          setLoading(false);
          setError(null);
          
          localStorage.setItem(cacheKey, JSON.stringify({ 
            timestamp: Date.now(), 
            result: result.data 
          }));
          
          success = true;
        }

      } catch (err) {
        attempt++;
        const isColdStart = err.message.includes("Cold Start") || err.message.includes("Failed to fetch");
        
        if (attempt >= retries || !isColdStart) {
          // Silent Refresh Logic: 
          // If we already have data (from cache or previous load), don't show error.
          if (isMounted.current) {
            if (!data) {
              setError(err.message);
            }
            setLoading(false);
          }
          break;
        }
        
        // Wait and retry
        await sleep(delays[attempt - 1] || 3000); 
      }
    }
  }, [endpoint, cacheTime, retries, data]);

  useEffect(() => {
    fetchData();
  }, [endpoint]); // Only refetch on endpoint change

  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  return { data, loading, error, refresh };
};

export const getStrapiURL = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}${path}`;
};
