// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract nftsIPFS {
    address payable contractOwner = payable(0xD031aD995A12390f0D4e4b85d46C120d08fd8ea4);
    uint256 public listingPrice = 15000000000000000; // 0.015 ETH in wei;

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
    mapping (uint256 => NFTs) public nftImages;

    uint256 public imagesCount = 0;

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
        for(uint i=1; i <= itemCount; i++) {
            uint256 currentId = i +1;
            NFTs storage currentItem = nftImages[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return items;
    }

    function getImage(uint256 id) external view returns (
        NFTs memory
    ) {
        NFTs memory nfts = nftImages[id];
        return (
            nfts
        );
    }

    /* Updates the listing price for the Contract */
    function updateListingPrice(uint256 _listingPrice, address owner) public payable {
        require(
            contractOwner == owner,
            "Only Contract owner can update listing Price."
        );
        listingPrice = _listingPrice;
    }

    // Donate function
    function donateToImage(uint256 _id) public payable {
        uint256 amount = msg.value;

        NFTs storage nft = nftImages[_id];

        (bool sent,) = payable(nft.creator).call{value: amount}("");

        if(sent) {
            nft.fundraised = nft.fundraised + amount;
        }
    }

    function withdraw(address _owner) external {
        require(_owner == contractOwner, "Only owner can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        contractOwner.transfer(balance);
    }
}