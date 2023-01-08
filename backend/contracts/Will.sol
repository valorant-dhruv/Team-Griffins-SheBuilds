//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import "./Lawyer.sol";

//This is the smart contract address
//0xE4B968233ba33E4B80F54cc8cf40195db035eCdE

//This is the link 
//https://mumbai.polygonscan.com/address/0xE4B968233ba33E4B80F54cc8cf40195db035eCdE#code
contract Will
{
    /*
    Types of property 
    movable and immovable property
    A will is created by the lawyer
    two people in proof verfies the will 
    */

    //We also randomly assign a lawyer to a respective account address
    //Here we take two kinds of mapping
    //Mapping from the user account address to the lawyer account address
    mapping(address=>address) public userlawyer;

    mapping(address=>address[]) public lawyerassigned;

    //We also need to identify which document of the user needs to be verified
    mapping(address=>mapping(address=>uint)) public whatdocumentlawyer;


    //We are creating a variable for the lawyer
    Lawyer public lawyer;

    //Now inside the constructor we assign the values of the lawyer to the account addresses
    constructor(address _lawyer)
    {
        lawyer=Lawyer(_lawyer);
    }

    uint private count=0;
        
       struct Create_will
       {
           address Owner;
           string Owner_name;
           string property_type;
           string property_description;
           string property_declartion;
           string cid;
           bool verified;
       }

       //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,"Hello","This is my property 1","Property is good","My son A gets 50 and son B gets 50","1"

    Create_will[] public create_will;
    mapping(address=>uint[])public Will_Link;
    function WillCreate(address _Owner,string memory _OwnerName,string memory _Property_type,string memory _property_description,string memory _property_declartion,string calldata _cid)public
    {
        //Inside the Will create
        //We assign all the details of the struct
        //Then after creating the struct we 
        create_will.push(Create_will({Owner:_Owner,Owner_name:_OwnerName,property_type:_Property_type,property_description:_property_description,property_declartion: _property_declartion,cid:_cid,verified:false}));
        Will_Link[msg.sender].push(count);
        count+=1;

        //Now that the will has been created if the lawyer is already present 
        if(userlawyer[_Owner]==address(0))
        {
            //We need to generate an address
            bytes32 temp=lawyer.getRandomWinner();

            //Wait a couple of seconds for the block conformations
            address winnertemp=lawyer.winner();

            //Now that we have got the lawyer address we can assign it to the the mapping
            userlawyer[_Owner]=winnertemp;
            // lawyer.lawyeraccountaddresses[winnertemp]= lawyer.lawyeraccountaddresses[winnertemp].push(winnertemp);
            lawyerassigned[winnertemp].push(_Owner);
        }

         //Then just assign the mapping to the user
          

    }

    //This function will only be called by the lawyer of the smart contract
    function verifydocument(address _addr,uint docnumber) public {
        require(userlawyer[_addr]==msg.sender,"Only the lawyer can verify");

        
        //Now we change the verified status to true
        create_will[docnumber].verified=true;
    }

   function getwillnumber() public view returns(uint[] memory)
   {

       for(uint i=0;i<count;i++)
       {
           if(Will_Link[i]==msg.sender)
           {
               temp[tempvar]=i;
               tempvar++;
           }
       }

    return Will_Link[msg.sender];

   }

    function getwilldetail(uint _num) public view returns(address _Owner,string memory _OwnerName,string memory _Property_type,string memory _property_description,string memory _property_declartion,string memory _cid)
    {
        Create_will memory temp=create_will[_num];
        return (temp.Owner,temp.Owner_name,temp.property_type,temp.property_description,temp.property_declartion,temp.cid);
    }

    receive() external payable{

    }

    fallback() external payable{

    }
  

    
}