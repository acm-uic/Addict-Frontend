import { useState } from 'react';
import './App.css';
import API from './util/Api'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { HomeUnauthenticated } from './components/HomeUnauthenticated';

const server: string = "http://addict-api.acmuic.org"

function App() {
  const navigate = useNavigate();
  const [api, setAPI] = useState(new API(server));
  let username = "";
  let password = "";
  
  const [loggedIn, updateLoggedIn]  = useState(false);
  const [loggedInUser, updateLoggedInUser] = useState("");
  
  async function handleSubmit(): Promise<void> {
    setAPI(await api.getTokenFromAPI(username, password))
    updateLoggedInUser((await api.getUser(username)).data.displayName)
    updateLoggedIn(true);
    const cookies = new Cookies();
    cookies.set("token", {token: api.token, server: server}, {path: '/'})
    navigate('/authorized')
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
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="navbar-nav">
                <Link to="/authorized" state={{token: api.token}} className="nav-item nav-link">Home</Link>
                <Link to="/users" className="nav-item nav-link">Users</Link>
                <Link to="/create" className="nav-item nav-link">Create</Link>
                <Link to="/password-reset" className="nav-item nav-link">Password Reset</Link>
            </div>
          <h4 className="mx-3 text-light">Welcome, {loggedInUser}</h4>
        </div>
      </nav>
    )
  }

  function GetHome(): JSX.Element {
    if(loggedIn){
      return <Outlet />
    }
    return <HomeUnauthenticated />
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
