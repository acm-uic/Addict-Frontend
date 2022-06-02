import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserEditView from "../components/UserEditView";
import UserView from "../components/UserView";
import { Link } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User, Group } from "../util/Api";
import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);

    // Load only once
    useEffect(() => {
        API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
        setUsers([{cn: "Christian Bingman", dn: "CN=Christian Bingman,OU=Users,DC=acmuic,DC=org", whenCreated: "0", pwdLastSet: "0", description: "Test Description", sAMAccountName: "cbingm2", userAccountControl: "0", groups: []}])
    }, [])
    
    function getTableRow(name: String, email: String, groups: Group[], username: String): JSX.Element{
        return <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{groups.join('\n')}</td>
            <td>{username}</td>
            <td></td>
            <td></td>
        </tr>
    }

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
            <tbody>
            {users.filter(
                    (user: User) => user.cn.includes(searchQuery) || user.sAMAccountName.includes(searchQuery) || user.description.includes(searchQuery)).map(
                        (user: User) => getTableRow(user.cn, user.sAMAccountName + "@uic.edu", user.groups, user.sAMAccountName)
                    )}
                
            </tbody>
        </table>
        </div>)
}
