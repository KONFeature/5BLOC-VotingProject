import { Injectable, Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subject } from "rxjs";
// import { resolve } from "dns";

declare let require: any;
const Web3 = require("web3");
const electionAbi = require("../../../../Contracts/build/contracts/MonkeyElection.json");
const tokenAbi = require("../../../../Contracts/build/contracts/Payment.json");
declare let window: any;
const contract = require("@truffle/contract");

@Injectable({
  providedIn: "root"
})
export class ContractService {

  private web3Provider: null;
  private contracts: {};
  public compatible: boolean;
  private accounts: string[];
  public accountsObservable = new Subject<string[]>();
  public success: boolean;

  constructor(private snackbar: MatSnackBar) {
    window.web3 = new Web3("http://localhost:7545");
    this.web3Provider = window.web3;
  }

  seeAccountInfo() {
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase((err, account) => {
        if (account === true) {
          console.log("dondt work" + account);
          return reject({ name: "account" });
        } else {
          window.web3.eth.getBalance(account, (error, balance) => {
            if (balance !== null) {
              return resolve({
                originAccount: account,
                balance: window.web3.utils.fromWei(balance, "ether")
              });
            } else {
              return reject({ name: "balance" });
            }
          });
        }
      });
    });
  }

  refreshAccounts() {
    window.web3.eth.getAccounts((err, accs) => {
      console.log("Refreshing accounts");
      if (err === true) {
        console.warn("There was an error fetching your accounts.");
        console.log(err, accs);
        return;
      }

      // Get the initial account balance so it can be displayed.
      if (accs.length === 0) {
        console.warn(
          "Couldn't get any accounts! Make sure your Ethereum client is configured correctly."
        );
        return;
      }

      if (
        !this.accounts ||
        this.accounts.length !== accs.length ||
        this.accounts[0] !== accs[0]
      ) {
        console.log("Observed new accounts");

        this.accountsObservable.next(accs);
        this.accounts = accs;
      }

      console.log("ready");
    });
  }

  trasnferEther(originAccount, destinyAccount, amount) {
    const that = this;

    return new Promise((resolve, reject) => {
      const paymentContract = contract(tokenAbi);
      paymentContract.setProvider(that.web3Provider);

      paymentContract
        .deployed()
        .then(instance => {
          return instance.nuevaTransaccion(destinyAccount, {
            from: originAccount,
            value: window.web3.utils.toWei(amount, "ether")
          });
        })
        .then(status => {
          if (status) {
            return resolve({ status: true });
          }
        })
        .catch(error => {
          console.log(error);

          return reject("Error transfering Ether");
        });
    });
  }

  fetchCandidates() {
    this.web3Provider.eth.net.getId().then(console.log)
    // console.log("test");
    // const electionContract = contract(electionAbi);
    // console.log("test 2");
    // electionContract.setProvider(this.web3Provider);
    // console.log("test 3");

    // electionContract.deployed().then(instance => {
    //   console.log("test 4");
    //   console.log(instance)
    // })

    // return new Promise((resole, reject) => {

    //   // console.log(electionContract);
    //   // console.log(electionContract.defaultBlock);

    //   // electionContract.deployed().then(instance => {
    //   // });
    // });
  }

  failure(message: string) {
    this.snackbar.open(message, "", { duration: 3000 });
  }

  succes() {
    this.snackbar.open("Transaction complete successfuly", "", {
      duration: 300
    });
  }
}
