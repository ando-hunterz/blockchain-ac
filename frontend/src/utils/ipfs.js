import axios from 'axios';
const ipfsNode = import.meta.env.VITE_IPFS_ADDR+'/ipfs/'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
 
};

const getImageFile = async (path) => {
  const response =  await axios.get(ipfsNode+path, {responseType: 'blob'})
  console.log(response.data)
  
  return URL.createObjectURL(response.data);
};

const getFile = async (path) => {
  const response =  await axios.get(ipfsNode+path)
  return response.data
};

export { addFile, uploadPhotos, getJsonFile, getImageFile, getFile };
