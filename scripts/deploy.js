// scripts/deploy.js
const hre = require("hardhat")
//import { hre } from "hardhat";


async function main() {
    // Définir la clé privée de votre portefeuille
    const privateKey = "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"; // Remplacez par votre clé privée

    // Créer un fournisseur avec Infura
    const provider = new hre.ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/58e31aec08034ea59d22ba0d7f72ce97");
    
    // Créer un wallet à partir de la clé privée
    const wallet = new hre.ethers.Wallet(privateKey, provider);

    // Obtenir le contrat factory
    const MySaving = await hre.ethers.getContractFactory("MySaving", wallet);

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
