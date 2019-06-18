import React from 'react';
import { HashRouter as Router, Route, Redirect, Link, withRouter } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import fakeAuth from './containers/fakeAuth';
import Login from './components/Login';


const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>



const AuthButton = withRouter((props) => {
  // const { from } = props.location.state || { from: { pathname: '/' } }
  return (
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome! <button onClick={() => {
          fakeAuth.signout(() => props.history.push('/'))
        }}>Sign out</button>
      </p>
    ) : (
        <div>You are not logged in.  <Redirect to="/login" /> </div>
      )
  )
})

function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />
        <Route path="/login" component={Login} />
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public} />
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