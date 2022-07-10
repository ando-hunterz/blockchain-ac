# Electronic Access Control Based on Blockchain 🔒
## Electronic Access Control Based on Blockchain by Julando Omar 🛠

This was my final project which enabled me to achive Bachelor Degree in Engineering (Computer Enginering) or Sarjana Teknik in Indonesia 🎓.

## Project Description 🚀
This Project aim to solve log-tampering and single point of failure in Electronic Access System.  
Log-tampering and single point of failure vulnerabilities are caused by centralized system which store data in a single server.
These project proposed to solve these vulnerabilities by using distributed system, such as Blockchain. 
Face recognition and Multi-Factor Authentication also used to improve the security of the systems.

## Project Structure 📂
- Configuration Folder is used to enable load balancer and logging service on docker.
- Facerecog was used to test the performance of DeepFace library. (Unused)
- Frontend is used as the interface of user with the blockchain. Frontend is written in Vue.
- Hardhat is used to deploy smart contract to Blockchain
- Node is used as system which interact with physical access control.

## System Requirements ⚙
- Host Machine with **16 GB of RAM** and **6 Core Processor** to run 3 VM nodes
- **Raspberry Pi 4 with 4GB RAM** equipped with **Pi Camera**, optional **display** is required to show Node program UI 
- `npm` installed on Host Machine
- `python3` installed on Node Machine

## How To Use 🛠 (Bash Script in Progress 👷‍♂️)
- Configure 3 VM, Each VM network is bridged to local network, to enable communication between the systems.
- Install `geth` and `go-ipfs` 
- Run `geth bootnode`, to enable communication between node
- Run `puppeth` to configure `genesis.json` file
- Run `geth init` to init **Ethereum** blockchain on each nodes
- Run `geth new account` to generate new account on blockchain
- Run `scp` from node which has account keystore, to secure copy keystore file to deployment host 
- Run `geth` configured as a private node, on each nodes to run private **Ethereum Blockchain network**
- Generate `swarm.key` by using kubuxu keygen to enable private ipfs network
- Run `ipfs init` to initate ipfs on each nodes
- Run `ipfs bootstrap rm all` to remove all boostrap nodes on each nodes 
- Configure `go-ipfs config` to enable writeable gateway, CORS and bootstrap, and bootstrap nodes
- Run `ipfs daemon` to start ipfs services on each nodes
- Run `npm install` on Frontend folder to install required package to build Frontend `dist` folder
- Run `npm install` on Hardhat folder to install required package to run Hardhat and deploy smart contracts
- Run `npx hardhat run scripts/deploy-scripts` on hardhat folder to begin smart contract creation
- Run `npm run build` on Frontend folder to build frontend `dist` folder
- Run `scp` on host to secure copy privateKey.pem and .env file to Node
- Run `scp` on host to secure copy Frontend dist folder to a node, which will be used to deploy Frontend on ipfs
- On node, run `ipfs add -r` with dist folder, to save dist folder to ipfs
- run `ipfs name publish` with hash of dist folder, to enable `ipns` naming service, which enable frontend hosting on ipfs
- Access Frontend from host browser, then import keystore file on metamask
- Login with metamask, create new user account to use
- Access Node system, clone repository, and run `pip install` to install required package
- Run `node.py` to run Node System

## Published Paper 📃
Published Paper titled Electronic Access Control System Based On Blockchain is being submitted. Paper draft available on this repository.

## Work in Progress 👷‍♂️
- Bash Scripting  or Makefile for automation
- Clean Coding on systems
- `docker-compose` file to deploy `fluentd` and `nginx` services stacks

## Known issue ❗
- Tensorflow must be self compiled on Raspberry Pi OS. 
- `node.py` initialization consume too much time.