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
      url: "https://ancient-skilled-surf.matic-testnet.discover.quiknode.pro/7b4f309e88e3a92395e1cd3f53a127991cfc40b3/",
      accounts: [
        "0c7fcfbf8330ec840cae0000ba1553f5bcd6070e51747c72c24412b5979fda8f",
      ],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  //We have described this object so that we can verify our smart contract when it is deployed
  etherscan: {
    apiKey: "VAEVU6YVG5VXBZDFXHP2NAK8XRWADATSA6",
  },
};
