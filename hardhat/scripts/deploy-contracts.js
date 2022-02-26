// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  console.log("Deploying UserToken")

  const UserToken = await hre.ethers.getContractFactory("UserToken");
  const userToken = await UserToken.deploy();

  console.log(await userToken.address);

  console.log("Deploying LogToken")

  const LogToken = await hre.ethers.getContractFactory("LogToken");
  const logToken = await LogToken.deploy(userToken.address);

  console.log(await logToken.address);

  // console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
