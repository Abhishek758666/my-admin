export const setAccessTokenToLocalStorage = (data: any) => {
  localStorage.setItem("access-token", JSON.stringify(data));
};
export const removeAccessTokenToLocalStorage = () => {
  localStorage.removeItem("access-token");
};
export const getAccessTokenDataFromLocalStorage = () => {
  const storedItem = localStorage.getItem("access-token");
  return storedItem;
};
