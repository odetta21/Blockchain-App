const { expect } = require("chai");

describe("MySaving Contract", function () {
    let mySaving, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2, _] = await ethers.getSigners();
        const MySaving = await ethers.getContractFactory("MySaving");
        mySaving = await MySaving.deploy();
        await mySaving.deployed();
    });

    it("Should allow deposits and update user balance", async function () {
        await mySaving.connect(addr1).deposit({ value: ethers.utils.parseEther("1.0") });
        expect(await mySaving.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("1.0"));
    });

    it("Should allow users to withdraw their funds", async function () {
        await mySaving.connect(addr1).deposit({ value: ethers.utils.parseEther("1.0") });
        await mySaving.connect(addr1).withdraw(ethers.utils.parseEther("0.5"));
        expect(await mySaving.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("0.5"));
    });

    it("Should allow only owner to pause and unpause withdrawals", async function () {
        await mySaving.connect(owner).pause();
        await expect(mySaving.connect(addr1).withdraw(ethers.utils.parseEther("0.5")))
            .to.be.revertedWith("Pausable: paused");
        await mySaving.connect(owner).unpause();
    });

    it("Should emit Deposit and Withdrawal events", async function () {
        await expect(mySaving.connect(addr1).deposit({ value: ethers.utils.parseEther("1.0") }))
            .to.emit(mySaving, "Deposit").withArgs(addr1.address, ethers.utils.parseEther("1.0"));

        await expect(mySaving.connect(addr1).withdraw(ethers.utils.parseEther("0.5")))
            .to.emit(mySaving, "Withdrawal").withArgs(addr1.address, ethers.utils.parseEther("0.5"));
    });
});
