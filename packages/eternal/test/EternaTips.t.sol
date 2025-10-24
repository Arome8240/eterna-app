// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/EternaTips.sol";
import "../src/EternaToken.sol";

contract EternaTipsTest is Test {
    EternaTips tips;
    EternaToken token;
    address owner = address(0xABCD);
    address preacher = address(0xBEEF);
    address listener = address(0xCAFE);
    address feeRecipient = address(0xFEE1);

    function setUp() public {
        vm.prank(owner);
        tips = new EternaTips(feeRecipient, 500, owner); // 5% fee
        token = new EternaToken("Eterna Token", "ETR", owner);
        vm.deal(listener, 5 ether);
    }

    function testTipETH() public {
        uint256 preacherBalBefore = tips.ethBalance(preacher);
        uint256 feeRecipientBefore = feeRecipient.balance;

        vm.prank(listener);
        tips.tipETH{value: 1 ether}(preacher);

        uint256 preacherBalAfter = tips.ethBalance(preacher);
        assertEq(preacherBalAfter, preacherBalBefore + 0.95 ether);

        // FeeRecipient should get 0.05 ETH
        assertEq(feeRecipient.balance, feeRecipientBefore + 0.05 ether);
    }

    function testWithdrawETH() public {
        vm.prank(listener);
        tips.tipETH{value: 1 ether}(preacher);

        uint256 preacherBefore = preacher.balance;
        vm.prank(preacher);
        tips.withdrawETH();

        assertEq(preacher.balance, preacherBefore + 0.95 ether);
    }

    function testTipERC20() public {
        vm.startPrank(owner);
        token.mint(listener, 1000 ether);
        vm.stopPrank();

        vm.prank(listener);
        token.approve(address(tips), 1000 ether);

        vm.prank(listener);
        tips.tipERC20(address(token), preacher, 1000 ether);

        assertEq(tips.erc20Balance(preacher, address(token)), 950 ether);
    }

    function testWithdrawERC20() public {
        vm.startPrank(owner);
        token.mint(listener, 1000 ether);
        vm.stopPrank();

        vm.prank(listener);
        token.approve(address(tips), 1000 ether);

        vm.prank(listener);
        tips.tipERC20(address(token), preacher, 1000 ether);

        vm.prank(preacher);
        tips.withdrawERC20(address(token));

        assertEq(token.balanceOf(preacher), 950 ether);
    }
}
