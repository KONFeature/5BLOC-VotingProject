import { Injectable, Inject } from "@angular/core";
import { WEB3 } from "./web3.service";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { resolve } from "dns";

// Truffle part only, because a lot of thing
const { createInterfaceAdapter } = require("@truffle/interface-adapter");
const electionAbi = require("../contracts/MonkeyElection.json");

@Injectable({
  providedIn: "root"
})
export class ContractService {
  constructor(@Inject(WEB3) private web3: Web3) {
    // Create the election contract
  }

  /**
   * Init the election contract and return it
   */
  async initElectionContract() {
    return new Promise<Contract>((resolve, reject) => {
      // Find the contact address with all the truffle infos
      var networkType = "ethereum";
      var provider = this.web3.currentProvider;
      var interfaceAdapter = createInterfaceAdapter({ networkType, provider });
      interfaceAdapter
        .getNetworkId()
        .then((networkId: string) => {
          // Use the network id to fetch the block address
          const address = electionAbi.networks[networkId].address;
          // Create the contract
          return resolve(
            new this.web3.eth.Contract(electionAbi.abi, address, {
              gasPrice: "20000000000",
              gas: 10000000
            })
          );
        })
        .catch(error => {
          return reject(error);
        });
    });
  }

  /**
   * Request the wallet authorisation
   */
  requestWalletAuthorisation() {
    return new Promise((resolve, reject) => {
      // Request the Web3 wallet authorization
      this.web3.eth
        .requestAccounts()
        .then((wallets: string[]) => {
          if (wallets.length > 0) {
            // Return the first wallet retreived
            return resolve(wallets[0]);
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
   * function used to check if the current user is the chairpersonn of the election
   */
  async isThechairpersonMe() {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      const chairperson = await electionContract.methods
        .chairperson()
        .call({ from: wallet });

      // Return the canidate list
      return chairperson == wallet;
    } catch (e) {
      console.log("Error when checking the chairpersonn");
      throw new Error(e);
    }
  }

  /**
   * Function used to retrieve the canidates of the election
   */
  async getCandidates() {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      const candidatesCount = await electionContract.methods
        .getCandidatesCount()
        .call({ from: wallet });
      var candidates = Array<Candidate>();
      console.log("Candidate to fetch : %s", candidatesCount);

      for (let i = 0; i < candidatesCount; i++) {
        // Fetch the candidate
        const candidate = await electionContract.methods
          .candidates(i)
          .call({ from: wallet });
        // Save the candidate
        candidates.push(
          new Candidate(
            i,
            this.web3.utils.hexToAscii(candidate.name),
            candidate.voteCount
          )
        );
      }

      // Return the canidate list
      return candidates;
    } catch (e) {
      console.log("Error when fetching the candidates");
      throw new Error(e);
    }
  }

  /**
   * Vote for a candidate
   * @param candidateId the id of the candidate
   */
  async voteForCandidate(candidateId: number) {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Launch the vote method
      await electionContract.methods.vote(candidateId).send({ from: wallet });
      console.log("Voted for candidate with id : %s", candidateId);
    } catch (e) {
      console.log("Error when fetching the candidates");
      throw new Error(e);
    }
  }

  /**
   * Add candidate to the election
   * @param candidateName
   */
  async addCandidate(candidateName: string) {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Launch the add candidate method
      await electionContract.methods.addCandidate(this.web3.utils.asciiToHex(candidateName)).send({ from: wallet });
    } catch (e) {
      console.error("Error when adding the candidates");
      throw new Error(e);
    }
  }
}

export class Candidate {
  constructor(
    public id: number,
    public name: string,
    public voteCount: number
  ) {}
}
