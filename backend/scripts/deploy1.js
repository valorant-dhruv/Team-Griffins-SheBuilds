const hre = require("hardhat");
async function main() {
  const lawyercontractaddress = "0xfC098079A22D7548c28A52928D1581a1d486436c";
  const Will = await hre.ethers.getContractFactory("Will");
  const contract = await Will.deploy(lawyercontractaddress);
  await contract.deployed();
  console.log(`Contract deployed at ${contract.address}`);

  console.log("Verify Contract Address:", contract.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: [lawyercontractaddress],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
