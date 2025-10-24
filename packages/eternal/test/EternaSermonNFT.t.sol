// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/EternaSermonNFT.sol";

contract EternaSermonNFTTest is Test {
    EternaSermonNFT nft;
    address owner = address(0xABCD);
    address preacher = address(0xBEEF);

    function setUp() public {
        vm.prank(owner);
        nft = new EternaSermonNFT("Eterna Sermon", "ETRN", owner);
    }

    function testMintSermonNFT() public {
        vm.startPrank(preacher);
        uint256 tokenId = nft.mintSermonNFT("ipfs://Qm1", "Christianity", 500);
        vm.stopPrank();

        assertEq(tokenId, 1);
        assertEq(nft.ownerOf(1), preacher);
        assertEq(nft.creatorOf(1), preacher);
    }

    function testSetAndDeleteDefaultRoyalty() public {
        vm.startPrank(owner);
        nft.setDefaultRoyalty(owner, 300);
        nft.deleteDefaultRoyalty();
        vm.stopPrank();
    }

    function testWithdrawETH() public {
        vm.deal(address(nft), 1 ether);
        vm.prank(owner);
        nft.withdrawETH(payable(owner));
        assertEq(address(nft).balance, 0);
    }

    // ✅ Updated to use vm.expectRevert
    function test_RevertWhen_NoETHBalanceToWithdraw() public {
        vm.prank(owner);
        vm.expectRevert(bytes("Eterna: zero balance"));
        nft.withdrawETH(payable(owner));
    }
}
