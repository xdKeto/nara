import { useState, useEffect } from "react";

// const API_BASE_URL = "http://localhost:1337"; // Your Strapi API URL
const API_BASE_URL = import.meta.env.VITE_STRAPI_API_URL;
const API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const headers = {
          "Content-Type": "application/json",
          Authorization: API_TOKEN ? `Bearer ${API_TOKEN}` : undefined,
        };

        const response = await fetch(`${API_BASE_URL}${endpoint}`, { headers });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

// Function to construct the full URL for media assets
export const getStrapiURL = (path) => {
  if (!path) {
    return "";
  }
  // If the path is already a full URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Otherwise, prepend the API base URL
  return `${API_BASE_URL}${path}`;
};
