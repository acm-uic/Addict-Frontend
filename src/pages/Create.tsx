import { useState } from "react";
import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import './Create.scss'

const UIC_DOMAIN = 'uic.edu';

const InputBar = ({placeholder, inputText, setText} 
    : {placeholder: string, inputText: string, setText: React.Dispatch<React.SetStateAction<string>>}) => {
    return (
        <input type="text" 
            value={inputText}
            onChange={event => setText(event.target.value)}
            placeholder={placeholder}
            className="input-bar"/>
        );
}

export default function Create(): JSX.Element {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState("");
    const [description, setDescription] = useState("");

    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);

    async function CreateUser() {
        alert(await API.createUser(firstName, lastName, username, `${username}@${UIC_DOMAIN}`, description, apikey, server));
    }

    return (<div className="create-user-box">
        <h1 className="create-user-header">Create User</h1>

        <InputBar placeholder="Login Name" inputText={username} setText={setUsername}/>
        <InputBar placeholder="First Name" inputText={firstName} setText={setFirstName}/>
        <InputBar placeholder="Last Name" inputText={lastName} setText={setLastName}/>
        <InputBar placeholder="Password (Optional)" inputText={password} setText={setPassword}/>
        <InputBar placeholder="Verify Password (Optional)" inputText={verify} setText={setVerify}/>
        <InputBar placeholder="Description" inputText={description} setText={setDescription}/>

        <input type="button" value="Create User" onClick={CreateUser} className="create-user-button"/>

        
        </div>);

    
}
