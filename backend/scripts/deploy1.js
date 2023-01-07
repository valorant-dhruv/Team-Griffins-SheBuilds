const hre = require("hardhat");
async function main() {
    const Will= await hre.ethers.getContractFactory("Will");
    const contract = await Will.deploy(); 
    await contract.deployed()
    console.log(`Contract deployed at ${contract.address}`);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });