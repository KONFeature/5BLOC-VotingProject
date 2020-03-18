pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

/**
@title MonkeyElection Interface
@author Quentin Nivelais
*/
contract MonkeyElection {
    // Model a Monkey Candidate
    struct Candidate {
        bytes32 name;
        uint256 voteCount;
    }

    // Model a Monkey voters
    struct Voter {
        uint256 weight; // Number of delegation to this voters (1 by default)
        bool voted; // Is this voter already voted ?
        address delegate; // To who this voter delegate his vote, if any ?
        uint256 vote; // For wich candidate this voter voted
        bool isValue; // Is this voter a correct value ?
    }

    // The responsible for this monkey election
    address public chairperson;

    // Map a blockchain address to a voter
    mapping(address => Voter) public voters;

    // List of all of our candidates
    Candidate[] public candidates;

    // Constructor
    constructor() public {
        // The address who init this class is the leader of this election
        chairperson = msg.sender;
        addVoter(chairperson);

        // Add some base candidate
        addCandidate("Racist Monkey");
        addCandidate("Sad Monkey");
        addCandidate("Happy Monkey");
        addCandidate("Peaceful Monkey");
    }

    /**
	@notice Add a voters to the voter pool
    @dev This function is using the voters mapping
	@param _voteraddr Voter's address
	*/
    function addVoter(address _voteraddr) private {
        require(!voters[msg.sender].isValue, "Already exist");
        voters[_voteraddr] = Voter(1, false, address(0), 0, true);
    }

    /**
	@notice Add a canditate
    @dev This function is using the canditates array
	@param _name Candidate's name
	*/
    function addCandidate(bytes32 _name) private {
        candidates.push(Candidate(_name, 0));
    }

    /**
	@notice Get the number of candidates
    @dev This function is using the canditates array
	@return { "value": "Number of candidate(s)" }
	*/
    function getCandidatesCount() public view returns (uint256 value) {
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
	@param candidate The candidate position in the candidates array
	*/
    function vote(uint256 candidate) public {
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
        voter.vote = candidate;

        // Add the vote to the candidate
        candidates[candidate].voteCount += voter.weight;
    }

}
