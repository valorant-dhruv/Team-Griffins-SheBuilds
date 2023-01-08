require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    polygon_mumbai: {
      url: "",
      accounts: [
        "",
      ],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  //We have described this object so that we can verify our smart contract when it is deployed
  etherscan: {
    apiKey: "",
  },
};
