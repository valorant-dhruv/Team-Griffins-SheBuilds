//This is the lawyer smart contract where each lawyer is assigned a specific account/person to verify

//SPDX-License-Identifier:MIT

pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

//This is the contract address
//0xfC098079A22D7548c28A52928D1581a1d486436c

//This is the link of the smart contract
//https://mumbai.polygonscan.com/address/0xfC098079A22D7548c28A52928D1581a1d486436c#code

contract Lawyer is VRFConsumerBase,Ownable{

    //This is the array which holds all the account addresses of the lawyers
    address [] private lawyerslist;

    address public winner;
    uint256 public randomnumber;

    //This is the count variable which maintains a list of all the lawyers that are a part of verification process
    uint public count=2;

     // The amount of LINK to send with the request
    uint256 public fee;
    // ID of public key against which randomness is generated
    bytes32 public keyHash;

    //Initally let us manually assign two lawyers to this contract
    constructor(address _addr1,address _addr2,address vrfCoordinator, address linkToken,
    bytes32 vrfKeyHash, uint256 vrfFee) VRFConsumerBase(vrfCoordinator,linkToken) 
    {
        lawyerslist.push(_addr1);
        lawyerslist.push(_addr2);
         keyHash = vrfKeyHash;
        fee = vrfFee;
    }

    //Now this is the function where a new can be added
    //Also the new lawyer needs to prove that he/she is a lawyer but the verification process will be done later

    //For that we need to use an external api and hence the 
    function newLawyer(string calldata lawyername,uint lawyerid) external returns(bool)
    {
        //Now the verification process starts of this account address
        //However here we are not verifying for now
        lawyerslist.push(msg.sender);

        count++;
        return true;
    }

    //Now using the chainlink VRFs we generate a random number to assign a lawyer based on the number generated
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal virtual override  {
        // We want out winnerIndex to be in the length from 0 to players.length-1
        // For this we mod it with the player.length value
        uint256 winnerIndex = randomness % count;
        // get the address of the winner from the players array
        address winner = lawyerslist[winnerIndex];
        returnlawyeraddress(winnerIndex,winner);

    }

    function returnlawyeraddress(uint256 winningIndex,address _winner) public returns(address)
    {
        winner=_winner;
        randomnumber=winningIndex;
         return winner;
    }

    /**
    * getRandomWinner is called to start the process of selecting a random winner
    */
    function getRandomWinner() public returns (bytes32 requestId) {
        // LINK is an internal interface for Link token found within the VRFConsumerBase
        // Here we use the balanceOF method from that interface to make sure that our
        // contract has enough link so that we can request the VRFCoordinator for randomness
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        // Make a request to the VRF coordinator.
        // requestRandomness is a function within the VRFConsumerBase
        // it starts the process of randomness generation
        return requestRandomness(keyHash, fee);
    }
}