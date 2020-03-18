const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/app/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777", // Match any network id
      gas: 5000000
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