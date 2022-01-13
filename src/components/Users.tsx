import React, { useState } from "react";
import API from "../util/Api";

export default function Users(): JSX.Element {
    let api = new API();
    let [users, setUsers] = useState("");
    api.getAllUsers().then(res => setUsers(JSON.stringify(res.data))).catch(err => setUsers(err))
    return (<div>{users}</div>)
}