pragma solidity >=0.4.22 <0.7.0;

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

    // Function to add a voters to our voter pool
    function addVoter(address _voteraddr) private {
        voters[_voteraddr] = Voter(1, false, address(0), 0);
    }

    // Function to add a candidate
    function addCandidate(bytes32 _name) private {
        candidates.push(Candidate(_name, 0));
    }

    // Function to get the number of candidates
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    // Function to get the number of candidates
    function getCurrentVoterProfile() public view returns (Voter memory) {
        return voters.get(msg.sender);
    }

}
