import { utils } from "ethers";
import { keccak256 } from "ethers/lib/utils";
import { makeJsonObject } from "./file";
import { addFile } from "./ipfs";

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
  let found = await crypto.contract.checkUser(
    keccak256(utils.toUtf8Bytes(nameString))
  );
  if (!found) return nameString;
  while (found) {
    count++;
    newNameString = firstName.toUpperCase() + "_" + count++;
    found = await crypto.contract.checkUser(
      keccak256(utils.toUtf8Bytes(newNameString))
    );
  }
  return newNameString;
};

const createKeystore = async (account, password) => {
  const jsonKey = await account.encrypt(password);
  const JsonKeyStore = new File(
    [makeJsonObject(jsonKey)],
    account.address + "-key.json"
  );
  return await addFile(JsonKeyStore);
};

const createMetadata = async (account, jsonKeyURI, user) => {
    console.log(user)
    const jsonMetadata = {
        name: user.name,
        photo: user.photoUrl,
        keystore: jsonKeyURI
      };
      const jsonURI = new File(
        [makeJsonObject(jsonMetadata)],
        account.address + ".json"
      );
      return await addFile(jsonURI);
}

export { createEnumUserHash, createUserHash, createKeystore, createMetadata };
