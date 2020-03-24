import { Injectable, Inject } from "@angular/core";
import { WEB3 } from "./web3.service";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

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
  async initElectionContract(): Promise<Contract> {
    try {
      // Init all the infos required by truffle
      const networkType = "ethereum";
      const provider = this.web3.currentProvider;
      const interfaceAdapter = createInterfaceAdapter({
        networkType,
        provider
      });

      // Find the contact address with all the truffle infos
      const networkId = await interfaceAdapter.getNetworkId();
      const address = electionAbi.networks[networkId].address;

      if (networkId == null || address == null) {
        throw new Error("No election deployed currently");
      }

      // Create the contract with the founded address
      return new this.web3.eth.Contract(electionAbi.abi, address, {
        gasPrice: "2000000000",
        gas: 8000000
      });
    } catch (e) {
      console.error("Error initialising the election smart contract");
      throw new Error(e);
    }
  }

  /**
   * Request the wallet authorisation
   */
  async requestWalletAuthorisation(): Promise<string> {
    try {
      // request the authorisation
      const wallets = await this.web3.eth.requestAccounts();

      if (wallets.length > 0) {
        // Return the first wallet retreived
        return wallets[0];
      } else {
        throw new Error("No account linked to the MetaMask authorisation");
      }
    } catch (e) {
      console.error("Error when requesting wallet authorisation");
      throw new Error(e);
    }
  }

  /**
   * Get all the infos about the current wallet for this election
   */
  async whoAmI(): Promise<Voter> {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Fnd the contract voter
      const contractVoter = await electionContract.methods
        .voters(wallet)
        .call({ from: wallet });

      // Find the chairperson
      const chairperson = await electionContract.methods
        .chairperson()
        .call({ from: wallet });

      // Find the balance
      const rawBalance = await this.web3.eth.getBalance(wallet);
      const ethBalance = parseInt(rawBalance, 10) / 1000000000000000000;

      // Return the voter object created
      return new Voter(
        wallet,
        ethBalance,
        contractVoter.voted,
        contractVoter.delegate,
        chairperson == wallet,
        contractVoter.weight,
        contractVoter.isValue
      );
    } catch (e) {
      console.error("Error when checking the chairpersonn");
      throw new Error(e);
    }
  }

  /**
   * function used to add an address to the election
   */
  async participateToElection() {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Add the current wallet to the election
      const chairperson = await electionContract.methods
        .participateToElection()
        .send({ from: wallet });
    } catch (e) {
      console.error("Error when adding the current person to the election");
      throw new Error(e);
    }
  }

  /**
   * Function used to retrieve the canidates of the election
   */
  async getCandidates(): Promise<Array<Candidate>> {
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
      console.error("Error when fetching the candidates");
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
      console.error("Error when fetching the candidates");
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
      await electionContract.methods
        .addCandidate(this.web3.utils.asciiToHex(candidateName))
        .send({ from: wallet });
    } catch (e) {
      console.error("Error when adding the candidates");
      throw new Error(e);
    }
  }

  /**
   * Delegate the current person vote to another
   * @param delegateTo
   */
  async delegateVote(delegateTo: string) {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Launch the delegate method
      await electionContract.methods
        .delegate(delegateTo)
        .send({ from: wallet });
    } catch (e) {
      console.error("Error when delegating the vote");
      throw new Error(e);
    }
  }

  /**
   * change the end date of the election
   * @param endDate
   */
  async updateEndDate(endDate: Date) {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Launch the update
      await electionContract.methods
        .changeEndDate(endDate.getTime() / 1000)
        .send({ from: wallet });
    } catch (e) {
      console.error("Error when updating the end date of the election");
      throw new Error(e);
    }
  }

  /**
   * Fetch the end date of the election
   * @param endDate
   */
  async getEndDate(): Promise<Date> {
    try {
      // Authorize wallet and init contract
      const wallet = await this.requestWalletAuthorisation();
      const electionContract = await this.initElectionContract();

      // Fetch the end date from the contract
      const endDateTimestamp = await electionContract.methods
        .getEndDate()
        .call({ from: wallet });

      // Return the parsed end date
      return new Date(endDateTimestamp * 1000);
    } catch (e) {
      console.error("Error when updating the end date of the election");
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

export class Voter {
  constructor(
    public address: string,
    public balance: number,
    public voted: boolean,
    public delegate: string,
    public isChairperson: boolean,
    public voteWeight: number,
    public participatingToElection: boolean
  ) {}
}
