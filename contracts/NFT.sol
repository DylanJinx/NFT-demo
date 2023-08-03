// contracts/MyErc721.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyErc721 is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address feeCollector;
    uint fee = 1 gwei;

    constructor(address fc) ERC721("DylanNFT", "DNFT") {
        feeCollector = fc;
    }
    
    function withdraw(address to) external {
        require(msg.sender == feeCollector, "no permission!");
        (bool suc, bytes memory data) = to.call{value: address(this).balance}("");
        require(suc, "withdraw failed");
    }

    function mint(address to, string memory tokenURI)
        public payable
        returns (uint256)
    {
        require(msg.value >= fee, "plaese privide fee");
        // 计数器是递增的，将当前值（初始值为0）给tokenId
        uint256 newItemId = _tokenIds.current();
        _mint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // 计数器用一次增加1
        _tokenIds.increment();
        return newItemId;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // 0x80ac58cd = IERC721  0x780e9d63 = IERC721Enumerable  0x49064906 = ERC721URIStorage
    function supportsInterface(bytes4 interfaceId) public pure override(ERC721URIStorage, ERC721Enumerable) returns (bool) {
        return interfaceId == type(IERC721Enumerable).interfaceId || interfaceId == bytes4(0x49064906) || interfaceId == type(IERC721).interfaceId;
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns(string memory) {
        return super.tokenURI(tokenId);
    }
}