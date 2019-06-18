import React from 'react';
import { Route, Redirect, Link, withRouter, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
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

function AuthExample({ history }) {
  return (
    // <ConnectedRouter history={history}>
    <div>
      <AuthButton />
      <Switch>
        <Route path="/login" component={Login} />
        <ul>
          <li><Link to="/public">Public Page</Link></li>
          <li><Link to="/protected">Protected Page</Link></li>
        </ul>
        <Route path="/public" component={Public} />
        <PrivateRoute path='/protected' component={Protected} />
      </Switch>
    </div>
    // </ConnectedRouter>
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