const TokenKey = 'token';
const TokenPrefix = 'Bearer ';
const isLogin = () => {
  return !!sessionStorage.getItem(TokenKey);
};
const getToken = () => {
  return sessionStorage.getItem(TokenKey);
};
const setToken = (token: string) => {
  sessionStorage.setItem(TokenKey, token);
};
const clearToken = () => {
  sessionStorage.removeItem(TokenKey);
};
export { TokenPrefix, isLogin, getToken, setToken, clearToken };
