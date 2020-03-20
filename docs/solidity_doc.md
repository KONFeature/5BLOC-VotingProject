[MonkeyElection]: #MonkeyElection
[MonkeyElection-chairperson-address]: #MonkeyElection-chairperson-address
[MonkeyElection-voters-mapping-address----struct-MonkeyElection-Voter-]: #MonkeyElection-voters-mapping-address----struct-MonkeyElection-Voter-
[MonkeyElection-candidates-struct-MonkeyElection-Candidate--]: #MonkeyElection-candidates-struct-MonkeyElection-Candidate--
[MonkeyElection-constructor--]: #MonkeyElection-constructor--
[MonkeyElection-addCandidate-bytes32-]: #MonkeyElection-addCandidate-bytes32-
[MonkeyElection-getCandidatesCount--]: #MonkeyElection-getCandidatesCount--
[MonkeyElection-getCurrentVoterProfile--]: #MonkeyElection-getCurrentVoterProfile--
[MonkeyElection-vote-uint256-]: #MonkeyElection-vote-uint256-
[MonkeyElection-delegate-address-]: #MonkeyElection-delegate-address-
[MonkeyElection-changeEndDate-uint256-]: #MonkeyElection-changeEndDate-uint256-
[MonkeyElection-getEndDate--]: #MonkeyElection-getEndDate--

## <span id="MonkeyElection"></span> `MonkeyElection`





- [`constructor()`][MonkeyElection-constructor--]
- [`addCandidate(bytes32 _name)`][MonkeyElection-addCandidate-bytes32-]
- [`getCandidatesCount()`][MonkeyElection-getCandidatesCount--]
- [`getCurrentVoterProfile()`][MonkeyElection-getCurrentVoterProfile--]
- [`vote(uint256 _candidate)`][MonkeyElection-vote-uint256-]
- [`delegate(address _toWho)`][MonkeyElection-delegate-address-]
- [`changeEndDate(uint256 _newEndDate)`][MonkeyElection-changeEndDate-uint256-]
- [`getEndDate()`][MonkeyElection-getEndDate--]

### <span id="MonkeyElection-constructor--"></span> `constructor()` (public)

Create a new election with candidates


The address who init this class as will be set as the election leader

### <span id="MonkeyElection-addCandidate-bytes32-"></span> `addCandidate(bytes32 _name)` (public)

Add a canditate


This function is using the canditates array and the state variable chairperson


### <span id="MonkeyElection-getCandidatesCount--"></span> `getCandidatesCount() → uint256` (public)

Get the number of candidates


This function is using the canditates array


### <span id="MonkeyElection-getCurrentVoterProfile--"></span> `getCurrentVoterProfile() → struct MonkeyElection.Voter` (public)

Get current voter profile


This function is using the voters mapping


### <span id="MonkeyElection-vote-uint256-"></span> `vote(uint256 _candidate)` (public)

Vote for a candidate


This function is using the voters mapping and the candidates array


### <span id="MonkeyElection-delegate-address-"></span> `delegate(address _toWho)` (public)

Delegate your vote to the voter `to`


This function is using the voters mapping and the candidates array


### <span id="MonkeyElection-changeEndDate-uint256-"></span> `changeEndDate(uint256 _newEndDate)` (public)

Change the end date of the election


This function is using the state variable endDate and chairperson


### <span id="MonkeyElection-getEndDate--"></span> `getEndDate() → uint256` (public)

Get the end date of this election
