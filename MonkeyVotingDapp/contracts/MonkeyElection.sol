pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

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

    // End date of the election (private, because only chairperson can change it)
    uint256 private endDate;

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
        require(!voters[msg.sender].isValue, "Already exist");
        voters[_voteraddr] = Voter(1, false, address(0), 0, true);
    }

    // Function to add a candidate
    function addCandidate(bytes32 _name) public {
        require(
            msg.sender == chairperson,
            "You are not the leader of this election"
        );
        candidates.push(Candidate(_name, 0));
    }

    // Function to get the number of candidates
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    // Function to get the number of candidates
    function getCurrentVoterProfile() public view returns (Voter memory) {
        return voters[msg.sender];
    }

    /// Vote for a candidate to the election
    function vote(uint256 candidate) public {
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
        voter.vote = candidate;

        // Add the vote to the candidate
        candidates[candidate].voteCount += voter.weight;
    }

    /// Delegate your vote to the voter `to`.
    function delegate(address toWho) public {
        require(block.timestamp < endDate, "The election has ended");
        require(
            toWho != msg.sender,
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
        address finalDelegateAddress = toWho;
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

    // Change the end date of the election
    function changeEndDate(uint256 newEndDate) public {
        require(
            msg.sender == chairperson,
            "You are not the leader of this election"
        );
        endDate = newEndDate;
    }

    // Get the end date of this election
    function getEndDate() public view returns (uint256) {
        return endDate;
    }
}
