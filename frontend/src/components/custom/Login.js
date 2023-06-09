// import React, { Component } from 'react'
// import axios from 'axios'

// class Login extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             'username': null,
//             'password': null
//         }
//     }

//     handleInputChange = (e) => {
//         this.setState({
//             [e.target.id]: e.target.value,
//         })
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         const { username, password } = this.state;
//         console.log(username)
//         axios.post('http://localhost:8000/api/adminLogin', {
//             username: username,
//             password: password,
//         })
//         .then(function(response){ 
//             if(response.data){
//                 window.location.assign("/newelection")
//             }else{
//                 alert('Incorrect Username or Password');
//             }
//         })
//         .catch(function(err){
//             console.error(err);
//         });
//     }


//     render(){
//         return(
//             <div className="container">
//                 <form onSubmit={this.handleSubmit}>
//                     <input type="text" id="username" name="username" onChange={this.handleInputChange} required/>
//                     <label htmlFor="name">Username</label><br></br>
//                     <input type="password" id="password" name="password" onChange={this.handleInputChange} required/>
//                     <label htmlFor="name">Password</label><br></br><br></br>
//                     <button className="btn blue darken-2" type="submit" name="action">Submit
//                         <i className="material-icons right">send</i>
//                     </button>
//                 </form>
//             </div>      
//         )
//     }
// }

// export default Login;
import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    console.log(username);
    axios
      .post('http://localhost:8000/api/adminLogin', {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data) {
          window.location.assign('/newelection');
        } else {
          alert('Incorrect Username or Password');
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  render() {
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
                      <form onSubmit={this.handleSubmit}>
                        <div class='flex justify-center pb-5 text-blue-900'>
                          <h1 class='text-2xl font-bold'>Login</h1>
                        </div>
                        <div className='relative w-full mb-3'>
                          <label
                            htmlFor='name'
                            className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          >
                            Username
                          </label>
                          <input
                            type='text'
                            id='username'
                            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                            name='username'
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>
                        <div className='relative w-full mb-3'>
                          <label
                            htmlFor='name'
                            className='block uppercase text-gray-700 text-xs font-bold mb-2'
                          >
                            Password
                          </label>
                          <input
                            type='password'
                            className='border-0 px-3 py-3 placeholder-gray-400 text-gray-900 font-bold bg-white rounded text-sm shadow focus:outline-none focus:ring w-full'
                            id='password'
                            name='password'
                            onChange={this.handleInputChange}
                            required
                          />
                        </div>

                        <div className='text-center mt-1'>
                          <button
                            type='submit'
                            style={{ transition: 'all .15s ease' }}
                            className='bg-blue-900 text-white hover:bg-orange-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                            name='action'
                          >
                            Submit
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
  }
}

export default Login;