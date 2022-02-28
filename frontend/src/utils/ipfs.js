import IPFS from "../modules/ipfs/ipfs-core/ipfs-http-client";
let ipfsNode;

const connectIpfsNode = async () => {
  console.log(IPFS)
  console.log('connect')
    ipfsNode = await IPFS.create(import.meta.env.VITE_IPFS_ADDR);
}


const addFile = async (file) => {
  console.log(ipfsNode);
  if(ipfsNode == undefined) await connectIpfsNode()
  const filepath = await ipfsNode.add(file);
  return filepath.cid.toString();
};


export { addFile };
