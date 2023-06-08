import React, { useState, useEffect } from "react";
import Web3 from "web3";

import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

function Vote({match}) {
  const web3 = new Web3(window.ethereum);

  const [account, setAccount] = useState("");
  const [election, setElection] = useState(null);
  const [candCount, setCandCount] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [isNominated, setIsNominated] = useState(false);
  const [anyTimeLeft, setAnyTimeLeft] = useState(true);

  // const [deploymentTime, setDeploymentTime] = useState('');
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));

  useEffect(() => {
    if(userDetails.isCandidate){
      window.alert("I am a candidate");
    }
    else{
      window.alert("I am a voter");
    }
    loadWeb3();
  }, []);


  async function loadWeb3() {
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum);
    //   const [selectedAddress] = await window.ethereum.request({
    //     method: "eth_requestAccounts",
    //   });
    //   setAccount(selectedAddress);
    // } else if (window.web3) {
    //   window.web3 = new Web3(window.web3.currentProvider);
    // } else {
    //   window.alert(
    //     "Non-Ethereum browser detected. You should consider trying MetaMask!"
    //   );
    // }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setAccount(provider.getSigner(0));

      if (contractAddress.CM) {
        
        const electionC = new ethers.Contract(
          contractAddress.CM,
          CMArtifact.abi,
          provider.getSigner(0)
        );
        await setElection(electionC);

        // await fetchDeploymentTime();

        // console.log("Deployment time: ", deploymentTime)

        console.log("contract: ", electionC)
        const voted = await electionC.hasVoted(userDetails.metamaskAccount);
        console.log("Has Voted: ", voted);
        setHasVoted(voted);

        const nominated = await electionC.isCandidate(userDetails.metamaskAccount);
        console.log("Has nominated: ", nominated);
        setIsNominated(nominated);

        const timeLeft = await electionC.anyTimeLeft();
        console.log("Time left?: ", timeLeft);
        setAnyTimeLeft(timeLeft);

        const countR = await electionC.candidatesCount();
        const candCount = countR.toNumber();

        console.log("num of can: ", candCount)
        setCandCount(candCount);

        console.log("can: ", candCount)

        const fetchedCandidates = [];
        for (let i = 1; i <= candCount; i++) {
          const retCat = await electionC.candidates(i);

          const candidate = {
            id: retCat.id.toNumber(),
            name: retCat.name,
            voteCount: retCat.voteCount.toNumber(),
            details: retCat.details,
            party: retCat.party,
            // election_id: parseInt(retCat.election_id),
          };

          // if (candidate.election_id === parseInt(match.params.id)) {
            fetchedCandidates.push(candidate);
          // }
        }
        setCandidates(fetchedCandidates);
      } else {
        window.alert("Election contract not deployed to detected network.");
      }
    } catch (error) {
      console.error("Eroor--> ",error);
    }
  }

  // const fetchDeploymentTime = async () => {
  //   try {
  //     // Connect to the provider
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     // Get the network ID
  //     const network = await provider.getNetwork();
  //     const networkId = network.chainId;

  //     const electionC =await new ethers.Contract(
  //       contractAddress.CM,
  //       CMArtifact.abi,
  //       provider.getSigner(0)
  //     );
  //     // Get the deployed contract instance
  //     console.log("Networks: ", electionC.networks)
  //     const deployedContract = electionC.networks[networkId];

  //     // Get the contract deployment time
  //     const deploymentBlock = await provider.getBlock(deployedContract.blockNumber);
  //     const deploymentTimestamp = deploymentBlock.timestamp;

  //     // Set the deployment time in state
  //     setDeploymentTime(new Date(deploymentTimestamp * 1000).toLocaleString());
  //   } catch (error) {
  //     console.error('Error fetching deployment time:', error);
  //   }
  // };

// useEffect(() => {

//   fetchDeploymentTime();
// }, []);



   async function handleVote(id) {
    try {
      setLoading(true);
      const transaction = await election.vote(id);
      await transaction.wait();
      setLoading(false);
      console.log("Vote successful");
      window.location.assign(`/voteCount`);
    } catch (error) {
      console.error("Vote failed:", error);
      setLoading(false);
      // Extract the revert message from the error
    const revertMessage = error?.error?.message || 'Unknown error occurred';
    setError(revertMessage);
    }
  }
  
  const handleInputChange = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const id = e.target.id;
    setSelectedId(id);
    await handleVote(id);
  }

  const handleNominate = async() => {
    // Retrieve the current accounts
    const accounts = await web3.eth.getAccounts();
    const accountAddress = accounts[0];

    if(userDetails.metamaskAccount.toLowerCase() === accountAddress.toLowerCase()){
      const transaction = await election.addCandidate(userDetails.firstName, userDetails.description, userDetails.party,userDetails.metamaskAccount);

        const receipt = await transaction.wait();
        console.log(transaction);
    }
    else{
      console.log("curr meta: ",accountAddress )
      console.log("your meta: ",userDetails.metamaskAccount )
      window.alert("First Login with your own metamask account!");
    }
    console.log("Self-nomination button clicked!");
  };

  const handleGetWinner = async () => {
    try {
      const winner = await election.getWinner();
      console.log('Winner:', winner);
      // TODO: Display the winner on the screen or perform any other action
    } catch (error) {
      console.error('Error fetching winner:', error);
      setError('Error fetching winner');
    }
  };

  const electionList = candidates.map((candidate) => (
    <div className="contact" key={candidate.id}>
    <li className="collection-item avatar">
      <i className="material-icons circle blue darken-2">ballot</i>
      <p>
        <b>{candidate.name}</b>
      </p>
      <p>{candidate.details}</p>
      <a href="" className="secondary-content">
        {hasVoted ? (
          <button
            type="button"
            className="waves-effect waves-light btn blue darken-2 disabled"
            disabled
          >
            Already Voted
          </button>
        ) : (
          <button
            id={candidate.id}
            onClick={handleInputChange}
            type="button"
            className="waves-effect waves-light btn blue darken-2"
          >
            Vote
          </button>
        )}
      </a>
    </li>
  </div>
  
  ));


  return (
    
    <div className="container">
    {/* Render the error message */}
    {error && <p className="error">{error}</p>}

    {anyTimeLeft ? (
      <ul className="collection">
        <li className="collection-item avatar">
          <h3>Candidates</h3>
        </li>
        {electionList}
      </ul>
    ) : (
      <>
        <p>Voting time has finished!</p>
        {userDetails.isCandidate && (
          <button onClick={handleGetWinner}>
            Get Winner
          </button>
        )}
      </>
    )}

    {/* Button for self-nomination */}
    {userDetails.isCandidate ? (
      <button disabled={isNominated} onClick={handleNominate}>
        {isNominated ? "You have nominated" : "Nominate Myself"}
      </button>
    ) : null}
  </div>
  
    
    
  );
  
}

export default Vote;
