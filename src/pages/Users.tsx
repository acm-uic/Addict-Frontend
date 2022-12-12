import { createElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User, Group } from "../util/Api";
import pensolid from "../svg/pen-solid.svg"
import editUserComponent from "../components/UserEdit"

import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);
    let [editingUser, setEditingUser] = useState<User | null>(null);

    // Load only once
    useEffect(() => {
        //API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
        setUsers([{dn: "dn", sAMAccountName: "samacc", whenCreated: "0", pwdLastSet: "-1", userAccountControl: "1", cn: "Test User", description: "desc", groups: []}])
    }, [])
    
    function getTableRow(user: User): JSX.Element{
        return <tr key={user.sAMAccountName}>
            <td>{user.cn}</td>
            <td>{user.description}</td>
            <td>{user.groups.join('\n')}</td>
            <td>{user.sAMAccountName}</td>

            <td><div className="edit-button" onClick={() => setEditingUser(user)}><img className="pensvg" src={pensolid} alt="Edit Pen" /></div></td>
            <td><div className="enable-switch"></div></td>

        </tr>
    }

    function showEditUserDialog(){
        if(editingUser == null)
            return
        return <div className="editUserBackground" onClick={() => setEditingUser(null)}>{editUserComponent(editingUser)} </div>
    }

    function getSearchBar(): JSX.Element {
        return (
                <div className="search-bar">

                    <input type="text" placeholder="Search" name="search" id="search-input" onChange={event => setSearchQuery(event.target.value)} />
                    <div className="show-active-box">
                        <p id="show-active-text">Show Only Active</p>
                        <input type="checkbox"/>
                    </div>
                    <Link to="/admin/create" className="nav-item nav-link add-user"><p>Add User</p></Link>
                </div>)
    }
    

    return (<div className="container-lg">
        {getSearchBar()}
        {showEditUserDialog()}
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
                        (user: User) => getTableRow(user)
                    )}
                
            </tbody>
        </table>
        </div>)
}
