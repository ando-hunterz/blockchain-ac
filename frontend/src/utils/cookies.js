const addCookies = (key, value) => {
  document.cookie = `${key}=${value}; expires=Sun, 15 Jan 2037 00:00:00 UTC; path=/`;
};

const removeCookies = (key) => {
  document.cookie = `${key}=;  expires=Sun,  01 Jan 1970 00:00:00 UTC; path=/`;
};

const getCookie = (key) => {
    const cookie = document.cookie.split("; ").find((row) => row.startsWith(`${key}=`))
    return cookie != undefined ? cookie.split("=")[1] : undefined;
};

export { addCookies, removeCookies, getCookie };
