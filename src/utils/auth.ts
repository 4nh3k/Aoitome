import { jwtDecode } from "jwt-decode";

export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access_token: string) => {
  // Decode the access token
  const decodedToken: { userId: string } = jwtDecode(access_token);

  // Store the access token and user ID in local storage
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("uid", decodedToken.userId);
};

export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

export const getUIDFromLS = () => {
  const result = localStorage.getItem("uid");
  return result;
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem("access_token") || "";

export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("uid");
};
