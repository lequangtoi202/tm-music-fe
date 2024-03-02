const LOCAL_STORAGE_KEY = 'accessToken';

export const getToken = () => localStorage.getItem(LOCAL_STORAGE_KEY);

export const setToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};
