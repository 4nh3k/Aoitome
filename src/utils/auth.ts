import { jwtDecode } from "jwt-decode";

export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access_token: string) => {
  // Decode the access token
  const decodedToken: { sub: string } = jwtDecode(access_token);

  // Store the access token and user ID in local storage
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("uid", decodedToken.sub);
};
export const setRoleToLS = (role: string) => {
  localStorage.setItem("role", role);
};

export const getIsAdmin = () => {
  const role = localStorage.getItem("role");
  return role?.includes("ADMIN");
};

export const getUIDFromLS = () => {
  const result = localStorage.getItem("uid");
  return result;
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
  localStorage.removeItem("uid");
};
