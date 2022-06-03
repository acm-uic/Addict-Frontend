import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import './AuthenticatedNav.scss'
import logo from '../img/logo.png'

export default function AuthenticatedNav(): JSX.Element{
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

    function GetNavbar(): JSX.Element {
        if(!loggedIn){
            return <Navigate replace to="/admin/login" />
        }
        return (
            <nav className='navbar navbar-expand-lg navbar-light'>
            <Link to="/" className="navbar-brand mx-3"><img src={logo} alt="ACM at UIC" /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                <div className="navbar-nav">
                    <Link to="/admin/users" className="nav-item nav-link">Users</Link>
                    <Link to="/admin/create" className="nav-item nav-link">Create</Link>
                </div>
            <h4 className="mx-3 user-text">Welcome, {loggedInUser}</h4>
            </div>
        </nav>
        )
    }
    return GetNavbar();
}
