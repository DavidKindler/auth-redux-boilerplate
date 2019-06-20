import React from 'react';
import { Route, Redirect, Link, withRouter } from 'react-router-dom';
import PrivateRoute from './containers/PrivateRoute';
import fakeAuth from './containers/fakeAuth';
import Login from './components/Login';
import Logout from './components/Logout';


const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>



const AuthButton = withRouter((props) => {
  return (
    fakeAuth.isAuthenticated ? (
      <div>Welcome! <Logout {...props} /> </div>
    ) : (
        <>
          <div>You are not logged in.  <Login {...props} to="/login" /> </div>
        </>
      )
  )
})

function AuthExample({ history }) {
  return (
    <div>
      <AuthButton />
      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/protected">Protected Page</Link></li>
      </ul>
      <Route exact path="/public" component={Public} />
      <PrivateRoute exact path='/protected' component={Protected} />
    </div>
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