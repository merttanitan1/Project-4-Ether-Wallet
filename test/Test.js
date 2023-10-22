const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Simple Ether Wallet", function (){
    beforeEach(async function () {
        [owner, adr1] = await ethers.getSigners();

        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();

        Wallet = await ethers.getContractFactory("SimpleEtherWallet");
        wallet = await Wallet.deploy(token);

        await token.connect(owner).mint(adr1, 1);
        await token.connect(owner).approve(wallet, '10000');
        await token.connect(adr1).approve(wallet, '10000');
    });

    it("Should Deposit", async function () {
        const returns = await token.balanceOf(adr1);
        await wallet.connect(adr1).deposit(50);

        expect(await wallet.balances(adr1)).to.equal(50);
        expect(await token.balanceOf(adr1)).to.equal(returns - BigInt(50));
    });

    it("Should Withdraw", async function() {
        const returns = await token.balanceOf(adr1.address);
        await wallet.connect(adr1).deposit(50);
        await wallet.connect(adr1).withdrawBalance(40);
        
        expect(await wallet.balances(adr1)).to.equal(10);
        expect(await token.balanceOf(adr1)).to.equal(returns - BigInt(10));
    });

    it("Should Transfer", async function () {
        await wallet.connect(owner).deposit(50);
        await wallet.connect(owner).transfer(adr1.address, 40);

        expect(await wallet.balances(adr1)).to.equal(40);
        expect(await wallet.balances(owner)).to.equal(10);
    });

    it("Should Transfer & Withdraw", async function () {
        const returns = await token.balanceOf(adr1.address);
        await wallet.connect(owner).deposit(50);
        await wallet.connect(owner).transfer(adr1.address, 40);

        expect(await wallet.balances(adr1)).to.equal(40);
        expect(await wallet.balances(owner)).to.equal(10);

        await wallet.connect(adr1).withdrawBalance(40);
        expect(await wallet.balances(adr1)).to.equal(0);
        expect(await token.balanceOf(adr1)).to.equal(returns + BigInt(40));
    });
});