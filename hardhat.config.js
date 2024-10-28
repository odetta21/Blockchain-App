require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",

  
    networks: {

      mainnet: {
          url: "https://mainnet.infura.io/v3/cd6b7e076c7a466eab4c8cf1086ce9e4", // Votre endpoint Infura
          accounts: ["0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b"] // Remplacez par votre clé privée
      }
  
    }

};