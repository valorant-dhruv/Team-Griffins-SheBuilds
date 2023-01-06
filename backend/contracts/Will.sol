pragma solidity ^0.8.0;

contract Will
{
    /*
    Types of property 
    movable and immovable property
    A will is created by the lawyer
    two people in proof verfies the will 
    */
        
       struct Create_will
       {
           address Owner;
           string Owner_name;
           string property_type;
           string property_description;
           string property_declartion;
           address[] nominies_addr;
           string[] nominies_name;
           string contentid;
           
       }

    Create_will[] create_will;
    mapping(address => Create_will)public Will_Link;
    uint  i = 0;//content ID;
    function WillCreate(address _Owner,string memory _OwnerName,string memory _Property_type,string memory _property_description,string memory _property_declartion,address[] calldata _nominies_addr,string[] calldata _nominies_name,string memory _contentid)public
    {
        create_will.push(Create_will({Owner:_Owner,Owner_name:_OwnerName,property_type:_Property_type,property_description:_property_description,property_declartion: _property_declartion,nominies_addr:_nominies_addr,nominies_name:_nominies_name,contentid:_contentid}));
        Will_Link[_Owner] = create_will[i];
        i++;
    }
    
}
