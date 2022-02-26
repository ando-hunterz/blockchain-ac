import { ethers } from "ethers";
import { addCookies, getCookie } from "./cookies";
import UserContract from '../contracts/UserToken.sol/UserToken.json'; 
import { hasAdminRole, routeTo } from "./router-helper";

const checkForProvider = () => {
  if (window.ethereum == undefined) return false;
  return true;
};

const connectProvider = async (crypto) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  setSigner(provider, crypto)
};

const setSigner = async (provider, crypto) => {
  const signer = provider.getSigner();
  if(signer == null) return
  crypto.$patch({
    provider: provider,
    signer: signer,
  });
  await connectUserContract(crypto);
}

const connectUserContract = async (crypto) => {
  console.log(import.meta.env.VITE_USER_CONTRACT_ADDR)
    const contract = new ethers.Contract(import.meta.env.VITE_USER_CONTRACT_ADDR, UserContract.abi, crypto.signer);
    crypto.$patch({
        contract: contract
    })
    addCookies('crypto',true);
}

const isAccountConnected = () => {
    const result = getCookie('crypto')
    return result == undefined ? false : true;
}

export { checkForProvider, connectProvider, isAccountConnected };
