// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/EternaToken.sol";

contract EternaTokenTest is Test {
    EternaToken token;
    address owner = address(0xABCD);
    address user = address(0xBEEF);

    function setUp() public {
        vm.prank(owner);
        token = new EternaToken("Eterna Token", "ETR", owner);
    }

    function testMint() public {
        vm.prank(owner);
        token.mint(user, 1000 ether);
        assertEq(token.balanceOf(user), 1000 ether);
    }

    // ✅ Updated to proper revert syntax
    function test_RevertWhen_NonOwnerMints() public {
        vm.prank(user);
        vm.expectRevert(); // default expect any revert
        token.mint(user, 100 ether);
    }

    function testBurn() public {
        vm.startPrank(owner);
        token.mint(user, 100 ether);
        token.burnFrom(user, 50 ether);
        vm.stopPrank();
        assertEq(token.balanceOf(user), 50 ether);
    }
}
