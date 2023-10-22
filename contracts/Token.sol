// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, ERC20Burnable, Ownable {

    uint256 public mustReturn = 1000*10**decimals();

    constructor() ERC20("Tradasy", "TRD") Ownable(msg.sender) {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());
    }

    function buyOneTrd() public{
        _burn(msg.sender, 1 * 10 ** decimals());
    }

    function buyOneTrdFrom(address account) public{
        _spendAllowance(account, msg.sender, 1 * 10 ** decimals());
        _burn(account, 1 * 10 ** decimals());
    }
}