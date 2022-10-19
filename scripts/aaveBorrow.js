const {getWeth,AMOUNT} = require("../scripts/getWeth")
const {getNamedAccounts, ethers} =require("hardhat")
async function main() {
    await getWeth()
    const {deployer} =await getNamedAccounts()
    // How Aave V2 Works
      //1. To get the Lending Pool address we use The lendingPoolProvider address on the mainnet since we are using a forked mainnet chain
           // LendinPoolProvider Address -0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
       // 2. After getting the address the LendingPoolProvider will then point to the address of the LendingPool Protocol for Aave 
       const lendingPool = await getLendingPool(deployer)
       console.log(`Lending Pool address is ${lendingPool.address}`)
       const wethTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
       // To approve that contract address for deposit
       await approveErc20(wethTokenAddress, lendingPool.address, AMOUNT, deployer)


       //Depositing the erc20Token into that address
       console.log("Depositing Token Please Wait !!!!")
       await lendingPool.deposit(wethTokenAddress,AMOUNT, deployer,0)
       console.log("Deposited!!------------Hurray🧨🎇🧨")

       let {availableBorrowsETH,totalDebtETH} = await getBorrowUserData(lendingPool,deployer)

       const daiPrice= await getDaiPrice()
       const amountDaiToBorrow = availableBorrowsETH.toString() * 0.95 * (1 / daiPrice.toNumber())
       console.log(`you can borrow ${amountDaiToBorrow} DAI`)
       const amountDaiToBorrowWei = ethers.utils.parseEther(amountDaiToBorrow.toString())

       //availableBorrowsETH, totalDebtETH  
      //  1.we want to get the conversion rate of the Dai token

       //Borrow
       // inorder to borrow we must know 
          //  1. How much we have borrowed
          //  2. How much we have as collateral
          //  3  How much we can borrow
          const daiTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
          await borrowDai(daiTokenAddress,lendingPool,amountDaiToBorrowWei,deployer)
          await getBorrowUserData(lendingPool,deployer)
          await repay(amountDaiToBorrowWei,daiTokenAddress,lendingPool,deployer)
          await getBorrowUserData(lendingPool,deployer)

}


async function getBorrowUserData(lendingPool,account) {
    const {totalCollateralETH,totalDebtETH,availableBorrowsETH} = await lendingPool.getUserAccountData(account)
    console.log(`you have ${totalCollateralETH} worth of ETH`)
    console.log(`you have ${totalDebtETH} worth of ETH borrowed`)
    console.log(`you can borrow ${availableBorrowsETH} worth of ETH`)
    return {availableBorrowsETH,totalDebtETH}
}

//  This function helps to point to the contract address to be used for the lending protocol from Aave
async function getLendingPool(account){
   const lendingPoolAddressProvider = await ethers.getContractAt("ILendingPoolAddressesProvider","0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",account)
   const LendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
   const LendingPool = await ethers.getContractAt("ILendingPool",LendingPoolAddress,account)
   return LendingPool
}


//This function allows us to repay the loan taken from Aave
async function repay(amount, daiAddress ,lendingPool,account) {
     await approveErc20(daiAddress,lendingPool.address,amount,account)
     const repayTx = await lendingPool.repay(daiAddress,amount,1,account)
     await repayTx.wait(1)
     console.log("Repaid the Loan!!!----------✅✔")
}


//   This function approves the contract address to be able to deposit erc20 Token
async function approveErc20(erc20Address, spenderAddress , amountToSpend ,account){
     const erc20Token = await ethers.getContractAt("IERC20",erc20Address,account)
     const tx = await erc20Token.approve(spenderAddress,amountToSpend)
     await tx.wait(1)
     console.log("Approved!!!!")
}

async function getDaiPrice() {
     const daiEthPriceFeed = await ethers.getContractAt("AggregatorV3Interface","0x773616E4d11A78F511299002da57A0a94577F1f4")
     const price= (await daiEthPriceFeed.latestRoundData())[1]
     console.log(`The DAI ETH price is ${price.toString()} `)
     return price
}

async function borrowDai(daiAddress,lendingpool,amounDaiToBorrowWei,account) {
    const borrowTx = await lendingpool.borrow(daiAddress,amounDaiToBorrowWei,1,0,account)
    await borrowTx.wait(1)
    console.log("you have borrowed!!!!")
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    console.log(e)
    process.exit(1)
  })
