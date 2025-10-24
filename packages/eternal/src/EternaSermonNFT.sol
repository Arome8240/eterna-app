// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract EternaSermonNFT is ERC721URIStorage, ERC2981, Ownable {
    uint256 private _tokenIdCounter;

    mapping(uint256 => address) public creatorOf;
    mapping(uint256 => string) public faithOf;

    event SermonMinted(
        uint256 indexed tokenId,
        address indexed creator,
        string tokenURI,
        string faith,
        uint96 royaltyBps
    );

    constructor(
        string memory name_,
        string memory symbol_,
        address initialOwner
    ) ERC721(name_, symbol_) Ownable(initialOwner) {}

    function mintSermonNFT(
        string calldata ipfsURI,
        string calldata faith,
        uint96 royaltyBps
    ) external returns (uint256) {
        require(bytes(ipfsURI).length > 0, "Eterna: ipfsURI empty");
        require(royaltyBps <= 10000, "Eterna: royalty too high");

        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, ipfsURI);
        creatorOf[tokenId] = msg.sender;
        faithOf[tokenId] = faith;

        if (royaltyBps > 0) {
            _setTokenRoyalty(tokenId, msg.sender, royaltyBps);
        }

        emit SermonMinted(tokenId, msg.sender, ipfsURI, faith, royaltyBps);
        return tokenId;
    }

    function setDefaultRoyalty(
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        require(feeNumerator <= 10000, "Eterna: royalty too high");
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function deleteDefaultRoyalty() external onlyOwner {
        _deleteDefaultRoyalty();
    }

    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Eterna: nonexist token");
        require(feeNumerator <= 10000, "Eterna: royalty too high");
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    function adminSetTokenURI(
        uint256 tokenId,
        string calldata newUri
    ) external onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Eterna: nonexist token");
        _setTokenURI(tokenId, newUri);
    }

    function withdrawETH(address payable to) external onlyOwner {
        uint256 bal = address(this).balance;
        require(bal > 0, "Eterna: zero balance");
        (bool ok, ) = to.call{value: bal}("");
        require(ok, "Eterna: withdraw failed");
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    receive() external payable {}
}
