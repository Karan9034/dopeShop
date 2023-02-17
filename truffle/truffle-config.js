require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const privateKeys = process.env.PRIVATE_KEYS || ""

module.exports = {
  contracts_build_directory: "../client/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    // ropsten: {
    //   provider: function() {
    //     return new HDWalletProvider(
    //       privateKeys.split(','),
    //       `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
    //     )
    //   },
    //   gas: 5000000,
    //   gasPrice: 25000000000,
    //   network_id: 3
    // }
  },
  compilers: {
    solc: {
      version: "0.8.15",
      settings: {
       optimizer: {
         enabled: true,
         runs: 200
       }
      }
    }
  },
};
