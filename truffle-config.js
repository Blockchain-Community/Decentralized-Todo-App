const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();

const { API_KEY, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(MNEMONIC, API_KEY)
      }, 
      network_id: 3
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