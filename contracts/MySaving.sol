// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MySaving {
    mapping(address => uint256) private balances;
    address private owner;
    bool private paused;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event Paused();
    event Unpaused();

    constructor() {
        owner = msg.sender; // L'adresse qui déploie le contrat devient le propriétaire
        paused = false; // Le contrat est actif par défaut
    }

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function deposit() external payable whenNotPaused {
        require(msg.value > 0, "Deposit must be greater than 0");
        balances[msg.sender] += msg.value;
        emit Deposited(msg.sender, msg.value);
    }

    function withdraw(uint256 amount) external whenNotPaused {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        emit Withdrawn(msg.sender, amount);
    }

    function pause() external onlyOwner {
        paused = true;
        emit Paused();
    }

    function unpause() external onlyOwner {
        paused = false;
        emit Unpaused();
    }

    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}
