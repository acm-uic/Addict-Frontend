import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";

export default function PasswordReset(): JSX.Element {
    let username: string = "";
    // let newpass: string = "";

    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);

    async function ResetPassword() {
        alert("http://localhost:3000/change-password?token=" + await(API.passwordToken(username,apikey,server)));
        
    }
    return (
    <div>
        <h1>Password Reset</h1>
        <label><h2>Username:<br /></h2></label>
        <input type="text" onChange={event => username = event.target.value}/><br/>

        <input type="button" value="Submit" onClick={ResetPassword}/>
    </div>
    )

}