const {getNamedAccounts, ethers} =require("hardhat")

const AMOUNT= ethers.utils.parseEther("0.02")

async function getWeth(){
   const {deployer} = await getNamedAccounts()
   // call the deposit function 
    // 1. inother to interact with another contract we need
          // 1. abi - This can be gotten from the deployed contracts 🖊🖍
           //   2. contract-Address - 👩‍💻   0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
     const Iweth= await ethers.getContractAt("IWeth","0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",deployer)

      const tx= await Iweth.deposit({value: AMOUNT}) // To deposit some amount of eth to get tokens
      await tx.wait(1)
      const wethBalance = await Iweth.balanceOf(deployer) // To get the balance of the deployer
      //20000000000000000
      console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports={
  getWeth,
  AMOUNT
}