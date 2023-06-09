
// import React, { useState, useRef , useEffect} from 'react';
// import axios from 'axios';
// import '../../index.css';

// import contractAddress from "../../contracts/contract-address.json"; // address generated from the deploy script
// import CMArtifact from "../../contracts/CM.json"; // artifacts generated from the deploy script
// import { ethers } from "ethers";


// const RegisterCandidate = () => {
//   const [isFaceRegistered, setIsFaceRegistered] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [party, setParty] = useState('');
//   const [description, setDescription] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const videoRef = useRef(null);
//   const [metamaskAccount, setMetaAccount] = useState(null);
//   const [election, setElection] = useState(null);

//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         videoRef.current.srcObject = stream;
//       })
//       .catch((error) => {
//         console.error('Error accessing the camera: ', error);
//       });
//   };

//     const loginMetaMask = ( ) => {

    
//         // Check if Metamask is installed and injected
//         if (typeof window.ethereum !== 'undefined') {
//             // Get the current provider (Metamask provider)
//             const provider = window.ethereum;
        
//             // Request access to the user's accounts
//             provider.request({ method: 'eth_requestAccounts' })
//             .then((accounts) => {
//                 // Retrieve the first account address
//                 const accountAddress = accounts[0];
//                 // console.log('Metamask account address:', accountAddress);
//                 setMetaAccount(accountAddress);
//                 // Perform additional actions or API requests using the account address
//                 const provider = new ethers.providers.Web3Provider(window.ethereum);

//                     const electionC = new ethers.Contract(
//                         contractAddress.CM,
//                         CMArtifact.abi,
//                         provider.getSigner(0)
//                     );
//                     setElection(electionC);
        
//             })
//             .catch((error) => {
//                 console.error('Metamask account access denied:', error);
//             });
//         } else {
//             console.error('Metamask not found');
//         }
  
//   }
//   useEffect(() => {
//     loginMetaMask();
//   }, []);

// const registerFace = async () => {
//     if (!videoRef.current) return;
//     // Check if any field is empty
//     if(!metamaskAccount){
//         alert("Please Login with mask")
//         return;
//     } 

//  else if (!firstName || !lastName || !party ||!description) {
//     alert('Please fill in all the fields');
//     return;
//   }

//     if (!videoRef.current.srcObject) {
//         alert('Please start the video before registering');
//         return;
//     }

//     await loginMetaMask();
    

//     console.log('Metamask account address:', metamaskAccount)

//     const videoEl = videoRef.current;
//     const canvas = document.createElement('canvas');
//     canvas.width = videoEl.videoWidth;
//     canvas.height = videoEl.videoHeight;
//     const context = canvas.getContext('2d');
//     context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await axios.post('http://localhost:8000/registerCandFace', {
//         imageData,
//         firstName,
//         lastName,
//         metamaskAccount,
//         party,
//         description
//       });
//       const { success } = response.data;

//       if (success) {
//         setIsFaceRegistered(true);
//         console.log('Face registered successfully');

//         // const transaction = await election.addCandidate(firstName, description, party);

//         // const receipt = await transaction.wait();
//         // console.log(transaction);
//         // window.location.assign('/');


//       } else {
//         console.log('Face registration failed');
//       }
//     } catch (error) {
//       console.error('Error during face registration:', error);

//     }
//   };

// const handleLogin = async () => {
//     if (!videoRef.current) return;

//     if(!metamaskAccount){
//         alert("Please Login with mask")
//         return;
//     } 


//    else if (!videoRef.current.srcObject) {
//         alert('Please start the video before registering');
//         return;
//     }

//     const videoEl = videoRef.current;
//     const canvas = document.createElement('canvas');
//     canvas.width = videoEl.videoWidth;
//     canvas.height = videoEl.videoHeight;
//     const context = canvas.getContext('2d');
//     context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
//     const imageData = canvas.toDataURL('image/jpeg');

//     try {
//       const response = await axios.post('http://localhost:8000/recognizeCandFace', {
//         imageData,
//         metamaskAccount,
//       });
//       const { success, message, candidate } = response.data;
//       delete candidate.facialBiometricData;
//     //   console.log("Candidate-Data: ",candidate)

//       if (success) {
//         alert('Login Successful');
//         console.log('Login successful');
//         sessionStorage.setItem('userDetails', JSON.stringify(candidate));
//         window.location.assign(`/vote`);
//       } else {
//         alert('Login failed, ', message);
//         console.log('Login failed', response.data);
//       }
//     } catch (error) {
//       console.error('Error during face recognition:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 style={{marginLeft:"-3%"}}>Candidate Registration</h1>
//       <div className="form">
//         <div className="form-group">
//           <label htmlFor="firstName">First Name:</label>
//           <input
//             type="text"
//             id="firstName"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             placeholder="Enter your first name"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="lastName">Last Name:</label>
//           <input
//             type="text"
//             id="lastName"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             placeholder="Enter your last name"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="party">Party Affiliation</label>
//           <input
//             type="text"
//             id="party"
//             value={party}
//             onChange={(e) => setParty(e.target.value)}
//             placeholder="Enter your Party Affiliation"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="description">Description:</label>
//           <input
//             type="text"
//             id="party"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Tell something about yourself"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="accountNumber">Account Address:</label>
//           <input
//             type="text"
//             id="accountNumber"
//             value={metamaskAccount}
//             onChange={(e) => setAccountNumber(e.target.value)}
//             placeholder={metamaskAccount}
//             disabled
//           />
//         </div>
//         <video
//           ref={videoRef}
//           width="640"
//           height="480"
//           autoPlay
//           className={isFaceRegistered ? 'hidden' : ''}
          
