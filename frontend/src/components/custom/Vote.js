import React, { useState, useEffect } from "react";
import Web3 from "web3";

import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

function Vote({match}) {
  const [account, setAccount] = useState("");
  const [election, setElection] = useState(null);
  const [candCount, setCandCount] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWeb3();
  }, []);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      const [selectedAddress] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(selectedAddress);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setAccount(provider.getSigner(0));

      if (contractAddress.CM) {
        const election = new ethers.Contract(
          contractAddress.CM,
          CMArtifact.abi,
          provider.getSigner(0)
        );
        setElection(election);

        const countR = await election.candidatesCount();
        const candCount = countR.toNumber();
        setCandCount(candCount);

        const fetchedCandidates = [];
        for (let i = 1; i <= candCount; i++) {
          const retCat = await election.candidates(i);

          const candidate = {
            id: retCat.id.toNumber(),
            name: retCat.name,
            voteCount: retCat.voteCount.toNumber(),
            details: retCat.details,
            election_id: parseInt(retCat.election_id),
          };

          if (candidate.election_id === parseInt(match.params.id)) {
            fetchedCandidates.push(candidate);
          }
        }
        setCandidates(fetchedCandidates);
      } else {
        window.alert("Election contract not deployed to detected network.");
      }
    } catch (error) {
      console.error(error);
    }
  }
   async function handleVote(id) {
    try {
      setLoading(true);
      const transaction = await election.vote(id);
      await transaction.wait();
      setLoading(false);
      console.log("Vote successful");
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

  const electionList = candidates.map((candidate) => (
    <div className="contact" key={candidate.id}>
      <li className="collection-item avatar">
        <i className="material-icons circle blue darken-2">ballot</i>
        <p>
          <b>{candidate.name}</b>
        </p>
        <p>{candidate.details}</p>
        <a href="" className="secondary-content">
          <button
            id={candidate.id}
            onClick={handleInputChange}
            type="button"
            className="waves-effect waves-light btn blue darken-2"
          >
            Vote
          </button>
        </a>
      </li>
    </div>
  ));


  return (
    <div className="container">
      {/* Render the error message */}
      {error && <p className="error">{error}</p>}

      <ul className="collection">
        <li className="collection-item avatar">
          <h3>Candidates</h3>
        </li>
        {electionList}
      </ul>
    </div>
  );
}

export default Vote;
