import { useState } from "react";
import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";
import './Create.scss'

const UIC_DOMAIN = 'uic.edu';

function getInputBar(placeholder: string, setField: Function): JSX.Element {
    return (
        <input type="text" 
            onChange={event => setField(event.target.value)}
            placeholder={placeholder}
            className="input-bar"/>
        );
}

export default function Create(): JSX.Element {
    let username = "";
    let firstName = "";
    let lastName = "";
    let password = "";
    let verify = "";
    let description = "";

    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);

    async function CreateUser() {
        alert(await API.createUser(firstName, lastName, username, `${username}@${UIC_DOMAIN}`, description, apikey, server));
    }

    return (<div className="create-user-box">
        <h1 className="create-user-header">Create User</h1>

        {getInputBar("Login Name", (val: string) => {username=val})}
        {getInputBar("First Name", (val: string) => {firstName=val})}
        {getInputBar("Last Name", (val: string) => {lastName=val})}
        {getInputBar("Password (Optional)", (val: string) => {password=val})}
        {getInputBar("Verify Password (Optional)", (val: string) => {verify=val})}
        {getInputBar("Description", (val: string) => {description=val})}

        <div onClick={CreateUser} className="button-secondary create-user-button">Create User</div>
        
        </div>);

    
}
