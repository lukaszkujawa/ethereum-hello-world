// Ganache NetworkID - it's displayed in the UI at the top
const CONF_NETWROK_ID = 5777

const fs = require('fs');

// Load HelloWorld contract status created by truffle compile & migrate
const contract_raw = JSON.parse(fs.readFileSync('./build/contracts/HelloWorld.json', 'utf8'));

const getContract = (networkId)=> new web3.eth.Contract(contract_raw.abi, getContractAddress(networkId))

const getContractAddress = (networkId) => {
  return contract_raw.networks[networkId].address
}

/**
  As per documentation:
    https://www.trufflesuite.com/docs/truffle/getting-started/writing-external-scripts
*/
module.exports = async (callback) => {
  let contract = getContract(CONF_NETWROK_ID)

  /*
    This won't work without websockets enabled in truffle-config.js (it's enabled)

    Every time this script is run a new event listener will be set. This will
    cause the same message being displayed multiple times.
  */
  contract.events.Incremented({}, (error, event) => {
    console.log("\n")
    console.log("+-------------------------------------------------------------------+")
    console.log("| Event emitted by the contract                                     |")
    console.log("| Event triggered by: " + event.returnValues.sender + "    |")
    console.log("| The new counter value is: " + event.returnValues.value )
    console.log("+-------------------------------------------------------------------+\n")
  })

  try {

    let accounts = await web3.eth.getAccounts()
    let account = accounts[0]

    console.log("==================")

    console.log(" > Account that will pay for transaction gas: ", account)

    let countBefore = await contract.methods.counter().call()
    console.log(" > Counter value before creating a transaction: ", countBefore)

    let receipt = await contract.methods.inc().send({from: account})

    let countAfter = await contract.methods.counter().call()

    console.log(" > Counter value after creating the transaction: ", countAfter)

    console.log("==================\n")

    callback()
  }
  catch(e) {
    console.log("Something went wrong?!")
    console.log(e)
  }


}
