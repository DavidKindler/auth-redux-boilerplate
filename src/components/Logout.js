import React from 'react'
import fakeAuth from '../containers/fakeAuth';

class Logout extends React.Component {

  logout = () => {
    const from = (this.props.location.state && this.props.location.state.from) || this.props.location.pathname || { from: { pathname: '/' } }
    fakeAuth.signout(() => {
      this.props.history.push(from)
    })
  }
  render() {
    return (
      <button onClick={this.logout}>Logout</button>
    )
  }
}

export default Logout
