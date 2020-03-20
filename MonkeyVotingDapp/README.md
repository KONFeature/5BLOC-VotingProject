
# MonkeyVotingDapp

  

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

  

## Development server

  

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

  

## Code scaffolding

  

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

  

## Build

  

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

  

## Running unit tests

  

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

  

## Running end-to-end tests

  

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

  

## Further help

  

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

  

# Setup

  

## Required tools

 - NodeJS (v13 is better, but compatible with v10 and later) & npm
 - truffle (npm install -g truffle)
 - ganache

## Deployment

 1. Launch ganache
 2. Use the host, port & network id of ganache in the truffle-config.js at the root of project
 3. Launch truffle migrate (if nothing is deployed, force launch with `truffle migrate --reset --compile-all --skip-dry-run`) This will deploy the smart contract to the blockchain, and wrote the generated ABI file & network info in a json file
 4. Launch the angular server `ng serve`

## Technical stack

 - Truffle
	 - Deploy solidity file to the blockchain
	 - Generate ABI (JSON representation of the contract) & network infos in a json file (in src/app/contracts)
	 - Later, with the help of web3, it will help us to find the address of the contract in the current blockchain (because we can deploy this contract on multiple network) (initElectionContract() in contract service)
- Web3
	 - It will handle all the interaction with the contract
		 - Need the contract ABI (generated with truffle)
		 - And contract address (Retreived with truffle)
	 - Expose to us all the contract method
	 - Handle authorisation of transaction with MetaMask
		 - Send the request to metamask, calculate the gas cost ...)
 - Angular
	 - Just the front

## Service used

 - web3.service.ts
	 - Find the web3 provider or default to localhost
 - contract.service.ts
	 - All the interaction with the smartContract
		 - Init contract
		 - And all the interaction with the app
