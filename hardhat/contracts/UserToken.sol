// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract UserToken is ERC721, ERC721Enumerable, ERC721URIStorage, AccessControlEnumerable  {
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant DISABLED_ROLE = keccak256("DISABLE_ROLE");
    address _owner;
    address[] private userAccounts;
    bytes32[] private userHash;
    mapping(bytes32 => bool) private hasUser;
    mapping(address => string) private userDefault;

    event userMint(address indexed to, uint256 indexed tokenId);

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("UserToken", "UTK") {
        _owner = msg.sender;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function safeMint(address to, string memory uri, bytes32 _hash, string memory _uri) public onlyRole(MINTER_ROLE) {
        uint256 tokenId = _tokenIdCounter.current();
        userAccounts.push(to);
        userHash.push(_hash);
        hasUser[_hash] = true;
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        setDefaultKeystore(to, _uri);
        emit userMint(to, tokenId);
    }

    function setDefaultKeystore(address _to, string memory uri) private {
        userDefault[_to] = uri;
    }

    function getDefaultKeystore(address _to) public view onlyRole(MINTER_ROLE) returns (string memory) {
        return userDefault[_to];
    }

    function deleteMapping(bytes32 _hash) public onlyRole(MINTER_ROLE) {
        delete hasUser[_hash];
    }

    function getUsers() public view onlyRole(MINTER_ROLE) returns (uint256) {
        return userAccounts.length;
    }

    function checkUser(bytes32 _hash) public view onlyRole(MINTER_ROLE) returns (bool)  {
        return hasUser[_hash];
    }

    function getUser(uint256 index) public view onlyRole(MINTER_ROLE) returns (address) {
        return userAccounts[index];
    }

    function updatePassword(uint256 tokenId, string memory uri) public {
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "Not own account");
        _setTokenURI(tokenId, uri);
    }

    function updateUserMetadata(uint256 tokenId, string memory uri) public onlyRole(MINTER_ROLE) {
        _setTokenURI(tokenId, uri);
    }

    function disableUser(address to) public onlyRole(MINTER_ROLE) returns (bool) {
        _grantRole(DISABLED_ROLE, to);
        return hasRole(DISABLED_ROLE, to);
    }

    function getUserInfo(address addr) public view returns (string memory) {
       uint tokenId = tokenOfOwnerByIndex(addr, 0);
       return tokenURI(tokenId);
    }

    function updateUser(bytes32 _hash, string memory uri, uint256 tokenId) public onlyRole(MINTER_ROLE) {
        userHash.push(_hash);
        hasUser[_hash] = true;
        _setTokenURI(tokenId, uri);
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
