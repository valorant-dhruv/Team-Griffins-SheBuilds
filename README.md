# Team-Griffins-SheBuilds

This is a project that is build on the polygon mumbai testnet

In this project first of all the users can connect their metamask wallet with our website and once they are connnected the user can upload any property document using 
upload feature. Once the document is uploaded in the IPFS it returns a content id and the user needs to sign a message to authenticate that the sender is the uploader of
the document. For this we have used a smart contract called Signing.sol which has a lot of functions to hash the message and authenticate the user

![image](https://user-images.githubusercontent.com/78591597/211187764-0aa464ff-3edd-4790-ab12-0917a550eb8b.png)

![image](https://user-images.githubusercontent.com/78591597/211187788-bedd0cdc-54b1-4f64-87a6-e5c853919bfb.png)

![image](https://user-images.githubusercontent.com/78591597/211187813-415096bd-4d93-4685-9cf9-1c61409d8a04.png)

![image](https://user-images.githubusercontent.com/78591597/211187883-0470f28f-1bed-40b7-a9dc-11726adee594.png)

Now the user can fill in the basic details of the property including the property will. Once all this data is filled the data is stored inside the Will.sol smart contract
and using the ChainLink's VRF we generate a random number and based on the generated random number a lawyer is assigned to the user

![image](https://user-images.githubusercontent.com/78591597/211187900-1c79e6b4-42a6-4ab2-b570-e7ee1a2aab5e.png)

![image](https://user-images.githubusercontent.com/78591597/211187930-bb0b462e-0a85-44ee-b90d-0577f4612f60.png)

![image](https://user-images.githubusercontent.com/78591597/211187955-606ca98f-8016-4897-af5b-dde187672d3b.png)

![image](https://user-images.githubusercontent.com/78591597/211187967-3e0a58bb-6bae-47ab-92f3-1ff040c7de3d.png)


Now the lawyer sees the user's will and the uploaded documents inside the portal and verifies these documents with the help of Lawyer.sol smart contract. Once the
document is verified it is available  in the portal and the users now have signed and verified documents on chain so that it can resolve any property disputes in the
future
