import React, { Component } from "react";
import { Link } from "react-router-dom";
import './style.css';

export default class Head extends Component {
  render() {
    const { username, onLogout, location} = this.props;
    return (
      <div className="header">
        <div className="nav">
          <span className="left-link">
            <Link to="/">Home</Link>
          </span>
          {username && username.length > 0 ? (
            <span className="right-link">
              Current User: {username}
              <button onClick={onLogout}>Logout</button>
            </span>
          ) : (
            <span className="right-link">
              <Link to={{pathname: '/login', state: {from: location}}}>Login</Link>
            </span>
          )}
        </div>
      </div>
    );
  };
}