// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const fs = require('fs');
const axios = require('axios');
const forge = require('node-forge');
require('dotenv').config()


async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  console.log('Begin contract deployment') 
  const provider = new hre.ethers.providers.JsonRpcProvider(`${process.env.PROVIDER_ADDR}`)
  // We get the contract to deploy
  const keystore = fs.readFileSync(`${process.cwd()}/config/blockchain/keystore`)
  console.log('Reading admin account')
  const signer = await hre.ethers.Wallet.fromEncryptedJson(keystore,'andodo')
  const signers = signer.connect(provider)
  const signerAddress = await signers.getAddress()
  console.log("Deploying UserToken")
 
  const UserToken = await hre.ethers.getContractFactory("UserToken", signers);
  const userToken = await UserToken.deploy();
  await userToken.deployTransaction.wait()
  console.log(userToken.address);

  console.log("Deploying LogToken")

  const LogToken = await hre.ethers.getContractFactory("LogToken", signers);
  const logToken = await LogToken.deploy(userToken.address);
  await logToken.deployTransaction.wait()
  console.log(logToken.address);

  const nodeAccount = hre.ethers.Wallet.createRandom()
  
  console.log('Creating node account')

  const tx = {
    from: signerAddress,
    to: nodeAccount.address,
    value: hre.ethers.utils.parseEther("10"),
  };

  const signedTx = await signers.sendTransaction(tx);
  
  await signedTx.wait()

  console.log('Create env file')
  const keypair = forge.pki.rsa.generateKeyPair({bits: 1024, workers: 2});
  const privatePem = forge.pki.privateKeyToPem(keypair.privateKey)
  const publicPem = forge.pki.publicKeyToPem(keypair.publicKey)
  
  const result = await axios.post(`${process.env.IPFS_GATEWAY_ADDR}/ipfs/`, publicPem)

  const frontendenv = 
  `VITE_USER_CONTRACT_ADDR=${userToken.address}\n`+
  `VITE_LOG_CONTRACT_ADDR=${logToken.address}\n`+
  `VITE_DEFAULT_ADMIN_ROLE=0x0000000000000000000000000000000000000000000000000000000000000000\n`+
  `VITE_DISABLED_ROLE=0xa525cde1cb1016e83acdcf1bd75f317fb68bb72cf5721ac56f746ad8529dae99\n`+
  `VITE_IPFS_ADDR=${process.env.IPFS_API_ADDR}\n`+
  `VITE_NODE_ADDR=${nodeAccount.address}\n`+
  `VITE_NOACCOUNT_ADDR=0x0000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFF\n`+
  `VITE_PUBLICKEY=${result.headers["ipfs-hash"]}`

   const nodeenv = 
  `USER_CONTRACT_ADDR=${userToken.address}\n`+
  `LOG_CONTRACT_ADDR=${logToken.address}\n`+
  `DEFAULT_ADMIN_ROLE=0x0000000000000000000000000000000000000000000000000000000000000000\n`+
  `DISABLED_ROLE=0xa525cde1cb1016e83acdcf1bd75f317fb68bb72cf5721ac56f746ad8529dae99\n`+
  `IPFS_ADDR=${process.env.IPFS_GATEWAY_ADDR}\n`+
  `PROVIDER_ADDR=${process.env.PROVIDER_ADDR}\n`+
  `NODE_PRIVATE=${nodeAccount.privateKey}\n`+
  `NODE_ADDR=${nodeAccount.address}\n`+
  `NOACCOUNT_ADDR=0x0000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFF\n`+
  `NODE_NAME=`
  
  const directories = ['config/frontend', 'config/node']

  try {
    for(const dir of directories){
      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
      }
    }
    fs.writeFileSync('config/frontend/.env', frontendenv)
    fs.writeFileSync('config/node/.env', nodeenv)
    fs.writeFileSync('config/node/privateKey.pem',privatePem)
  } catch (err) {
    console.error(err)
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
