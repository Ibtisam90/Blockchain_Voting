import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
import { ethers } from "ethers";

// import { Bar } from 'react-chartjs-2';


// const connectWallet = async () => {
  
//   const [selectedAddress] = await window.ethereum.request({
//     method: "eth_requestAccounts", // get the currently connected address
//   });
//   setSelectedAddress(selectedAddress);
  
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   const cm = new ethers.Contract(
//     contractAddress.CM, // contract address
//     CMArtifact.abi, // contract abi (meta-data)
//     provider.getSigner(0) // Signer object signs and sends transactions
//   );
//   setCm(cm);
// };

// useEffect(() => {
//   connectWallet()
// }, []

const VoteCount = ({ match }) => {
  const [account, setAccount] = useState('');
  const [election, setElection] = useState(null);
  const [candCount, setCandCount] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    loadWeb3();
    
  }, []);

  const loadWeb3 = async () => {
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

    if (contractAddress.CM) {
      const election = new ethers.Contract(
        contractAddress.CM,
        CMArtifact.abi,
        provider.getSigner(0)
      );
      setElection(election);
      
    
      const countR = await election.candidatesCount();
      const totalCand = countR.toNumber();
      
      console.log("Num of cand: ", totalCand)
    
      setCandCount(totalCand);
      for (let i = 1; i <= totalCand; i++) {
        
        const retCat = await election.candidates(i);

        const candidate = {
          id: retCat[0].toNumber(),
          name: retCat[1],
          voteCount: retCat[2].toNumber(),
          details: retCat[3],
          election_id: parseInt(retCat[4])
        };
        
        // if (candidate.election_id === parseInt(match.params.id)) {
          
          setCandidates((prevCandidates) => [...prevCandidates, candidate]);
        // }
      }
      // console.log("Candidates:  ",candidates);
    } else {
      window.alert('Election contract not deployed to detected network.');
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.id);
    setSelectedId(e.target.id);
    // vote(e.target.id);
  };

  // const vote = (id) => {
  //   console.log(selectedId);
  //   setLoading(true);
  //   election.methods
  //     .vote(id)
  //     .send({ from: account })
  //     .once('receipt', (receipt) => {
  //       setLoading(false);
  //       window.location.assign('/');
  //     });
  // };

  const getCandidateData = () => {
    const candidateNames = candidates.map((candidate) => candidate.name);
    const voteCounts = candidates.map((candidate) => candidate.voteCount);
    return {
      labels: candidateNames,
      datasets: [
        {
          label: 'Votes',
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
          hoverBorderColor: 'rgba(75, 192, 192, 1)',
          data: voteCounts,
        },
      ],
    };
  };

  return (
    <div className="container">
      <ul className="collection">
        <li className="collection-item avatar">
          <p className="title">Candidates</p>
        </li>
        {candidates.map((candidate) => (
          <div className="contact" key={candidate.id}>
            <li className="collection-item avatar">
              <i className="material-icons circle blue darken-2">ballot</i>
              <p>
                <b>{candidate.name}</b>
              </p>
              <p>{candidate.details}</p>
              <p className="secondary-content">
                <b>{candidate.voteCount}</b>
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );

  // return (
  //   <div className="container">
  //     <h3 className="title">Candidates</h3>
  //     <div className="chart-container">
  //       <Bar
  //         data={getCandidateData()}
  //         options={{
  //           responsive: true,
  //           maintainAspectRatio: false,
  //         }}
  //       />
  //     </div>
  //     <ul className="collection">
  //       {candidates.map((candidate) => (
  //         <div className="contact" key={candidate.id}>
  //           <li className="collection-item avatar">
  //             <i className="material-icons circle blue darken-2">ballot</i>
  //             <div>
  //               <p className="candidate-name">{candidate.name}</p>
  //               <p className="candidate-details">{candidate.details}</p>
  //               <p className="candidate-voteCount">
  //                 Votes: <span>{candidate.voteCount}</span>
  //               </p>
  //             </div>
  //             <button
  //               id={candidate.id}
  //               onClick={handleInputChange}
  //               type="button"
  //               className="waves-effect waves-light btn blue darken-2"
  //             >
  //               Vote
  //             </button>
  //           </li>
  //         </div>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default VoteCount;
