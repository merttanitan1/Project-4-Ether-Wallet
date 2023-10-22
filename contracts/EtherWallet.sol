//SPDX-License-Identifier: Unlicensed

pragma solidity 0.8.20;
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SimpleEtherWallet{

    using SafeERC20 for IERC20;

    mapping(address => uint256) public balances;
    IERC20 public token;
    
    constructor(address _tokenAdr){
        token = IERC20(_tokenAdr);
    }

    function deposit(uint256 _amount) external payable{
        require(_amount <= token.balanceOf(msg.sender), "Insufficient balance.");

        balances[msg.sender] += _amount;
        token.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdrawBalance(uint256 _amount) external{ 
        require(_amount <= balances[msg.sender], "You don't have enough balance.");

        balances[msg.sender] -= _amount;
        token.safeTransfer(msg.sender, _amount);
    }

    function transfer(address _adr, uint256 _amount) external {
        require(_amount <= balances[msg.sender], "You don't have enough balance.");
        require(_adr != address(0), "Address cant be empty");

        balances[msg.sender] -= _amount;
        balances[_adr] += _amount;
    }
}