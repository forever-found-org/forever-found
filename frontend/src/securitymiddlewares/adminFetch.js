export const adminFetch = async (url, options = {}) => {
  const token = localStorage.getItem("adminToken");

  const defaultHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const res = await fetch(url, mergedOptions);

  // ✅ Handle expired / invalid token globally
  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
    return;
  }

  return res;
};
