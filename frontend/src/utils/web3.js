import { ethers } from "ethers";
import { addCookie, addEncryptedCookie, getCookie, getEncryptedCookie } from "./cookies";
import UserContract from '../contracts/UserToken.sol/UserToken.json'; 
import { hasAdminRole, routeTo } from "./router-helper";
import { useCrypto } from "../stores/crypto";

const connectToBlockchain = async (crypto) => {
  await connectProvider(crypto);
  await setSigner(crypto);
  await connectUserContract(crypto);
  await isAdminRole(crypto, await getSignerAddress());
}
const checkForProvider = () => {
  if (window.ethereum == undefined) return false;
  return true;
};

const connectProvider = async (crypto) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log(provider)
  try{
    await provider.send("eth_requestAccounts", []);
    crypto.$patch({
      provider: provider
    });
  } catch (e) {
    window.alert(e)
  }
};

const setSigner = async ( crypto) => {
  const signer = crypto.provider.getSigner();;
  if(signer == null) return
  crypto.$patch({
    signer: signer
  });
}

const connectUserContract = async (crypto) => {
    const contract = new ethers.Contract(import.meta.env.VITE_USER_CONTRACT_ADDR, UserContract.abi, crypto.signer);
    crypto.$patch({
        contract: contract
    })
    addCookie('crypto',true);
    
}

const getSignerAddress = async () => {
  const crypto = useCrypto();
  const address = await crypto.signer.getAddress();
  console.log(address)
  return address;
}

const isAdminRole = async (crypto, address) => {
  console.log(address);
  const role = await crypto.contract.hasRole(
      import.meta.env.VITE_DEFAULT_ADMIN_ROLE,
      address
    ) ? 'admin' : 'user';
  addEncryptedCookie('role', role, address)
  console.log('check cookie')
  console.log(getEncryptedCookie('role', address));
}


const isAccountConnected = () => {
    const result = getCookie('crypto')
    return result === 'true' ? true : false;
}

export { checkForProvider, connectProvider, isAccountConnected, getSignerAddress, connectToBlockchain };
