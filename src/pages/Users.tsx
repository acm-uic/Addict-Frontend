import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserEditView from "../components/UserEditView";
import UserView from "../components/UserView";
import { Link } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User } from "../util/Api";
import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);

    // Load only once
    useEffect(() => {
        API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
    }, [])
    

    function getSearchBar(): JSX.Element {
        return (<div className="container-lg">
                <div className="search-bar">
                    <input type="text" placeholder="Search" name="search" id="search-bar" onChange={event => setSearchQuery(event.target.value)} />
                    <Link to="/create" className="nav-item nav-link add-user"><p>+</p></Link>
                </div>
            </div>)
    }
    return (<div className="container-lg">
        {getSearchBar()}
        <table className="table">
            <thead>
                <tr><th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">GROUP(S)</th>
                <th scope="col">USERNAME</th>
                <th scope="col">EDIT</th>
                <th scope="col">ACTIVE</th></tr>
            </thead>
        </table>
            {users.filter(
                (user: User) => {})}
        </div>)
}
