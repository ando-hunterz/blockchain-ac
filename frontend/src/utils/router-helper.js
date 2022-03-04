import { useRouter } from "vue-router";
import { useCrypto } from "../stores/crypto";
import { getCookie, getEncryptedCookie } from "./cookies";
import router from "./router";

const hasAdminRole = async (to, from) => {
  console.log("admin role check");
  if ((await isAdmin()) == false) return router.push("/");
};

const isAdmin = async () => {
  console.log("admin check");
  const crypto = useCrypto();
  const address = await crypto.signer.getAddress();
  console.log(getEncryptedCookie("role", address));
  console.log(getEncryptedCookie("role", address) != "admin");
  if (getEncryptedCookie("role", address) != "admin") return false;
  return true;
};

const isLogin = async (to, from) => {
  console.log("login check");
  const crypto = useCrypto();
  if (crypto.signer == null && !isRouteFromBase(from)) router.push("/");
};

const isRouteFromBase = (router) => {
  return router.name == undefined ? true : false;
};

const routeTo = (path) => {
  router.push("/" + path);
};

const baseRouteTo = async () => {

  if (getCookie("crypto") === "true") {
    console.log("base route");
    const crypto = useCrypto();
    const address = await crypto.signer.getAddress();

    getEncryptedCookie("role", await crypto.signer.getAddress()) != "admin"
      ? router.push("/user")
      : router.push("/admin");
  }
};

export { hasAdminRole, isLogin, isRouteFromBase, routeTo, baseRouteTo };
