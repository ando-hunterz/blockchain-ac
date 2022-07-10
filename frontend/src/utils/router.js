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

router.beforeEach(async (to, from) => {
  const crypto = useCrypto();
  console.log(to)
  console.log(from)
  if(to.path == '/404' || from.path == '/404') return
  if(window.ethereum == undefined && from.path == '/') {
    router.push("404")
    return
  }
  if (
    window.ethereum && (
    crypto.provider == null ||
    crypto.signer == null ||
    crypto.contract == null
    )
  ) {
    const provider = checkForProvider();
    if(!await window.ethereum._metamask.isUnlocked() && getCookie('crypto') != undefined) {
      window.alert('not pass')
      removeCookies('crypto');
      removeCookies('role')
      router.push('/')
    }

    if (!provider && !isRouteFromBase(router)) router.push("/");
    window.alert('pass')
    if (getCookie("crypto") === "true")
      try {
        await connectToBlockchain(crypto);
        window.alert('pass')
      } catch (e) {
        window.alert(e);
      }
  } else {
    try{
      await crypto.signer.getAddress();
    } catch (e) {
      console.log(e)
      window.location.reload();
    } 
  }
  
  if (to.name == "login") return;
});

export default router;
