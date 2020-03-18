# 5BLOC-VotingProject

Project for the 5BLOC at supinfo

## Launch

Launch your Ganache server

When ganache is ready, in a terminal execute

```console
truffle compile && truffle migrate
```

This will put all of our contracts in the ganache blockchain

Then, go in the app folder and run

```language
npm run start
```

This will launch the UI part of this project

To build the generate the solidity doc:

```console
npx solidity-docgen -i .\contracts\ -o .\docs\
```
