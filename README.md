# 5BLOC-VotingProject

Project for the 5BLOC at supinfo

## Launch

Go in the MonkeyVotingDapp folder and run

```language
ng serve
```

This will launch the UI part of this project.

After that, choose "Goerli testnet" in metamask, and go on [http://localhost:4200/](http://localhost:4200/). The UI will purpose you to join the election.
If you don't have an account on the goerli testnet, I reccomand you to follow the geth_setup documentation.

To generate the solidity doc:

```console
npx solidity-docgen -i .\contracts\ -o .\docs\
```
