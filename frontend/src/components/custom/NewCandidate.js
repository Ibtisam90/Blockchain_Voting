import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';

// import Election from '../../../artifacts/contracts/Election.sol/Election.json';

import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
import { ethers } from "ethers";

function NewCandidate(props) {
  const [lastNonce, setLastNonce] = useState(0);
  const [account, setAccount] = useState('');
  const [election, setElection] = useState(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateDetails, setCandidateDetails] = useState('');
  const [id, setId] = useState('');

  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
   loadWeb3();
  
  }, []);

  
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/candList');
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setAccount(provider.getSigner(0));

    console.log("signer is: ",provider.getSigner(0) );

    if (contractAddress.CM) {
      const electionC = new ethers.Contract(
        contractAddress.CM,
        CMArtifact.abi,
        provider.getSigner(0)
      );
      setElection(electionC);
     
    } else {
      window.alert('Election contract not deployed to the detected network.');
    }
  }

  function handleInputChange(e) {
    const { id, value } = e.target;
    if (id === 'candidate_name') {
      setCandidateName(value);
    } else if (id === 'candidate_details') {
      setCandidateDetails(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addCandidate();
  }

  async function addCandidate() {
    console.log({ candidateName, candidateDetails, id });
    console.log("Election: ", election);

    try {
      const transaction = await election.addCandidate(candidateName, candidateDetails, id);

      setLastNonce(lastNonce + 1);
      // const receipt = await transaction.wait();
      console.log(transaction);
      window.location.assign('/');
    } catch (error) {
      console.log('Error adding candidate:', error);
    }
  }

  useEffect(() => {
    const id = props.match.params.id;
    setId(id);
  }, [props.match.params.id]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input type="text" id="candidate_name" name="candidate_name" onChange={handleInputChange} required />
        <label htmlFor="name">Candidate Name</label><br></br>
        <input type="text" id="candidate_details" name="candidate_details" onChange={handleInputChange} required />
        <label htmlFor="name">Candidate details</label><br></br><br></br>
        <button className="btn blue darken-2" type="submit" name="action">Submit
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
}

export default NewCandidate;
