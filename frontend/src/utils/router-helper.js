import { useCrypto } from "../stores/crypto";
import router from "./router";

const hasAdminRole = async () => {
  const crypto = useCrypto();
  const address = await crypto.signer.getAddress();
  return await crypto.contract.hasRole(
    import.meta.env.VITE_DEFAULT_ADMIN_ROLE,
    address
  );
};

const isLogin = async (to, from) => {
  const crypto = useCrypto();
  console.log(from);
  if (crypto.signer == null && !isRouteFromBase(from)) router.push("/");
};

const isRouteFromBase = (router) => {
  return router.name == undefined ? true : false;
};

const routeTo = (path) => {
  router.push("/" + path);
};

const baseRouteTo = async () => {
  let role = await hasAdminRole();
  console.log(role);
  (await hasAdminRole()) ? router.push("/admin") : router.push("/user");
};

export { hasAdminRole, isLogin, isRouteFromBase, routeTo, baseRouteTo };
