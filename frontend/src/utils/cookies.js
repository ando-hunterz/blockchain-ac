import aes from "crypto-js/aes";
import { enc } from "crypto-js/core";
import { useCrypto } from "../stores/crypto";
import { getSignerAddress } from "./web3";

const addEncryptedCookie = (key, value, salt) => {
  value = aes.encrypt(value.toString(), salt).toString();
  console.log(value);
  document.cookie = `${key}=${value}; expires=Sun, 15 Jan 2037 00:00:00 UTC; path=/`;
};

const addCookie = (key, value) => {
  document.cookie = `${key}=${value}; expires=Sun, 15 Jan 2037 00:00:00 UTC; path=/`;
};

const removeCookies = (key) => {
  document.cookie = `${key}=;  expires=Sun,  01 Jan 1970 00:00:00 UTC; path=/`;
};

const getCookie = (key) => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));
  return cookie != undefined ? cookie.split("=")[1] : undefined;
};

const getEncryptedCookie = (key, salt) => {
  console.log(salt);
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`));
  const cookieValue = cookie != undefined ? cookie.split("=")[1] : undefined;
  console.log(cookieValue);
  if (cookieValue == undefined) return undefined;
  const bytes = aes.decrypt(cookieValue, salt);
  return bytes.toString(enc.Utf8);
};

export {
  addCookie,
  addEncryptedCookie,
  getEncryptedCookie,
  removeCookies,
  getCookie,
};
