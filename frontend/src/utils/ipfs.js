import IPFS from "../modules/ipfs/ipfs-core/ipfs-http-client";
import { arrayToBase64, chunkArrayToJson } from "./file";
let ipfsNode;

const connectIpfsNode = async () => {
  try {
    ipfsNode = await IPFS.create(import.meta.env.VITE_IPFS_ADDR);
  } catch (e) {
    alert(e);
  }
};

const addFile = async (file) => {
  console.log(ipfsNode);
  if (ipfsNode == undefined) await connectIpfsNode();
  console.log(file);
  const filepath = await ipfsNode.add(file);
  return filepath.cid.toString();
};

const uploadPhotos = async (photos) => {
  let photoUrl = [];
  for (const file of photos) {
    console.log(file)
    photoUrl.push(await addFile(file));
  }
  return photoUrl;
};

const getJsonFile = async (path) => {
  if (ipfsNode == undefined) await connectIpfsNode();
  for await (const chunk of ipfsNode.cat(path)) {
    return chunkArrayToJson(chunk);
  }
};

const getImageFile = async (path) => {
  if (ipfsNode == undefined) await connectIpfsNode();
  let chunks = [];
  for await (const chunk of ipfsNode.cat(path)) {
    chunks.push(chunk)
  }
  // Get the total length of all arrays.
  let length = 0;
  chunks.forEach(item => {
    length += item.length;
  });

  // Create a new array with total length and merge all source arrays.
  let imageChunk = new Uint8Array(length);
  let offset = 0;
  chunks.forEach(item => {
    imageChunk.set(item, offset);
    offset += item.length;
  });
  return URL.createObjectURL(new Blob([imageChunk], { type: "image/jpeg" }));
};

export { addFile, uploadPhotos, getJsonFile, getImageFile };
