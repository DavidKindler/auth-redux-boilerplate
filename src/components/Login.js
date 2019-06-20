import React from 'react'
import { Redirect } from 'react-router-dom';
import fakeAuth from '../containers/fakeAuth';
import { connect } from 'react-redux';
import * as action from '../store/actions';

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
      <>
        <p><label>Name: <input type="text" value={this.props.auth.name} onChange={this.props.setName} /></label></p>
        <p><label>Email:<input type="text" value={this.props.auth.email} onChange={this.props.setEmail} /></label></p>
        <button onClick={this.login}>Log in</button>
      </>
    )
  }
}

// export default Login;
const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    setName: event => {
      dispatch(action.setName(event.target.value));
    },
    setEmail: event => {
      dispatch(action.setEmail(event.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
