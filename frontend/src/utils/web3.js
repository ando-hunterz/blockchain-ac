import { ethers, utils } from "ethers";
import {
  addCookie,
  addEncryptedCookie,
  getCookie,
} from "./cookies";
import UserContract from "../contracts/UserToken.sol/UserToken.json";
import { useCrypto } from "../stores/crypto";
import { keccak256 } from "ethers/lib/utils";

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
  console.log(provider);
  try {
    await provider.send("eth_requestAccounts", []);
    crypto.$patch({
      provider: provider,
    });

  } catch (e) {
    window.alert(e);
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
    window.alert(e);
  }
  
};

const isAccountConnected = () => {
  const result = getCookie("crypto");
  return result === "true" ? true : false;
};

const createUserHash = (firstName, lastName) => {
  return (
    firstName.toUpperCase() +
    "_" +
    (lastName == null || lastName == "" ? 0 : lastName.toUpperCase())
  );
};

const createEnumUserHash = async (firstName, nameString, crypto) => {
  let count = 0;
  let newNameString;
  let found = await crypto.contract.checkUser(keccak256(utils.toUtf8Bytes(nameString)));
  if(!found) return nameString
  while (
    found
  ) {
    count++;
    newNameString = firstName.toUpperCase() + "_" + count++;
    found = await crypto.contract.checkUser(keccak256(utils.toUtf8Bytes(newNameString)));
  }
  return newNameString;
};

export {
  checkForProvider,
  connectProvider,
  isAccountConnected,
  getSignerAddress,
  connectToBlockchain,
  createUserHash,
  createEnumUserHash,
};
