require('dotenv').config()
const path = require("path");
const HDWalletProvider = require('truffle-hdwallet-provider')

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/app/contracts"),
  networks: {
    // Ganache network
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777", // Match ganache network id
      gas: 5000000
    },
    // Goerli network
    goerli: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY)
      },
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      }
    }
  }
};