// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 < 0.9.0;
import "hardhat/console.sol";

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string details;
        string election_id;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;

    uint public candidatesCount;
    address public organizer;

    string public candidate;

    constructor(address _org) {
        organizer=_org;
        console.log("The organizer is %s", _org);
    }

    event votedEvent(
        uint indexed _candidateId
    );

     fallback() external {
        console.log("Your called function not found :( %s)",msg.sender);
        // Additional code or actions you want to perform
    }

    function addCandidate(string memory _name, string memory _details, string memory _election_id) public {
        candidatesCount++;
        
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _details, _election_id);

        console.log("The candidate %s added having total cand is %o", _name, candidatesCount);
    }

     function checkme() public pure returns(uint256){
       return 999;
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "You have already voted");
        console.log("Going to vote, cand ID is %o",_candidateId);

        require(_candidateId > 0 && _candidateId <= candidatesCount,"Invalid ID to vote");
        
        voters[msg.sender] = true;
        
        candidates[_candidateId].voteCount++;

        console.log(" %s has voted",msg.sender);
    
        emit votedEvent(_candidateId);
    }

}