
// import React, { useState, useRef , useEffect} from 'react';
// import axios from 'axios';
// import '../../index.css';
// import { useHistory } from 'react-router-dom';



// const RegisterVoter = () => {
//     const history = useHistory();
//   const [isFaceRegistered, setIsFaceRegistered] = useState(false);
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [accountNumber, setAccountNumber] = useState('');
//   const videoRef = useRef(null);
//   const [metamaskAccount, setMetaAccount] = useState(null);

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
//                 // ...
        
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

//  else if (!firstName || !lastName) {
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
//       const response = await axios.post('http://localhost:8000/registerFace', {
//         imageData,
//         firstName,
//         lastName,
//         metamaskAccount,
//       });
//       const { success } = response.data;

//       if (success) {
//         setIsFaceRegistered(true);
//         console.log('Face registered successfully');
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
//       const response = await axios.post('http://localhost:8000/recognizeFace', {
//         imageData,
//         metamaskAccount,
//       });
//       const { success, message, voter } = response.data;
//       delete voter.facialBiometricData;

//       if (success) {
//         alert('Login Successful');
//         console.log('Login successful');
//         sessionStorage.setItem('userDetails', JSON.stringify(voter));
//         window.location.assign(`/vote`);
//       } else {
//         console.log('Login failed');
//       }
//     } catch (error) {
//       console.error('Error during face recognition:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <h1 style={{marginLeft:"-3%"}}>Face Registration</h1>
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


//   export default RegisterVoter;
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

const RegisterVoter = () => {
  const history = useHistory();
  const [isFaceRegistered, setIsFaceRegistered] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const videoRef = useRef(null);
  const [metamaskAccount, setMetaAccount] = useState(null);

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
          // ...
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
    } else if (!firstName || !lastName) {
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
      const response = await axios.post('http://localhost:8000/registerFace', {
        imageData,
        firstName,
        lastName,
        metamaskAccount,
      });
      const { success } = response.data;

      if (success) {
        setIsFaceRegistered(true);
        console.log('Face registered successfully');
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
      const response = await axios.post('http://localhost:8000/recognizeFace', {
        imageData,
        metamaskAccount,
      });
      const { success, message, voter } = response.data;
      delete voter.facialBiometricData;

      if (success) {
        alert('Login Successful');
        console.log('Login successful');
        sessionStorage.setItem('userDetails', JSON.stringify(voter));
        window.location.assign(`/vote`);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error during face recognition:', error);
    }
  };

  return (
    <>
      <main style={{ overflow: 'hidden' }}>
        <section className='absolute w-full h-full'>
          <div className='absolute top-0 w-full h-full bg-gray-900'></div>
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-4/12 px-4'>
                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0'>
                  <div className='rounded-t mb-0 px-6 py-6'>
                    <div className='text-center mb-3'></div>
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <form>
                      <h1>Face Registration</h1>
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
                          className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          htmlFor='lastName'
                        >
                          Last Name:
                        </label>
                        <input
                          type='text'
                          className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                          id='lastName'
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder='Enter your last name'
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
                          className='bg-gray-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3  rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 w-full'
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
                            className='bg-gray-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mt-1 w-full'
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
                          className='bg-gray-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                          onClick={startVideo}
                        >
                          Start Video
                        </button>
                        <button
                          type='button'
                          style={{ transition: 'all .15s ease' }}
                          className='bg-gray-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
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

export default RegisterVoter;