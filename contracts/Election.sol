// SPDX-License-Identifier: MIT

pragma solidity >= 0.5.0 < 0.9.0;
import "hardhat/console.sol";

contract Election {

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
        string details;
        string party;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public voters;
    mapping(address => bool) public allCandidates;

    uint public candidatesCount;
    address public organizer;

    string public candidate;
    uint public endTime;
    uint public duration;

    constructor(address _org, uint _duration) {
        organizer=_org;
        duration = _duration;
        
        console.log("The organizer is %s and end time is %o", _org,_duration);
    }

    event votedEvent(
        uint indexed _candidateId
    );

     fallback() external {
        console.log("Your called function not found :( %s)",msg.sender);
        // Additional code or actions you want to perform
    }

    function addCandidate(string memory _name, string memory _details,  string memory _party, address accountId) public {

        require(!allCandidates[accountId], "This candidate has already been nominated");

        if(candidatesCount ==0){
            endTime = block.timestamp + duration;
        }
        candidatesCount++;
        allCandidates[accountId]=true;

        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0, _details, _party);

        console.log("The candidate %s added having total cand is %o", _name, candidatesCount);
    }

    function vote(uint _candidateId) public {
        // require(block.timestamp < endTime , "Voting time has finished");
        require(!voters[msg.sender], "You have already voted");
        console.log("Going to vote, cand ID is %o",_candidateId);

        require(_candidateId > 0 && _candidateId <= candidatesCount,"Invalid ID to vote");
        
        voters[msg.sender] = true;
        
        candidates[_candidateId].voteCount++;

        console.log(" %s has voted",msg.sender);
    
        emit votedEvent(_candidateId);
    }

    function getWinner() public view returns (string memory) {
        require(endTime > 0, "No candidate has registered yet");
        require(block.timestamp >= endTime, "Election is still ongoing");
        require(candidatesCount > 0, "No candidates in the election");


        uint highestVoteCount = 0;
        uint winningCandidateId;

        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > highestVoteCount) {
                highestVoteCount = candidates[i].voteCount;
                winningCandidateId = i;
            }
        }

        return candidates[winningCandidateId].name;
    }

    function hasVoted(address userAddress) public view returns (bool) {
        console.log(" Have you voted %s",userAddress);
    return voters[userAddress];
    }

    function isCandidate(address userAddress) public view returns (bool) {
        console.log(" Are you candidate %s",userAddress);
        return allCandidates[userAddress];
    }

    function anyTimeLeft() public view returns (bool) {
        if (endTime==0){
            return true;
        }
        return (block.timestamp<endTime);
    }

}