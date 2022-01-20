import React, { useState } from "react";
import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api";

export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key)
    let api = new API(server, apikey);
    let [users, setUsers] = useState("");
    api.getAllUsers().then(res => setUsers(JSON.stringify(res.map(user => user.cn)))).catch(err => setUsers(err))
    return (<div>{users}</div>)
}
