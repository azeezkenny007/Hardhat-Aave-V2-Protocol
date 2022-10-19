/** @type import('hardhat/config').HardhatUserConfig */
// require("@nomicfoundation/hardhat-toolbox")
require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const COINMARKET_CAP_API_KEY = process.env.COINMARKET_CAP_API_KEY
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL

module.exports = {
  solidity: {
     compilers:[{version:"0.8.7"},{version:"0.6.6"},{version:"0.4.19"},{version:"0.6.12"},{version:"0.6.0"}]
  },
  defaultNetwork: "hardhat",
     
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },

        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },

        hardhat: {
            chainId: 31337,
            forking:{
               url : MAINNET_RPC_URL
            }
        },

        
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKET_CAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    mocha: {
        timeout: 900000,
    },
}
