import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserView from "../components/UserView";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User } from "../util/Api";
import './Users.scss'
import { Link, useNavigate } from "react-router-dom";
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key)
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
                    
                    <Link to="/create" className="nav-item nav-link"><button className="add-user">+</button></Link>
                </div>
            </div>)
    }

    return (<div className="container-lg">
        {getSearchBar()}
            {users.filter(user => user.cn.toLowerCase().includes(searchQuery.toLowerCase()) || user.sAMAccountName.toLowerCase().includes(searchQuery.toLowerCase())).map(user => <UserView user={user} />)}
        </div>)
}
