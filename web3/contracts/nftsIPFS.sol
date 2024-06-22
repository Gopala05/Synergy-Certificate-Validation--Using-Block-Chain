// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable public contractOwner;
    uint256 public listingPrice = 0.015 ether;

    struct NFTs {
        string title;
        string certificateID;
        string userEmail;
        string organisation;
        string creatorID;
        uint256 fundraised;
        address creator;
        string certificate;
        uint256 timestamp;
        uint256 id;
    }

    mapping(uint256 => NFTs) public nftImages;
    uint256 public imagesCount;

    constructor() {
        contractOwner = payable(0xD031aD995A12390f0D4e4b85d46C120d08fd8ea4);
    }

    function uploadIPFS(
        string memory _title, 
        string memory _certificateID,
        string memory _userEmail,
        string memory _organisation,
        string memory _creatorID,
        address _creator, 
        string memory _certificate 
    ) public payable returns (
        string memory,
        string memory,
        string memory,
        string memory,
        string memory,
        address,
        string memory
    ) {
        require(msg.value >= listingPrice, "Insufficient funds to upload IPFS");

        // Increment the image count
        imagesCount++;
        NFTs storage nft = nftImages[imagesCount];
        
        // Set NFT properties
        nft.title = _title;
        nft.certificateID = _certificateID;
        nft.userEmail = _userEmail;
        nft.organisation = _organisation;
        nft.creatorID = _creatorID;
        nft.creator = _creator;
        nft.certificate = _certificate;
        nft.timestamp = block.timestamp;
        nft.id = imagesCount;

        // Transfer listing fee to contract owner
        contractOwner.transfer(msg.value);

        // Return the details of the uploaded image
        return (
            _title,
            _certificateID,
            _userEmail,
            _organisation,
            _creatorID,
            _creator,
            _certificate
        );
    }

    function getAllNFTs() public view returns (NFTs[] memory) {
        uint256 itemCount = imagesCount;
        uint256 currentIndex = 0;

        NFTs[] memory items = new NFTs[](itemCount);
        for (uint256 i = 1; i <= itemCount; i++) {
            NFTs storage currentItem = nftImages[i];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function fetchNFTByCertificateID(string memory _certificateID) public view returns (NFTs memory) {
        for (uint256 i = 1; i <= imagesCount; i++) {
            if (keccak256(abi.encodePacked(nftImages[i].certificateID)) == keccak256(abi.encodePacked(_certificateID))) {
                return nftImages[i];
            }
        }
        revert("NFT with the given certificate ID does not exist");
    }
}
