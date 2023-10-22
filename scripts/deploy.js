const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();

  console.log("Token deployed at:", token.target);

  const Wallet = await ethers.getContractFactory("SimpleEtherWallet");
  const contract = await Wallet.deploy(token);
  
  console.log("Contract deployed at:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });