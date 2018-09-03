import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { actions as authActions, getLoggedUser } from "../../redux/modules/auth";
import "./style.css";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'jack',
      password: '123456',
      redirectToReferer: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const isLoggedIn = !this.props.user.userId && nextProps.user.userId;
    if (isLoggedIn) {
      this.setState({
        redirectToReferer: true
      });
    }
  }

  handleChange = e => {
    if (e.target.name === 'username') {
      this.setState({
        username: e.target.value
      });
    } else if (e.target.name === 'password') {
      this.setState({
        password: e.target.value
      });
    } else {
      
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    if (username.length === 0 || password.length === 0) {
      alert('Incorrect username or password');
      return;
    }

    if (this.props.user.userId) {
      this.props.logout();
    }
    this.props.login(username, password);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferer } = this.state;

    console.log('---redirectToReferer---', redirectToReferer);
    if (redirectToReferer) {
      return <Redirect to={from} />
    }

    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <div>
          <label>
            username:
            <input 
              name="username" 
              type="text" 
              value={this.state.username} 
              onChange={this.handleChange} 
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <input type="submit" value="Login" />
      </form>
    )
  };
}

const mapStateToProps = state => {
  return {
    user: getLoggedUser(state)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators(authActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);