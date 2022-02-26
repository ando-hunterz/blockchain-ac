// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UserToken is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, AccessControlEnumerable  {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DISABLED_ROLE = keccak256("DISABLE_ROLE");
    address _owner;
    address[] private userAccounts;
    bytes32[] private userHash;
    mapping(bytes32 => bool) private hasUser;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("UserToken", "UTK") {
        _owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, string memory uri, bytes32 _hash) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        userAccounts.push(to);
        userHash.push(_hash);
        hasUser[_hash] = true;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function getUser() public view onlyRole(MINTER_ROLE) returns (address[] memory) {
        return userAccounts;
    }

    function checkUser(bytes32 _hash) public view returns (bool) {
        return hasUser[_hash];
    }

    function updateUserMetadata(uint256 tokenId, string memory uri) public onlyRole(MINTER_ROLE) {
        _setTokenURI(tokenId, uri);
    }

    function disableUser(address to) public onlyRole(MINTER_ROLE) returns (bool) {
        _grantRole(DISABLED_ROLE, to);
        return hasRole(DISABLED_ROLE, to);
    }

    function updateUserBalance(address _to) public payable onlyRole(MINTER_ROLE) returns (bool) {
        (bool amountSent, ) = _to.call{value: msg.value}("");
        return amountSent;
    }

    receive() external payable {}

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
