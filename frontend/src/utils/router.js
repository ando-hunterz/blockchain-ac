import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "../routes/route";
import { useCrypto } from "../stores/crypto";
import { getCookie, getEncryptedCookie, removeCookies } from "./cookies";
import { isRouteFromBase, routeTo } from "./router-helper";
import { checkForProvider, connectToBlockchain } from "./web3";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const crypto = useCrypto();
  if (
    crypto.provider == null ||
    crypto.signer == null ||
    crypto.contract == null
  ) {
    const provider = checkForProvider();
    if(!await window.ethereum._metamask.isUnlocked() && getCookie('crypto') != undefined) {
      removeCookies('crypto');
      removeCookies('role')
      console.log('routing')
      router.push('/')
    }
    if (!provider && !isRouteFromBase(router)) router.push("/");
    if (getCookie("crypto") === "true")
      try {
        await connectToBlockchain(crypto);
      } catch (e) {
        window.alert(e);
      }
  }
  if (to.name == "login") return;
});

export default router;
