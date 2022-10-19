# Aave-v2 Defi protocol Explained

Deposit Collateral: ETH / WETH ✅

Borrow another Asset : DAI

Repay the loan 

<div style="margin-top:60px"></div>

# 🔗 What is Aave
 ```Aave is a borrowing and lending defi protocol,That allows you to put  some collateral and yield profit the more people use the protocol, you can borrow some sort of ERC20Token and repay , but you are not allowed to borrow more than a certain percentage of your stake```


<div style="margin-top:60px"></div>

# 💨💨How does the Aave-v2 protocol work?

1. We can get access to the WETH contract address for mainnet and attached a deployer and ABI since that is the way we interact with a contract
2. Deposit a Eth in the form of an ERC20 Token known as (WETH)
3. We then use the ```balanceof``` method to ensure the balance was properly deposited into the account
4. Inorder to interact with the Aave V2 defi protocol, we then use the 
   * ```lendingPoolAddressProvider```- This contract has a method called ```getLendingPool``` - This method tells us the contract address of the lendingPool smart contract

5. Before we can deposit our ERC20Token, payDebt , or borrow , we need to first verify and approve Erc20Token to ensure it is given access for such actions 
6. We use ChainLink PriceFeeds to get the price of DAI/ETH --how is this made possible without the mock
      * We did a mainnet forking - which means having a copy of all the priceFeeds , transaction Records into my local machine , this does not distrupt the working flow of the blockchain, as it is only a simulation of the real chain
    * Connection made possible using Alchemy Api-Keys
