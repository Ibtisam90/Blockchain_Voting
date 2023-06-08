import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class Navbar extends Component {
    state = {
        location: ""
    }

    componentWillReceiveProps(){
        console.log(this.props)
        this.setState({
            location: this.props.history.location.pathname
        })
    }
    render(){

        if (
            this.state.location === "/" ||
            this.state.location === "/choose" ||
            this.state.location === "/vote" ||
            this.state.location === "/login"
          ) {
            return (
              <nav className="nav-wrapper black darken-2">
                <div className="container">
                  <a href="/" className="brand-logo">
                    Online Voting
                  </a>
                </div>
              </nav>
            );
          } else {
            return (
              <nav className="nav-wrapper black darken-2">
                <div className="container">
                  <a href="/" className="brand-logo">
                  Online Voting
                  </a>
                  <ul className="right">
                    {/* <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/newelection">New Election</a>
                    </li>
                    <li>
                      <a href="/elections">Elections</a>
                    </li> */}
                  </ul>
                </div>
              </nav>
            );
          }
          

        
    }
}

export default withRouter(Navbar)