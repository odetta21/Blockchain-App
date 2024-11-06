// scripts/deploy.js
//const ethers = require("ethers")

//const { ethers, JsonRpcProvider } = require('ethers');smooth search vanish hollow sustain action horse tongue scorpion fantasy sense mix

require("dotenv").config();
const { ethers } = require("hardhat");
const hre = require("hardhat")

//import { hre } from "hardhat";


async function main() {
    
    // Définir la clé privée de votre portefeuille
    const privateKey = `${process.env.PRIVATE_KEY}`; // Remplacez par votre clé privée

    // Créer un fournisseur avec Infura
    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);
    
    // Créer un wallet à partir de la clé privée
    const wallet = new ethers.Wallet(privateKey, provider);

    // Obtenir le contrat factory
    const MySaving = await ethers.getContractFactory("MySaving", wallet);

    // Déployer le contrat
    const mySaving = await MySaving.deploy();

    // Attendre que le contrat soit déployé
    await mySaving.deployed();

    console.log("MySaving deployed to:", mySaving.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
