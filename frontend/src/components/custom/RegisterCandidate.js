
import React, { useState, useRef , useEffect} from 'react';
import axios from 'axios';
import '../../index.css';

import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
import { ethers } from "ethers";


const RegisterCandidate = () => {
  const [isFaceRegistered, setIsFaceRegistered] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [party, setParty] = useState('');
  const [description, setDescription] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const videoRef = useRef(null);
  const [metamaskAccount, setMetaAccount] = useState(null);
  const [election, setElection] = useState(null);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera: ', error);
      });
  };

    const loginMetaMask = ( ) => {

    
        // Check if Metamask is installed and injected
        if (typeof window.ethereum !== 'undefined') {
            // Get the current provider (Metamask provider)
            const provider = window.ethereum;
        
            // Request access to the user's accounts
            provider.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                // Retrieve the first account address
                const accountAddress = accounts[0];
                // console.log('Metamask account address:', accountAddress);
                setMetaAccount(accountAddress);
                // Perform additional actions or API requests using the account address
                const provider = new ethers.providers.Web3Provider(window.ethereum);

                    const electionC = new ethers.Contract(
                        contractAddress.CM,
                        CMArtifact.abi,
                        provider.getSigner(0)
                    );
                    setElection(electionC);
        
            })
            .catch((error) => {
                console.error('Metamask account access denied:', error);
            });
        } else {
            console.error('Metamask not found');
        }
  
  }
  useEffect(() => {
    loginMetaMask();
  }, []);

const registerFace = async () => {
    if (!videoRef.current) return;
    // Check if any field is empty
    if(!metamaskAccount){
        alert("Please Login with mask")
        return;
    } 

 else if (!firstName || !lastName || !party ||!description) {
    alert('Please fill in all the fields');
    return;
  }

    if (!videoRef.current.srcObject) {
        alert('Please start the video before registering');
        return;
    }

    await loginMetaMask();
    

    console.log('Metamask account address:', metamaskAccount)

    const videoEl = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      const response = await axios.post('http://localhost:8000/registerCandFace', {
        imageData,
        firstName,
        lastName,
        metamaskAccount,
        party,
        description
      });
      const { success } = response.data;

      if (success) {
        setIsFaceRegistered(true);
        console.log('Face registered successfully');

        // const transaction = await election.addCandidate(firstName, description, party);

        // const receipt = await transaction.wait();
        // console.log(transaction);
        // window.location.assign('/');


      } else {
        console.log('Face registration failed');
      }
    } catch (error) {
      console.error('Error during face registration:', error);

    }
  };

const handleLogin = async () => {
    if (!videoRef.current) return;

    if(!metamaskAccount){
        alert("Please Login with mask")
        return;
    } 


   else if (!videoRef.current.srcObject) {
        alert('Please start the video before registering');
        return;
    }

    const videoEl = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      const response = await axios.post('http://localhost:8000/recognizeCandFace', {
        imageData,
        metamaskAccount,
      });
      const { success, message, candidate } = response.data;
      delete candidate.facialBiometricData;
    //   console.log("Candidate-Data: ",candidate)

      if (success) {
        alert('Login Successful');
        console.log('Login successful');
        sessionStorage.setItem('userDetails', JSON.stringify(candidate));
        window.location.assign(`/vote`);
      } else {
        alert('Login failed, ', message);
        console.log('Login failed', response.data);
      }
    } catch (error) {
      console.error('Error during face recognition:', error);
    }
  };

  return (
    <div className="container">
      <h1 style={{marginLeft:"-3%"}}>Candidate Registration</h1>
      <div className="form">
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="party">Party Affiliation</label>
          <input
            type="text"
            id="party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
            placeholder="Enter your Party Affiliation"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="party"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell something about yourself"
          />
        </div>

        <div className="form-group">
          <label htmlFor="accountNumber">Account Address:</label>
          <input
            type="text"
            id="accountNumber"
            value={metamaskAccount}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder={metamaskAccount}
            disabled
          />
        </div>
        <video
          ref={videoRef}
          width="640"
          height="480"
          autoPlay
          className={isFaceRegistered ? 'hidden' : ''}
          
        />
        {!isFaceRegistered && (
          <button className="action-button" style={{marginTop:"10%" }} onClick={registerFace}>
            <span style={{paddingLeft:"40%"}}>Register Face</span>
          </button>
        )}
        {isFaceRegistered && (
          <div>
            <p className="success-message">Face registered. Login with Face.</p>
            <button className="action-button" onClick={handleLogin}>
              <span style={{paddingLeft:"40%"}}>Login</span>
            </button>
          </div>
        )}
        <button className="action-button" onClick={startVideo}>
        <span style={{paddingLeft:"40%"}}>Start Video</span>
          
        </button>

        <button className="action-button" onClick={handleLogin}>
        <span style={{paddingLeft:"40%"}}>Login</span>
          
        </button>
      </div>
    </div>
  );
};


  export default RegisterCandidate;