const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Deploy Token", function () {
  
  let userToken;
  let logToken;

  it("Should return UserToken name", async function () {
    const UserToken = await hre.ethers.getContractFactory("UserToken");
    userToken = await UserToken.deploy();

    expect(await userToken.name(), "UserToken");

  });

  it("Should return LogToken name", async function () {
    const LogToken = await hre.ethers.getContractFactory("LogToken");
    const logToken = await LogToken.deploy(userToken.address);

    expect(await logToken.name(), "LogToken");
  }
  )
});
