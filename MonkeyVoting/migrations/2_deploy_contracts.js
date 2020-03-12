const Ballot = artifacts.require("Ballot");
const Owner = artifacts.require("Owner");
const Storage = artifacts.require("Storage");
const MonkeyElection = artifacts.require("MonkeyElection");

module.exports = function(deployer) {
  deployer.deploy(MonkeyElection);
  deployer.deploy(Storage);
  deployer.deploy(Ballot, 
    ["0x63616e6469646174206f6e650000000000000000000000000000000000000000", 
    "0x63616e64696461742074776f0000000000000000000000000000000000000000"]);
  deployer.deploy(Owner);
};
