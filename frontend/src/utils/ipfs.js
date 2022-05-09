import IPFS from "../modules/ipfs/ipfs-core/ipfs-http-client";
import { arrayToBase64, chunkArrayToJson } from "./file";
import axios from 'axios';
const ipfsNode = import.meta.env.VITE_IPFS_ADDR+'/ipfs/'

const connectIpfsNode = async () => {
  try {
    ipfsNode = await IPFS.create(import.meta.env.VITE_IPFS_ADDR);
  } catch (e) {
    alert(e);
  }
};

const addFile = async (file) => {
    const response =  await axios.post(ipfsNode, file)
    return response.headers["ipfs-hash"]
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
  const response =  await axios.get(ipfsNode+path)
  return response.data
  // if (ipfsNode == undefined) await connectIpfsNode();
  // for await (const chunk of ipfsNode.cat(path)) {
  //   return chunkArrayToJson(chunk);
  // }
};

const getImageFile = async (path) => {
  const response =  await axios.get(ipfsNode+path, {responseType: 'blob'})
  console.log(response.data)
  // if (ipfsNode == undefined) await connectIpfsNode();
  // let chunks = [];
  // for await (const chunk of ipfsNode.cat(path)) {
  //   chunks.push(chunk)
  // }
  // // Get the total length of all arrays.
  // let length = 0;
  // chunks.forEach(item => {
  //   length += item.length;
  // });

  // // Create a new array with total length and merge all source arrays.
  // let imageChunk = new Uint8Array(length);
  // let offset = 0;
  // chunks.forEach(item => {
  //   imageChunk.set(item, offset);
  //   offset += item.length;
  // });
  return URL.createObjectURL(response.data);
};

const getFile = async (path) => {
  const response =  await axios.get(ipfsNode+path)
  console.log(response.data)
  // if (ipfsNode == undefined) await connectIpfsNode();
  // let chunks = [];
  // for await (const chunk of ipfsNode.cat(path)) {
  //   chunks.push(chunk)
  // }
  // // Get the total length of all arrays.
  // let length = 0;
  // chunks.forEach(item => {
  //   length += item.length;
  // });

  // // Create a new array with total length and merge all source arrays.
  // let textChunk = new Uint8Array(length);
  // let offset = 0;
  // chunks.forEach(item => {
  //   textChunk.set(item, offset);
  //   offset += item.length;
  // });
  // return new TextDecoder().decode(textChunk)
  return response.data
};

export { addFile, uploadPhotos, getJsonFile, getImageFile, getFile };
