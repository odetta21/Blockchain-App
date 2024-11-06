require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

//hello

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",

  
    networks: {

      mainnet: {
          url: "https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}", // Votre endpoint Infura
          account: [`${process.env.PRIVATE_KEY}`] // Remplacez par votre clé privée
          
        }
  
    }

};