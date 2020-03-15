import { Injectable, Inject } from "@angular/core";
import { WEB3 } from "./web3.service";
import Web3 from "web3";
import { resolve } from "dns";

// const contract = require("@truffle/contract");
const electionAbi = require("../contracts/MonkeyElection.json");

@Injectable({
  providedIn: "root"
})
export class ContractService {
  constructor(@Inject(WEB3) private web3: Web3) {
    // Init web3 wallet
    this.web3.eth.requestAccounts().then((wallets: string[]) => {
      if (wallets.length > 0) {
        // Init web3 election contract
        console.log(electionAbi);
        const contract = new this.web3.eth.Contract(electionAbi, wallets[0]);
        contract.methods.chairperson()
          .call({ from: wallets[0] })
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        console.error("No account linked to MetaMask");
      }
    });
  }
}
