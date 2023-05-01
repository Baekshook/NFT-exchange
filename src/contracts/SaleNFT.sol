// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.19;

// import "./MintNFT.sol";

// contract SaleNFT {
//     MintNft public mintTokenAddress;

//     constructor (address _mintTokenAddress) {
//         mintTokenAddress = MintNft(_mintTokenAddress);
//     }

//     mapping(uint256 => uint256) public tokenPrices;

//     uint256[] public onSaleTokenArray;

//     function setForSaleToken(uint256 _tokenId, uint256 _price) public {
//         address tokenOwner = mintTokenAddress.ownerOf(_tokenId);

//         require(tokenOwner == msg.sender, "Caller is not animal token owner.");
//         require(_price > 0, "Price is zero or lower.");
//         require(tokenPrices[_tokenId] == 0, "This animal token is already on sale.");
//         require(mintTokenAddress.isApprovedForAll(tokenOwner, address(this)), "Animal token owner did not approve token.");

//         tokenPrices[_tokenId] = _price;

//         onSaleTokenArray.push(_tokenId);
//     }

//     function purchaseToken(uint256 _tokenId) public payable {
//         uint256 price = tokenPrices[_tokenId];
//         address tokenOnwer = mintTokenAddress.ownerOf(_tokenId);

//         require(price > 0, "Animal token not sale.");
//         require(price <= msg.value, "Caller sent lower than price.");
//         require(tokenOnwer != msg.sender, "Caller is animal token owner.");

//         payable(tokenOnwer).transfer(msg.value);
//         mintTokenAddress.safeTransferFrom(tokenOnwer, msg.sender, _tokenId);

//         tokenPrices[_tokenId] = 0;

//         for(uint256 i = 0; i < onSaleTokenArray.length; i++) {
//             if(tokenPrices[onSaleTokenArray[i]] == 0) {
//                 onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
//                 onSaleTokenArray.pop();
//             }
//         }
//     }

//     function getOnSaleArrayLength() view public returns (uint256) {
//         return onSaleTokenArray.length;
//     }

//     function getTokenPrice(uint256 _animalTokenId) view public returns (uint256) {
//         return tokenPrices[_animalTokenId];
//     }
// }