//         />
//         {!isFaceRegistered && (
//           <button className="action-button" style={{marginTop:"10%" }} onClick={registerFace}>
//             <span style={{paddingLeft:"40%"}}>Register Face</span>
//           </button>
//         )}
//         {isFaceRegistered && (
//           <div>
//             <p className="success-message">Face registered. Login with Face.</p>
//             <button className="action-button" onClick={handleLogin}>
//               <span style={{paddingLeft:"40%"}}>Login</span>
//             </button>
//           </div>
//         )}
//         <button className="action-button" onClick={startVideo}>
//         <span style={{paddingLeft:"40%"}}>Start Video</span>
          
//         </button>

//         <button className="action-button" onClick={handleLogin}>
//         <span style={{paddingLeft:"40%"}}>Login</span>
          
//         </button>
//       </div>
//     </div>
//   );
// };


//   export default RegisterCandidate;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import contractAddress from '../../contracts/contract-address.json'; // address generated from the deploy script
import CMArtifact from '../../contracts/CM.json'; // artifacts generated from the deploy script
import { ethers } from 'ethers';

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

  const loginMetaMask = () => {
    // Check if Metamask is installed and injected
    if (typeof window.ethereum !== 'undefined') {
      // Get the current provider (Metamask provider)
      const provider = window.ethereum;

      // Request access to the user's accounts
      provider
        .request({ method: 'eth_requestAccounts' })
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
  };
  useEffect(() => {
    loginMetaMask();
  }, []);

  const registerFace = async () => {
    if (!videoRef.current) return;
    // Check if any field is empty
    if (!metamaskAccount) {
      alert('Please Login with mask');
      return;
    } else if (!firstName || !lastName || !party || !description) {
      alert('Please fill in all the fields');
      return;
    }

    if (!videoRef.current.srcObject) {
      alert('Please start the video before registering');
      return;
    }

    await loginMetaMask();

    console.log('Metamask account address:', metamaskAccount);

    const videoEl = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    try {
      const response = await axios.post(
        'http://localhost:8000/registerCandFace',
        {
          imageData,
          firstName,
          lastName,
          metamaskAccount,
          party,
          description,
        }
      );
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

    if (!metamaskAccount) {
      alert('Please Login with mask');
      return;
    } else if (!videoRef.current.srcObject) {
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
      const response = await axios.post(
        'http://localhost:8000/recognizeCandFace',
        {
          imageData,
          metamaskAccount,
        }
      );
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
    <>
      <main style={{ overflow: 'hidden' }}>
        <section className='absolute w-full h-full'>
          <div
            className='absolute top-0 w-full h-full bg-gray-900'
            style={{
              backgroundImage:
                "url('https://blog.ipleaders.in/wp-content/uploads/2019/08/SOC-voting-image-TEXTLESS-800x450.jpg')",
              backgroundSize: 'cover',
            }}
          ></div>
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0 mt-8 mb-8'>
                  <div className='rounded-t mb-0 px-6 py-6'>
                    <div className='text-center mb-3'></div>
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <form>
                      <div class='flex justify-center pb-5 text-blue-900'>
                        <h1 class='text-2xl font-bold'>
                          Candidate Registeration
                        </h1>
                      </div>
                      <div class='grid grid-cols-2 gap-4'>
                        <div className='relative w-full mb-3'>
                          <label
                            className='block uppercase text-gray-700 text-xs font-bold mb-2'
                            htmlFor='firstName'
                          >
                            First Name:
                          </label>
                          <input
                            type='text'
                            id='firstName'
                            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder='Enter your first name'
                          />
                        </div>

                        <div className='relative w-full mb-3'>
                          <label
                            htmlFor='lastName'
                            className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          >
                            Last Name:
                          </label>
                          <input
                            type='text'
                            id='lastName'
                            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder='Enter your last name'
                          />
                        </div>
                      </div>
                      <div className='relative w-full mb-3'>
                        <label
                          htmlFor='party'
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                        >
                          Party Affiliation
                        </label>
                        <input
                          type='text'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          id='party'
                          value={party}
                          onChange={(e) => setParty(e.target.value)}
                          placeholder='Enter your Party Affiliation'
                        />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          htmlFor='description'
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                        >
                          Description:
                        </label>
                        <input
                          type='text'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          id='party'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder='Tell something about yourself'
                        />
                      </div>

                      <div className='relative w-full mb-3'>
                        <label
                          htmlFor='accountNumber'
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                        >
                          Account Address:
                        </label>
                        <input
                          type='text'
                          id='accountNumber'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          value={metamaskAccount}
                          onChange={(e) => setAccountNumber(e.target.value)}
                          placeholder={metamaskAccount}
                          disabled
                        />
                      </div>

                      <video
                        ref={videoRef}
                        width='640'
                        height='480'
                        autoPlay
                        className={
                          isFaceRegistered
                            ? 'hidden'
                            : '' + 'bg-gray-400 rounded'
                        }
                      />

                      {!isFaceRegistered && (
                        <button
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          className='bg-blue-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 w-full'
                          onClick={registerFace}
                        >
                          Register Face
                        </button>
                      )}
                      {isFaceRegistered && (
                        <div>
                          <p className='success-message'>
                            Face registered. Login with Face.
                          </p>
                          <button
                            type='button'
                            style={{ transition: 'all .15s ease' }}
                            className='bg-blue-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 w-full'
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                        </div>
                      )}

                      <div className='text-center mt-1'>
                        <button
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          className='bg-blue-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                          onClick={startVideo}
                        >
                          Start Video
                        </button>

                        <button
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          className='bg-blue-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterCandidate;