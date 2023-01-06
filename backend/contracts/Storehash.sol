//This is the solidity smart contract that stores the hash of the document that is stored in the IPFS

//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 <0.9.0;

contract Storehash{
    //Inside the smart contract once when the data is stored inside the ipfs we get the content id of that image

    //Hence we create a mapping for it
    mapping(address=>string) public storefiles;

    //This is the function that stores the files
    function storefile(string memory cid) public returns(bytes32)
    {
        //Now that we got the content id of the particular file we encode
        storefiles[msg.sender]=cid;
    }
}