import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from "aws-amplify-react";
import { Auth } from "aws-amplify";

class App extends Component {
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  };

  signUp = async () => {
    const { email, password,  username, phone_number } = this.state;
    try {
      await Auth.signUp({ username, password,  attributes: { phone_number, email} });
      this.setState({ step: 1 });
      console.log('successfully signed up!');
    } catch (error) {
      console.log('error signing up!', error);
    }
  };

  confirmSignUp = async () => {
    const { username, authenticationCode } = this.state;
    try {
      await Auth.signUp(username, authenticationCode);
      console.log('user successfully signed up');
    } catch (error) {
      console.log('error confirming signing up!', error);
    }
  };

  state = { email: '', password: '',  username: '', phone_number: '', authenticationCode: '', step: 0 };

  render = () => {
    return (
      <div className="App">
        { this.state.step === 0 && <div>
            <input placeholder="username" type="text" onChange={this.onChange} name="username" />
            <input placeholder="email" type="text" onChange={this.onChange} name="email" />
            <input placeholder="password" type="password" onChange={this.onChange} name="password" />
            <input placeholder="phone number" type="text" onChange={this.onChange} name="phone_number" />
            <button onClick={this.signUp}>sign up</button>
        </div> }

        { this.state.step === 1 && <div>
            <input placeholder="username" type="text" onChange={this.onChange} name="username" />
            <input placeholder="authentication code" type="text" onChange={this.onChange} name="authenticationCode" />
            <button onClick={this.confirmSignUp}>confirm sign up</button>
        </div> }

      </div>
  );
}
}

export default withAuthenticator(App, { includeGreetings: true });
