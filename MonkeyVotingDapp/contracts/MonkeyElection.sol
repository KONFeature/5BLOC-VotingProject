pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

/**
@title Monkey election implementation
@author Quentin Nivelais
*/
contract MonkeyElection {
    /// @title Candidate
    /// @notice Model a Monkey Candidate
    /// @dev name is a the candidate name
    /// @dev voteCount is the number of vote for this candidate
    struct Candidate {
        bytes32 name;
        uint256 voteCount;
    }

    /// @title Monkey voter
    /// @notice Model a Monkey voter
    /// @dev weight is the number of delegation to this voters (1 by default)
    /// @dev voted is true if the voter already voted, otherwise false
    /// @dev delegate is the address to who this voter delegate his vote, if any ?
    /// @dev vote is the candidates index for wich candidate this voter voted
    /// @dev isValue is true if this voter a correct value, otherwise false
    struct Voter {
        uint256 weight;
        bool voted;
        address delegate;
        uint256 vote;
        bool isValue;
    }

    /// @title Chairperson
    /// @notice The responsible for this monkey election
    address public chairperson;

    /// @title Voters
    /// @notice Map a blockchain address to a voter
    /// @dev Key is the voter's address
    /// @dev value is a Voter struct
    mapping(address => Voter) public voters;

    /// @title Candidates
    /// @notice List of all the candidates for the election
    Candidate[] public candidates;

    /// @title Election's end date
    /// @notice End date of the election
    /// @dev Private, because only chairperson can change it
    uint256 private endDate;

    /**
    @notice Create a new election with candidates
    @dev The address who init this class as will be set as the election leader
    */
    constructor() public {
        // The address who init this class is the leader of this election
        chairperson = msg.sender;
        addVoter(chairperson);

        // Add some base candidate
        addCandidate("Racist Monkey");
        addCandidate("Sad Monkey");
        addCandidate("Happy Monkey");
        addCandidate("Peaceful Monkey");

        // Define the end date in a week after now
        endDate = block.timestamp + 604800;
    }

    /**
	@notice Add the current address to the voter pool
    @dev This function is using the addVoter method
	*/
    function participateToElection() public {
        addVoter(msg.sender);
    }

    /**
	@notice Add a voters to the voter pool
    @dev This function is using the voters mapping
	@param _voterAddress Voter's address
	*/
    function addVoter(address _voterAddress) private {
        require(!voters[msg.sender].isValue, "Already exist");
        voters[_voterAddress] = Voter(1, false, address(0), 0, true);
    }

    /**
	@notice Add a canditate
    @dev This function is using the canditates array and the state variable chairperson
	@param _name Candidate's name
	*/
    function addCandidate(bytes32 _name) public {
        require(
            msg.sender == chairperson,
            "You are not the leader of this election"
        );
        candidates.push(Candidate(_name, 0));
    }

    /**
	@notice Get the number of candidates
    @dev This function is using the canditates array
	@return { "value": "Number of candidate(s)" }
	*/
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    /**
	@notice Get current voter profile
    @dev This function is using the voters mapping
	@return { "Voter": "The voter(s) blockchain address" }
	*/
    function getCurrentVoterProfile() public view returns (Voter memory) {
        return voters[msg.sender];
    }

    /**
	@notice Vote for a candidate
    @dev This function is using the voters mapping and the candidates array
	@param _candidate The candidate position in the candidates array
	*/
    function vote(uint256 _candidate) public {
        require(block.timestamp < endDate, "The election has ended");
        // Find the voter and check infos
        if (!voters[msg.sender].isValue) {
            // If the voter doesn't exist yet we create it
            addVoter(msg.sender);
        }
        Voter storage voter = voters[msg.sender];
        require(voter.weight != 0, "Has no right to vote");
        require(!voter.voted, "Already voted.");

        // Tell for who he voted and if he have voted
        voter.voted = true;
        voter.vote = _candidate;

        // Add the vote to the candidate
        candidates[_candidate].voteCount += voter.weight;
    }

    /**
	@notice Delegate your vote to the voter `to`
    @dev This function is using the voters mapping and the candidates array
	@param _toWho Voter's address
	*/
    function delegate(address _toWho) public {
        require(block.timestamp < endDate, "The election has ended");
        require(
            _toWho != msg.sender,
            "You can't delegate your vote to yourself, stupid bastard."
        );
        require(!voters[msg.sender].voted, "You already voted.");
        // If the voters  or the delegated voters doesn't we abort this operation
        require(voters[msg.sender].isValue, "You are not part of this election.");
        require(voters[_toWho].isValue, "Your delegate person is not a part of this election.");

        // Recurcivelly delegate the votes
        address delegateAddr = _toWho;
        while (voters[delegateAddr].isValue && voters[delegateAddr].delegate != address(0)) {
            delegateAddr = voters[delegateAddr].delegate;

            // We found a loop in the delegation, not allowed.
            require(
                delegateAddr != msg.sender,
                "Found loop in delegation, aborting."
            );
        }

        // Block the user that delegate his vote
        voters[msg.sender].voted = true;
        voters[msg.sender].delegate = delegateAddr;

        // Find the person to wich the vote go and increase his weight
        voters[delegateAddr].weight += voters[msg.sender].weight;
        if (voters[delegateAddr].voted) {
            // Increment the vote count of the delegated person if he already vote
            candidates[voters[delegateAddr].vote].voteCount += voters[msg.sender].weight;
        }
    }

    /**
	@notice Change the end date of the election
    @dev This function is using the state variable endDate and chairperson
	@param _newEndDate The new election's end date
	*/
    function changeEndDate(uint256 _newEndDate) public {
        require(
            msg.sender == chairperson,
            "You are not the leader of this election"
        );
        endDate = _newEndDate;
    }

    /**
	@notice Get the end date of this election
	@return The election's end date
	*/
    function getEndDate() public view returns (uint256) {
        return endDate;
    }
}
