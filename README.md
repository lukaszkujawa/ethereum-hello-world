= Ethereum Smart Contract Hello World

To run this demo you will need Truffle and Ganache (https://www.trufflesuite.com/)

Download and run Ganache (personal Ethereum blockchain) from https://www.trufflesuite.com/ganache

Install Truffle
```bash
$ npm install truffle -g
```

Clone project from GitHub
```bash
$ git clone git@github.com:lukaszkujawa/ethereum-hello-world.git
$ cd ethereum-hello-world
```

Build contract. You might notice there are two contracts: Migrations.sol and
HelloWorld.sol. The migration contract is used by Truffle to keep track of what
has been deployed (https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations).
```bash
$ truffle compile
```

Deploy contract to your local Ethereum (you should have Ganache running by this point).
```bash
$ truffle merge
```

If it all went well now it's the time to interact with the contract. The `./console_helper.js` is
using web3 API (https://web3js.readthedocs.io/en/v1.2.6/) to capture contract events, send transaction and call read-only function. Read operations "call" are free and run locally. Functions changing state "send" require transaction and cost gas.

To run the script start truffle console.
```bash
$ truffle console
```

After console is running paste:
```bash
exec ./console_helper.js
```

You should see something like:
```bash
truffle(development)> exec ./console_helper.js
Using network 'development'.

==================
 > Account that will pay for transaction gas:  0x591442e0cBC4ef437342DD88b363d689bC50284A
 > Counter value before creating a transaction:  0


+-------------------------------------------------------------------+
| Event emitted by the contract                                     |
| Event triggered by: 0x591442e0cBC4ef437342DD88b363d689bC50284A    |
| The new counter value is: 1
+-------------------------------------------------------------------+

 > Counter value after creating the transaction:  1
==================
```
