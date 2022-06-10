import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import { useSearchParams } from "react-router-dom";
import "./ChangePassword.scss";
import background from "../img/people.jpeg";
import logo from "../img/logo.png";

export default function ChangePassword(): JSX.Element {
    let username: string = ""
    let newpass: string = ""

    const server = useSelector((state: apiReducerState) => state.server);
    const [searchParams, setSearchParams] = useSearchParams();
    
    async function ChangePass() {
        const apikey = searchParams.get("token")
        console.log(apikey)
        if (apikey) {
            alert(await API.changePassword(username,newpass,apikey,server));
        }
    }
    return (
        <div id="change-password">
            
            <div id = "login">
                <div id = "img">
                <img id="logo" src={logo}/><br/>
                </div>
                <h1>Change password</h1>
                {/* <label><h2>Username:</h2></label> */}
                <input type="text" placeholder={"Username"} onChange = {event => username = event.target.value}/><br/>
                {/* <label><h2>New password:</h2></label> */}
                <input type="password" placeholder={"New password"} onChange = {event => newpass = event.target.value}/><br/>
                <div className="button" onClick={ChangePass}>Submit</div>
            </div>
        </div>
        
    )
}