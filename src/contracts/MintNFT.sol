// // SPDX-License-Identifier: MIT
 
// pragma solidity ^0.8.19;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
// import "./SaleNFT.sol";

// contract MintNft is ERC721Enumerable {
//     string public metadataUri;
//     uint public totalNft;
//     uint public mintedNft;

//     SaleNFT public saleNft;

//     constructor(
//         string memory _name, 
//         string memory _symbol, 
//         string memory _metadataUri, 
//         uint _totalNft
//     ) ERC721(_name, _symbol) {
//         metadataUri = _metadataUri;
//         totalNft = _totalNft;
//     }

//      struct TokenData {
//         uint256 tokenId;
//         uint256 tokenPrice;
//     }

//     function mintNft() public {
//         require(totalNft > mintedNft, "No more mint.");

//         mintedNft++;

//         _mint(msg.sender, mintedNft);
//     }

//     function batchMint(uint _amount) public {
//         for(uint i = 0; i < _amount; i++) {
//             mintNft();
//         }
//     }

//     function tokenURI(uint _tokenId) public override view returns(string memory) {
//         return string(abi.encodePacked(metadataUri, '/', Strings.toString(_tokenId), '.json'));
//     }

//     function burnNFT(uint _tokenId) public {
//         require(msg.sender == ownerOf(_tokenId), "Caller is not token owner.");

//         _burn(_tokenId);
//     }

//     function getTokens(address _tokenOwner) view public returns (TokenData[] memory) {
//         uint256 balanceLength = balanceOf(_tokenOwner);

//         require(balanceLength != 0, "Owner did not have token.");

//         TokenData[] memory tokenData = new TokenData[](balanceLength);

//         for(uint256 i = 0; i < balanceLength; i++) {
//             uint256 tokenId = tokenOfOwnerByIndex(_tokenOwner, i);
//             uint256 tokenPrice = saleNft.getTokenPrice(tokenId);

//             tokenData[i] = TokenData(tokenId, tokenPrice);
//         }

//         return tokenData;
//     }

//     function setSaleToken(address _saleToken) public {
//         saleNft = SaleNFT(_saleToken);
//     }
// }