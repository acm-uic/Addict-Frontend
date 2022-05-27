
import { apiReducerState } from "../redux/reducers/apikey"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import API from "../util/Api"

export default function Home(): JSX.Element {
    const apikey = useSelector((state: apiReducerState) => state.key)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const server: string = useSelector((state: apiReducerState) => state.server);
    let username = "";
    let password = "";
    let token: string = useSelector((state: apiReducerState) => state.key);
    const loggedIn = useSelector((state: apiReducerState) => state.loggedIn)
    const loggedInUser = useSelector((state: apiReducerState) => state.user)
  
    async function HandleSubmit(): Promise<void> {
        token = await API.getTokenFromAPI(username, password, server)
        dispatch({type: "UPDATE_USER", payload: (await API.getUser(username, token, server)).cn})
        dispatch({type: "UPDATE_KEY", payload: token})
        navigate('/authorized')
    }


    return (<div className="container-sm">
    <input onChange={event => username = event.target.value}
     type="text" name="username" id="username" placeholder='Username' aria-label='username'></input>
    <input type="password" name="password" onChange={event => password = event.target.value}
     id="password" placeholder='Password' aria-controls='password'></input>
    <div className="button" onClick={() => {HandleSubmit()}}>Login</div>
    <br /> <h3>{apikey}</h3></div>)
}