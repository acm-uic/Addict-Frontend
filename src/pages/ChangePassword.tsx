import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import { useSearchParams } from "react-router-dom";

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
    <div>
        <h1>Change password</h1><br/>
        <label><h2>Username:</h2></label>
        <input type="text" onChange = {event => username = event.target.value}/><br/>
        <h2>New password</h2>
        <input type="password" onChange = {event => newpass = event.target.value}/><br/>
        
        <input type="button" value="Submit" onClick={ChangePass}/>
    </div>)
}