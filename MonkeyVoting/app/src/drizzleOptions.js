import Web3 from "web3";
import Ballot from "./contracts/Ballot.json";
import Owner from "./contracts/Owner.json";
import Storage from "./contracts/Storage.json";
import MonkeyElection from "./contracts/MonkeyElection.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [Storage, Ballot, Owner, MonkeyElection],
  events: {}, // TODO : Not needed now, create event in our contract
};

export default options;
