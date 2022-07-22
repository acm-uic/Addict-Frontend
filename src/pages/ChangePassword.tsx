import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import { useSearchParams } from "react-router-dom";
import "./ChangePassword.scss";
import logo from "../img/logo.png";

export default function ChangePassword(): JSX.Element {
    let username: string = ""
    let newPass: string = ""
    let conPass: string = ""

    const server = useSelector((state: apiReducerState) => state.server);
    const [searchParams] = useSearchParams();
 
    // parseJwt is currently untested
    // function parseJwt(token: string) {
    //     if (token === null) {
    //         return "";
    //     }
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    //
    //     return JSON.parse(jsonPayload);
    // }

    async function ChangePass() {
        // Check newPass and conPass to be the same and alert if not
        const apikey = searchParams.get("token")
        console.log(apikey)
        if (newPass === conPass) {
            if (apikey) {
                alert(await API.changePassword(username, newPass, apikey, server));
            }
        } else {
            alert("Passwords must match");
        }

    }
    return (
        <div id="change-password">

            <div id="login">
                <div id="img">
                    <img id="logo" src={logo} alt={"ACM Group"}/><br />
                </div>
                <h1>Change password</h1>
                {/* <label><h2>Username:</h2></label> */}
                <input type="text" placeholder={"New Password"} onChange={event => newPass = event.target.value} /><br />
                {/* <label><h2>New password:</h2></label> */}
                <input type="password" placeholder={"Confirm Password"} onChange={event => conPass = event.target.value} /><br />
                <div className="button" onClick={ChangePass}>Submit</div>
            </div>
        </div>

    )
}