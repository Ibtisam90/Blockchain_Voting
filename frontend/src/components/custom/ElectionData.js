import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ElectionData = () => {
  const [elections, setElections] = useState([]);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/electionName');
      setElections(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <ul className="collection">
        <li className="collection-item avatar">
          <h3>Elections</h3>
        </li>
        {elections.map(election => (
          <div className="contact" key={election.election_id}>
            <li className="collection-item avatar">
              <i className="material-icons circle blue darken-2">ballot</i>
              <p><b>{election.election_name}</b></p>
              <br />
              <Link to={`/candidates/${election.election_id}`} className="title">
                <button className="waves-effect waves-light btn yellow darken-3">
                  Add candidate
                </button>
              </Link>
              &nbsp;&nbsp;&nbsp;
              <Link to={`/voteCount/${election.election_id}`} className="title">
                <button className="waves-effect waves-light btn red darken-3">
                  View vote Count
                </button>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ElectionData;
