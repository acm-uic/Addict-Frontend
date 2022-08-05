
import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
export default function Create(): JSX.Element {
    let firstName: string = ""
    let lastName: string = ""
    let username: string = ""
    let email: string = ""
    let description: string = ""
    let password: string = ""

    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);

    async function CreateUser() {
        alert(await API.createUser(firstName, lastName, username, email, description, apikey, server, password));
    }
    return (<div>
        <h1>Create a user</h1>

        <label><h2>Email:<br /></h2></label>
        <input type="text" onChange={event => email = event.target.value}/><br/>

        <label><h2>First name:</h2></label>
        <input type="text" onChange={event => firstName = event.target.value}/><br/>

        <label><h2>Last name:<br /></h2></label>
        <input type="text" onChange={event => lastName = event.target.value}/><br/>

        <label><h2>Username:<br /></h2></label>
        <input type="text" onChange={event => username = event.target.value}/><br/>

        <label><h2>Password:<br /></h2></label>
        <input type="text" onChange={event => password = event.target.value}/><br/>
        
        <label><h2>Description:<br /></h2></label>
        <input type="text" onChange={event => description = event.target.value}/><br/>

        <input type="button" value="Submit" onClick={CreateUser}/>

        
        </div>)

    
}
