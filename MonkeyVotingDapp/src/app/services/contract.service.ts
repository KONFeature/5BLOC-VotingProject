import { Injectable, Inject } from "@angular/core";
import { WEB3 } from "./web3.service";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { resolve } from "dns";

const electionAbi = require("../contracts/MonkeyElection.json");

@Injectable({
  providedIn: "root"
})
export class ContractService {
  electionContract: Contract;

  constructor(@Inject(WEB3) private web3: Web3) {
    this.electionContract = new this.web3.eth.Contract(
      electionAbi.abi,
      "0x47a659E75655a22f1DA5B286f653B4CE62fedD25", // Address of the contract (TODO : Find how to extract it from the abi generated bu truffle, what is this network id before srsly ?)
      {
        gasPrice: "20000000000",
        gas: 100000
      }
    );
  }

  /**
   * Function used to retrieve the canidates of the election
   */
  getCandidates() {
    return new Promise((resolve, reject) => {
      // Request the Web3 wallet authorization
      this.web3.eth
        .requestAccounts()
        .then((wallets: string[]) => {
          if (wallets.length > 0) {
            const wallet = wallets[0];
            console.log("Executing transaction with wallet : " + wallet);

            // Fetch the number of candidates to fetch
            this.electionContract.methods
              .getCandidatesCount()
              .call({ from: wallet })
              .then((candidatesCount: number) => {
                console.log("Candidate to fetch : " + candidatesCount);
                if (candidatesCount == null || candidatesCount < 0) {
                  return reject("No candidate to fetch");
                }

                var candidates = Array<Candidate>();

                for (let i = 0; i < candidatesCount; i++) {
                  // Fetch the candidate
                  this.electionContract.methods
                    .candidates(i)
                    .call({ from: wallet })
                    .then((candidate: any) => {
                      // Save the candidate
                      candidates.push(
                        new Candidate(
                          i,
                          this.web3.utils.hexToAscii(candidate.name),
                          candidate.voteCount
                        )
                      );
                    })
                    .catch((error: any) => {
                      return reject(error);
                    })
                    .finally(() => {
                      // If we where at the last iteration we return the list
                      if (i == candidatesCount - 1) {
                        return resolve(candidates);
                      }
                    });
                }
              })
              .catch((error: any) => {
                return reject(error);
              });
          } else {
            return reject("No account linked to the MetaMask authorisation");
          }
        })
        .catch(error => {
          return reject("Account authorisation declined : " + error);
        });
    });
  }

  /**
   * Vote for a candidate
   * @param candidateId the id of the candidate
   */
  voteForCandidate(candidateId : number) {
    return new Promise((resolve, reject) => {
      // Request the Web3 wallet authorization
      this.web3.eth
        .requestAccounts()
        .then((wallets: string[]) => {
          if (wallets.length > 0) {
            const wallet = wallets[0];
            console.log("Executing transaction with wallet : " + wallet);

            // Submit the vote to the candidate
            this.electionContract.methods
              .vote(candidateId)
              .send({ from: wallet })
              .then(() => {
                console.log("Voted for candidate with id: " + candidateId);
              })
              .catch((error: any) => {
                return reject(error);
              });
          } else {
            return reject("No account linked to the MetaMask authorisation");
          }
        })
        .catch(error => {
          return reject("Account authorisation declined : " + error);
        });
    });
  
  }
}

export class Candidate {
  constructor(public id: number, public name: string, public voteCount: number) {}
}
