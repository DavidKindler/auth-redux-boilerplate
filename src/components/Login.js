import React from 'react'
import { Redirect } from 'react-router-dom';
import fakeAuth from '../containers/fakeAuth';

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const from = (this.props.location.state && this.props.location.state.from) || this.props.location.pathname || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <button onClick={this.login}>Log in</button>
    )
  }
}

export default Login;
