import { useDispatch,useSelector } from "react-redux"
import { apiReducerState } from "../redux/reducers/apikey"
import { useNavigate } from "react-router-dom";

import API from "../util/Api"

import people from '../img/people.jpeg'
import logo from '../img/logo.png'
import "./Home.scss"

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
        navigate('/admin/users')
    }

    return (
        <div id='home'>
            <div id="login">
                <div id="img">
                <img src = {logo}></img>
                </div>
                
                <input id='username' type='text' placeholder='Username' onChange={event => username = event.target.value}></input>
                <input id='password' type='password' placeholder="Password" onChange={event => password = event.target.value}></input>
                <div className='button' onClick={() => {HandleSubmit()} }>Login</div>
            </div>
        </div>
    )
    
}