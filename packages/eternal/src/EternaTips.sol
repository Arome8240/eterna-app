// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract EternaTips is Ownable {
    using SafeERC20 for IERC20;

    uint256 public platformFeeBps;
    address public feeRecipient;

    mapping(address => uint256) public ethBalance;
    mapping(address => mapping(address => uint256)) public erc20Balance;

    event TipSent(
        address indexed from,
        address indexed to,
        address indexed token,
        uint256 amount,
        uint256 platformFee
    );
    event Withdrawn(address indexed to, address indexed token, uint256 amount);

    constructor(
        address _feeRecipient,
        uint256 _platformFeeBps,
        address initialOwner
    ) Ownable(initialOwner) {
        require(_platformFeeBps <= 10000, "EternaTips: fee too high");
        platformFeeBps = _platformFeeBps;
        feeRecipient = _feeRecipient;
    }

    function tipETH(address preacher) external payable {
        require(preacher != address(0), "EternaTips: invalid preacher");
        require(msg.value > 0, "EternaTips: zero tip");

        uint256 fee = (msg.value * platformFeeBps) / 10000;
        uint256 net = msg.value - fee;

        if (fee > 0 && feeRecipient != address(0)) {
            (bool ok, ) = feeRecipient.call{value: fee}("");
            require(ok, "EternaTips: fee transfer failed");
        }

        ethBalance[preacher] += net;
        emit TipSent(msg.sender, preacher, address(0), msg.value, fee);
    }

    function tipERC20(
        address token,
        address preacher,
        uint256 amount
    ) external {
        require(preacher != address(0), "EternaTips: invalid preacher");
        require(amount > 0, "EternaTips: zero amount");
        require(token != address(0), "EternaTips: invalid token");

        IERC20 tokenContract = IERC20(token);
        uint256 fee = (amount * platformFeeBps) / 10000;
        uint256 net = amount - fee;

        tokenContract.safeTransferFrom(msg.sender, address(this), amount);
        if (fee > 0 && feeRecipient != address(0)) {
            tokenContract.safeTransfer(feeRecipient, fee);
        }

        erc20Balance[preacher][token] += net;
        emit TipSent(msg.sender, preacher, token, amount, fee);
    }

    function withdrawETH() external {
        uint256 bal = ethBalance[msg.sender];
        require(bal > 0, "EternaTips: zero balance");
        ethBalance[msg.sender] = 0;
        (bool ok, ) = payable(msg.sender).call{value: bal}("");
        require(ok, "EternaTips: withdraw failed");
        emit Withdrawn(msg.sender, address(0), bal);
    }

    function withdrawERC20(address token) external {
        uint256 bal = erc20Balance[msg.sender][token];
        require(bal > 0, "EternaTips: zero balance");
        erc20Balance[msg.sender][token] = 0;
        IERC20(token).safeTransfer(msg.sender, bal);
        emit Withdrawn(msg.sender, token, bal);
    }

    function setPlatformFee(
        uint256 _platformFeeBps,
        address _feeRecipient
    ) external onlyOwner {
        require(_platformFeeBps <= 10000, "EternaTips: fee too high");
        platformFeeBps = _platformFeeBps;
        feeRecipient = _feeRecipient;
    }

    function ownerRecoverERC20(
        address token,
        address to,
        uint256 amount
    ) external onlyOwner {
        IERC20(token).safeTransfer(to, amount);
    }

    function ownerRecoverETH(
        address payable to,
        uint256 amount
    ) external onlyOwner {
        (bool ok, ) = to.call{value: amount}("");
        require(ok, "EternaTips: owner recover failed");
    }

    receive() external payable {}
}
