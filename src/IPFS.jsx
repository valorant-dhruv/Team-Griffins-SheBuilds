import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import Axios from "axios";
import Context from "./Context";
import Web3 from "web3";
import { ethers } from "ethers";

import Signing from "./Signing.json";

export default function IPFSuploadfunction() {
  //This is the http url
  let urlupload = useRef();
  let urlretrive = useRef();
  let signing = useRef();

  let { walletaddress, setwalletaddress } = useContext(Context);

  let [propertytype, setpropertytype] = useState("");
  let [propertydescription, setpropertydescription] = useState("");
  let [ownername, setownername] = useState("");
  let [cid, setcid] = useState("");

  let [showform, setshowform] = useState(false);

  let [propertydeclaration, setpropertydeclaration] = useState("");
  const [file, setFile] = useState();
  const [web3, setweb3] = useState();

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    let _web3 = new Web3(
      "https://eth-goerli.g.alchemy.com/v2/QJU1kk8nts_1YglpAakNidoPBlszShnl"
    );
    console.log(typeof _web3.eth);

    //Here we are assigning the url with something
    urlupload.current = "https://api.web3.storage/upload";
    urlretrive.current = `https://api.web3.storage/user/uploads/`;

    //Also these api endpoints are locked and hence we need an API key in order to make a request

    //Now we also create an instance of the Signing smart contract
    async function createinstances() {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      // await provider.send("eth_requestAccounts", []);
      // const signer = await provider.getSigner();
      signing.current = await new ethers.Contract(
        "0x00f35392CFEA95905d8067f3411f134C6ec4E25b",
        Signing.abi,
        provider
      );

      console.log(
        signing.current,
        "This is the instance of the smart contract"
      );
    }

    createinstances();
    console.log("The instaces are created");
    setweb3(_web3);
  }, []);

  //Now we upload the file to the ipfs
  //Using the url and we also need an Authorization header for that
  async function uploaddata() {
    // Now we make a request
    let response = await fetch(urlupload.current, {
      method: "POST",
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVkMWExMkEzYjY1NDM0Y0Y2NTVCNzk3MjlFQkYyQzcyRDZhMDBDRTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzMwMDg5NTA2ODAsIm5hbWUiOiJUZWFtIEdyaWZmaW5zIn0.vGXZDzKM_v_Leg7LdjAddIVPojk0klZZdsjHy_PNMyg`,
      },
      body: {
        file,
      },
    });

    //Now that we have sent a POST request to the API the next task is to fetch the content id
    let cid = await response.json();

    console.log("This is the content id", cid);
    setcid(cid.cid);

    //Once we have got the content id the next step is to sign the message

    //We get some message from the backend and then prompt the user to sign that message
    //The following function has the concept to sign the transactions
    await signTransaction();
  }

  async function signTransaction() {
    console.log("Yeah working on signing the transaction");

    // //Now as the login button has been clicked we will sign a message that  we received from the smart contract
    // //Let us assume this is the message

    let message =
      "So the uploaded property document needs to be signed by the user";

    console.log("This is the message", message);

    // Now we need to get the hash from the message
    let hash = await signing.current.getMessageHash(message);

    console.log("This is the hash that we got from the smart contract");
    console.log(hash);

    // let hash =
    //   "0x9c97d796ed69b7e69790ae723f51163056db3d55a7a6a82065780460162d4812";

    // console.log(web3.eth.personal.sign);

    // let signature = await web3.eth.personal.sign(
    //   message,
    //   walletaddress,
    //   "test password!"
    // );

    // let data = await web3.eth.sign("Hello world", walletaddress);
    // //sign(keccak256("\x19Ethereum Signed Message:\n" + dataToSign.length + dataToSign)))

    // let balance = await web3.eth.getBalance(walletaddress);
    // console.log(balance);

    // console.log("This is the signature", data);

    let data = await window.ethereum.request({
      method: "personal_sign",
      params: [walletaddress, hash],
    });

    console.log("This is the signature data:", data);

    let final = await signing.current.verify(walletaddress, message, data);
    console.log("After verifying the user the data that we got is:");
    console.log(final);

    //Now that we have signed the document the next step is to show the input form to enter the details
    if (final === false) {
      alert(
        "There is some error in authenticating the message please try again"
      );
    } else {
      setshowform(true);
    }
  }

  if (showform) {
    return (
      <div>
        <form>
          <label>Owner account address: </label>
          <input
            placeholder="The account address of the owner"
            value={walletaddress}
          ></input>
          <br />
          <label>Name of the owner: </label>
          <input
            placeholder="The name of the owner"
            value={ownername}
            onChange={(e) => {
              setownername(e.target.value);
            }}
          ></input>
          <br />
          <label>Property Type: </label>
          <input
            placeholder="The property type of the owner"
            value={propertytype}
            onChange={(e) => {
              setpropertytype(e.target.value);
            }}
          ></input>
          <br />
          <label>Property Description: </label>
          <input
            placeholder="Property description of the owner"
            value={propertydeclaration}
            onChange={(e) => {
              setpropertydescription(e.target.value);
            }}
          ></input>
          <br />
          <label>Property declaration: </label>
          <input
            placeholder="Property declaration of the owner"
            value={propertydescription}
            onChange={(e) => {
              setpropertydeclaration(e.target.value);
            }}
          ></input>
          <br />
          <label>Content id: </label>
          <input placeholder="Content id of document" value={cid}></input>
        </form>
      </div>
    );
  } else {
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>
      <button
        onClick={(e) => {
          uploaddata();
        }}
      >
        Click to upload data
      </button>
    </div>
  );
}
