import { useState } from 'react';
import './App.css';
import API from './util/Api'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HomeUnauthenticated } from './components/HomeUnauthenticated';
import { useDispatch, useSelector } from 'react-redux';
import { apiReducerState } from './redux/reducers/apikey';

function App() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [api, setAPI] = useState(new API(useSelector((state: apiReducerState) => state.server)));
  let username = "";
  let password = "";
  const loggedIn = useSelector((state: apiReducerState) => state.loggedIn)
  const loggedInUser = useSelector((state: apiReducerState) => state.user)
  
  async function HandleSubmit(): Promise<void> {
    setAPI(await api.getTokenFromAPI(username, password))
    dispatch({type: "UPDATE_USER", payload: (await api.getUser(username)).data.displayName})
    dispatch({type: "UPDATE_KEY", payload: api.token})
    navigate('/authorized')
  }

  function GetNavbar(): JSX.Element {
    if(!loggedIn){
      return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link to="/" className="navbar-brand mx-3">ACM@UIC IAM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <div className="input-group my-1 w-50 mx-3">
            <input className='form-control input-sm' onChange={event => username = event.target.value} type="text" name="username" id="username" placeholder='Username' aria-label='username'/>
            <input type="password" name="password" onChange={event => password = event.target.value} id="password" placeholder='Password' className="form-control input-sm" aria-controls='password' />
            <button type="submit" className="btn btn-primary btn-sm" onClick={() => {HandleSubmit()}}>Log In</button>
          </div>
        </div>
      </nav>
      )
    }
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link to="/" className="navbar-brand mx-3">ACM@UIC IAM</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <div className="navbar-nav">
                <Link to="/authorized" className="nav-item nav-link">Home</Link>
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
