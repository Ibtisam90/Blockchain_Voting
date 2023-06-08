import React, { Component } from 'react';
import NewElection from './components/custom/NewElection';
import NavBar from './components/custom/Navbar';
import Home from './components/custom/Home';
import Vote from './components/custom/Vote';
import VoteCount from './components/custom/VoteCount';
import ElectionData from './components/custom/ElectionData';
import Choose from './components/custom/Choose';
import { BrowserRouter, Route } from 'react-router-dom';
import NewCandidate from './components/custom/NewCandidate';
import Login from './components/custom/Login';
import RegisterVoter from './components/custom/RegisterVoter';
import RegisterCandidate from './components/custom/RegisterCandidate';
import FirstPage from './components/custom/FirstPage';

class App extends Component {

    getVal = () => {
        console.log('Test!')
    }

    render(){
        return (
        <BrowserRouter>
            <div className="App">
                <NavBar getVal={this.getVal}/>
                <Route exact path="/" component={FirstPage} />
                <Route exact path="/newelection" component={NewElection} />
                <Route exact path="/elections" component={ElectionData} />
                <Route exact path="/candidates/:id" component={NewCandidate} />
                <Route exact path="/vote" component={Vote} />
                <Route exact path="/choose" component={Choose} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/voteCount" component={VoteCount}/>
                <Route exact path="/register" component={RegisterVoter}/>
                <Route exact path="/registerCand" component={RegisterCandidate}/>
            </div>
        </BrowserRouter>
        );
    }
}

export default App;
