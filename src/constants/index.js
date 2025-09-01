export const FOOTER_CONTENT = `© ${new Date().getFullYear()} Narasatya Joy W. All rights reserved.`;

// Global variable to store fetched data
export let GLOBAL_DATA = {
  data: null,
  loading: true,
  error: null,
};

// Function to update global data
export const updateGlobalData = (newData) => {
  GLOBAL_DATA = { ...GLOBAL_DATA, ...newData };
};

// Helper functions to easily access specific data
export const getHomePageData = () => GLOBAL_DATA.data?.homePage || null;
export const getResumePageData = () => GLOBAL_DATA.data?.resumePage || null;
export const getContactPageData = () => GLOBAL_DATA.data?.contactPage || null;
export const getWipPageData = () => GLOBAL_DATA.data?.wipPage || null;
export const getHomeCategories = () => GLOBAL_DATA.data?.homePage?.homeCategories || [];
