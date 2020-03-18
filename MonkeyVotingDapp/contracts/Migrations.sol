pragma solidity >=0.4.22 <0.7.0;

/**
@title Migrations Interface
@author Quentin Nivelais
*/
contract Migrations {
    address public owner;
    uint256 public lastCompletedMigration;

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = msg.sender;
    }

    /**
	@notice Set the migration as completed
    @dev This function is using the state variable lastCompletedMigration
    @
	@param completed TODO
	*/
    function setCompleted(uint256 completed) public restricted {
        lastCompletedMigration = completed;
    }

    /**
	@notice Perform an upgrade
    @dev This function is using the attribute lastCompletedMigration
    @
	@param newAddress The new address
	*/
    function upgrade(address newAddress) public restricted {
        Migrations upgraded = Migrations(newAddress);
        upgraded.setCompleted(lastCompletedMigration);
    }
}
