const { ethers } = require("hardhat");

async function main() {
  const LINK_TOKEN = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
  const VRF_COORDINATOR = "0x8C7382F9D8f56b33781fE506E897a4F1e2d17255";
  const KEY_HASH =
    "0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4";
  const FEE = ethers.utils.parseEther("0.0001");
  const addr1 = "0x755E7A5F0332C0E5D81Af09665A971d20872117d";
  const addr2 = "0x6fC88f402E6e8AaC089366F95186dB80675f771d";

  const randomWinnerGame = await ethers.getContractFactory("Lawyer");
  // deploy the contract
  const deployedRandomWinnerGameContract = await randomWinnerGame.deploy(
    addr1,
    addr2,
    VRF_COORDINATOR,
    LINK_TOKEN,
    KEY_HASH,
    FEE
  );

  await deployedRandomWinnerGameContract.deployed();

  //Now that the smart contract has been deployed we can even verify this smart contract
  //Once the smart contract has been deployed now we check the contract address of the deployed smart contract
  console.log(
    "Verify Contract Address:",
    deployedRandomWinnerGameContract.address
  );

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedRandomWinnerGameContract.address,
    constructorArguments: [
      addr1,
      addr2,
      VRF_COORDINATOR,
      LINK_TOKEN,
      KEY_HASH,
      FEE,
    ],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
