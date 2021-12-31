import React, { ReactNode, useState } from 'react';
import './App.css';
import { HomeAuthenticated } from './components/HomeAuthenticated';
import { HomeUnauthenticated } from './components/HomeUnauthenticated';
import { Users } from './components/Users';
import API from './util/Api'

const server: string = "http://addict-api.acmuic.org"

function App() {
  const [api, setAPI] = useState(new API(server));
  const [users, setUsers] = useState("");
  let username = "";
  let password = "";
  // Create the api object and store its state
  
  const [loggedIn, updateLoggedIn]  = useState(false);
  const [loggedInUser, updateLoggedInUser] = useState("");
  
  async function handleSubmit(): Promise<void> {
    setAPI(await api.getTokenFromAPI(username, password))
    setUsers(JSON.stringify((await api.getAllUsers()).data))
    updateLoggedInUser((await api.getUser(username)).data.displayName)
    updateLoggedIn(true);
  }

  function GetHome(): JSX.Element {
    if(loggedIn){
      return <Users users={users} />
    }
    return <HomeUnauthenticated />
  }

  function GetNavbar(): JSX.Element {
    if(!loggedIn){
      return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a href="#" className="navbar-brand mx-3">ACM@UIC IAM</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div className="input-group my-1 w-50 mx-3">
            <input className='form-control input-sm' onChange={event => username = event.target.value} type="text" name="username" id="username" placeholder='Username' aria-label='username'/>
            <input type="password" name="password" onChange={event => password = event.target.value} id="password" placeholder='Password' className="form-control input-sm" aria-controls='password' />
            <button type="submit" className="btn btn-primary btn-sm" onClick={() => handleSubmit()}>Log In</button>
          </div>
        </div>
      </nav>
      )
    }
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <a href="#" className="navbar-brand mx-3">ACM@UIC IAM</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <h4 className="mx-3 text-light">Welcome, {loggedInUser}</h4>
        </div>
      </nav>
    )
  }

  return (
    <div className="App">
      <GetNavbar />
      <div className="container-lg">
        <GetHome />
      </div>
    </div>
    
  );
}



export default App;
