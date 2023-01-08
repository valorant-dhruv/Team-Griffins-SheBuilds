import React, { useEffect, useContext } from "react";
import { useState } from "react";
import Web3 from "web3";
// import SimpleContract from "./SimpleContract.json";
// import Login from "./Login.json";
import { ethers } from "ethers";
import Context from "./Context";

export default function Walletconnect() {
  //   const [walletaddress, setwalletaddress] = useState("");
  let { walletaddress, setwalletaddress, web3, setweb3 } = useContext(Context);
  const [provider, setprovider] = useState();
  const [signer, setsigner] = useState();
  useEffect(() => {
    //Now we create an instance of the web3 object
    async function getaccount() {
      let _web3 = new Web3(
        "https://eth-goerli.g.alchemy.com/v2/QJU1kk8nts_1YglpAakNidoPBlszShnl"
      );
      console.log(web3);
      console.log(typeof _web3.eth);
      setweb3(_web3);

      if (!window.ethereum) {
        alert("No metamask wallet found please use one");
      } else if (window.ethereum) {
        console.log("Metamask wallet detected");

        //Now as the metamask wallet is detected we now get the details of all the accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log(accounts[0]);
        setwalletaddress(accounts[0]);

        //Now as we have got the account address let us also get the signer and the provider of the account
        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
        );
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        console.log(
          "These are the signers and providers:",
          provider,
          "and",
          signer
        );

        setprovider(provider);
        setsigner(signer);
      }
    }

    getaccount();
  }, []);

  return (
    <div>
      <h1>Your metamask wallet is now connected</h1>
      <h2>Wallet address is :{walletaddress}</h2>
      <br />
      <hr />
      <h1>
        Welcome to team griffins property documents upload and verification
        polygon application
      </h1>
    </div>
  );
}
