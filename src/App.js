import React from 'react';
import { HashRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import fakeAuth from './containers/fakeAuth';

const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>



const AuthButton = withRouter((props) => {
  const { from } = props.location.state || { from: { pathname: '/' } }
  return (
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => props.history.push('/'))
        }}>Sign out</button>
      </p>
    ) : (
        <>
          <p>You are not logged in.</p>
          <button onClick={() => {
            fakeAuth.authenticate(() => props.history.push(from))
          }}>Login</button>
        </>
      )
  )
})

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public} />
        {/* <Route path="/login" component={Login} /> */}
        <PrivateRoute path='/protected' component={Protected} />
      </div>
    </Router>
  )
}

function App() {
  return (
    <div>
      <AuthExample />
    </div>
  )
}

export default App;