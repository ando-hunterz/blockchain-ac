import { ethers, utils } from "ethers";
import {
  addCookie,
  addEncryptedCookie,
  getCookie,
} from "./cookies";
import UserContract from "../contracts/UserToken.sol/UserToken.json";
import LogContract from '../contracts/LogToken.sol/LogToken.json'
import { useCrypto } from "../stores/crypto";
import { keccak256 } from "ethers/lib/utils";
import router from "./router";

const connectToBlockchain = async (crypto) => {
  await connectProvider(crypto);
  await setSigner(crypto);
  await connectUserContract(crypto);
  try {
    await isAdminRole(crypto, await getSignerAddress());
  } catch (e) {
    window.alert(e);
  }
  console.log('ho')
};
const checkForProvider = () => {
  if (window.ethereum == undefined) return false;
  return true;
};

const connectProvider = async (crypto) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(await provider.ready);
  try {
    await provider.send("eth_requestAccounts", []);
    crypto.$patch({
      provider: provider,
    });

  } catch (e) {
    window.alert("Network Might Be Error");
    router.push('/404')
  }
};

const setSigner = async (crypto) => {
  const signer = crypto.provider.getSigner();
  if (signer == null) return;
  crypto.$patch({
    signer: signer,
  });
};

const connectUserContract = async (crypto) => {
  const contract = new ethers.Contract(
    import.meta.env.VITE_USER_CONTRACT_ADDR,
    UserContract.abi,
    crypto.signer
  );
  crypto.$patch({
    contract: contract,
  });
  addCookie("crypto", true);
};

const connectLogContract = async (crypto) => {
  const contract = new ethers.Contract(
    import.meta.env.VITE_LOG_CONTRACT_ADDR,
    LogContract.abi,
    crypto.signer
  );
  crypto.$patch({
    logContract: contract,
  });
}

const getSignerAddress = async () => {
  const crypto = useCrypto();
  const address = await crypto.signer.getAddress();
  console.log(address);
  return address;
};

const isAdminRole = async (crypto, address) => {
  try {
    const role = (await crypto.contract.hasRole(
      import.meta.env.VITE_DEFAULT_ADMIN_ROLE,
      address
    ))
      ? "admin"
      : "user";
      addEncryptedCookie("role", role, address);
  } catch (e) {
    window.alert("Network Might Be Error");
    router.push('/404')
  }
  
};

const isAccountConnected = () => {
  const result = getCookie("crypto");
  return result === "true" ? true : false;
};


export {
  checkForProvider,
  connectProvider,
  isAccountConnected,
  getSignerAddress,
  connectToBlockchain,
  connectLogContract
};
