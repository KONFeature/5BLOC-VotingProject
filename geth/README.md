# README

- [README](#readme)
  - [Initial setup](#initial-setup)
  - [Testnet setup](#testnet-setup)
  - [Attaching the Geth server](#attaching-the-geth-server)
  - [Performing the truffle migration](#performing-the-truffle-migration)
  - [Setting up Swarm](#setting-up-swarm)

## Initial setup

First, you need to [download](https://geth.ethereum.org/downloads/) and install Geth.

Then, you need to create new account:

```console
geth account new
```

For this project, the following account will be created:

| address             | passphrase      |
| ------------------- | --------------- |
| *generated_address* | `alongpassword` |

To start Geth and connect to the ethereum network:

```console
geth
```

## Testnet setup

Create an account:

```console
geth --testnet account new
```

| public_key                                   | password        |
| -------------------------------------------- | --------------- |
| `0x993c9284dD8d4E0697c4619867D23A9571D18700` | `alongpassword` |

Syncing to the Ropsten/testnet:

```console
geth --testnet --syncmode fast --cache 1024 --rpc --rpcapi eth,net,web3,personal
```

Then we need to populate `eth` into our address. We need to go on the website [https://faucet.ropsten.be/](https://faucet.ropsten.be/) and to type our address in the required field.

A transaction hash will be displayed.

| transactions_received |
|--|
| [0x277f149510641e179772801b5d43172a96ff510726503a370da2226a674dd21b](http://ropsten.etherscan.io/tx/0x277f149510641e179772801b5d43172a96ff510726503a370da2226a674dd21b) |

In addition, the file `truffle.js`| need to be edited:

```diff
networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777", // Match any network id
      gas: 5000000
+    },
+    ropsten: {
+      host: "127.0.0.1",
+      port: 8545,
+      network_id: 3,
+      gas: 2900000
+    }
  }
```

We need to wait for everyting to sync.

## Attaching the Geth server

In a new terminal:

```console
geth attach http://127.0.0.1:8545
```

A new Javascript terminal will open.

To check if it's still syncing:

```js
eth.syncing
```

You need to wait until the command returns `false`.

To unlock your account:

```js
personal.unlockAccount(eth.accounts[0])
```

Type the passphrase for the testnet account create before.

To get the balance for this address:

```js
web3.eth.getBalance("0x993c9284dD8d4E0697c4619867D23A9571D18700")
```

## Performing the truffle migration

In a new terminal:

```console
truffle migrate --network ropsten
```

This will run the migration and deploy them into the Ropsten network. When it will be completed, the address given to the contract will need to be stored.

This address will be used to access everything from the DApps.

## Setting up Swarm

> Now that we have our smart contract deployed publicly, we have a distributed backend to our app. But in order to access this through our web UI, we either need to have the assets locally or we have to deploy them to a web server, both of which take away the key advantage of having a decentralized app. Fortunately, Ethereum comes with an option to deploy our files on the blockchain, it's called Swarm.

Swarm is already installed with Geth.

We will reuse the account created when initializing Geth.

To start Swarm:

```console
swarm --ens-api "" --bzzaccount 0x993c9284dD8d4E0697c4619867D23A9571D18700
```

The we need to upload our web app. Go in the app directory and run:

```console
cd MonkeyVotingDapp
swarm --recursive up ./
```

A hash will be returned. It will be the link to Swarm.

The you need to ge on [http://localhost:8500/bzz:/<previous_hash>/index.html](http://localhost:8500/bzz:/<previous_hash>/index.html).

The website will be now loaded from the blockchain.
