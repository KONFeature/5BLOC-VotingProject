const MonkeyElection = artifacts.require("MonkeyElection");

module.exports = function(deployer) {
  deployer.deploy(MonkeyElection);
};