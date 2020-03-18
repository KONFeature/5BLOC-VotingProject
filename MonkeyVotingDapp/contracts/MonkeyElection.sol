pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

/**
@title Monkey election implementation
@author Quentin Nivelais
*/
contract MonkeyElection {
    /// @dev Model a Monkey Candidate
    struct Candidate {
        bytes32 name;
        uint256 voteCount;
    }

    /// @dev Model a Monkey voters
    struct Voter {
        uint256 weight; // Number of delegation to this voters (1 by default)
        bool voted; // Is this voter already voted ?
        address delegate; // To who this voter delegate his vote, if any ?
        uint256 vote; // For wich candidate this voter voted
        bool isValue; // Is this voter a correct value ?
    }

    /// @dev The responsible for this monkey election
    address public chairperson;

    /// @dev Map a blockchain address to a voter
    mapping(address => Voter) public voters;

    /// @dev List of all of our candidates
    Candidate[] public candidates;

    /// @dev End date of the election (private, because only chairperson can change it)
    uint256 private endDate;

    /// @dev Constructor
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
	@param candidate The candidate position in the candidates array
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
	@param toWho Voter's address
	*/
    function delegate(address _toWho) public {
        require(block.timestamp < endDate, "The election has ended");
        require(
            _toWho != msg.sender,
            "You can't delegate your vote to yourself, stupid bastard."
        );
        // If the voters doesn't exist yet we create it
        if (!voters[msg.sender].isValue) {
            addVoter(msg.sender);
        }

        // Find the original voter
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");

        // Recurcivelly delegate the votes
        address finalDelegateAddress = _toWho;
        while (voters[finalDelegateAddress].isValue) {
            finalDelegateAddress = voters[finalDelegateAddress].delegate;

            // We found a loop in the delegation, not allowed.
            require(
                finalDelegateAddress != msg.sender,
                "Found loop in delegation, aborting."
            );
        }

        // Block the user that delegate his vote
        sender.voted = true;
        sender.delegate = finalDelegateAddress;

        // Find the person to wich the vote go and increase his weight
        Voter storage delegate_ = voters[finalDelegateAddress];
        delegate_.weight += sender.weight;
        if (delegate_.voted) {
            // Increment the vote count of the delegated person if he already vote
            candidates[delegate_.vote].voteCount += sender.weight;
        }
    }

    /**
	@notice Change the end date of the election
    @dev This function is using the state variable endDate and chairperson
	@param newEndDate The new election's end date
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
