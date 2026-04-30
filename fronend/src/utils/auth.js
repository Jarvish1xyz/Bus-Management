export const setAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("admin", JSON.stringify(data.admin));
};

export const getAdmin = () => {
  return JSON.parse(localStorage.getItem("admin"));
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.clear();
};