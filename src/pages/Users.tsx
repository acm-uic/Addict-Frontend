import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { apiReducerState } from "../redux/reducers/apikey";
import API from "../util/Api"
import { Link } from "react-router-dom";
import { User } from "../util/Api";
import pensolid from "../svg/pen-solid.svg"
import Modal from 'react-bootstrap/Modal';

import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);
    const [show, setShow] = useState(false);
    let [editingUser, setEditingUser] = useState<User>({sAMAccountName: "", dn: "", groups: [], whenCreated: "", pwdLastSet: "", cn: "", description: "", userAccountControl: ""})

    // Load only once
    useEffect(() => {
        API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
        
    }, [])
    
    function getTableRow(user: User): JSX.Element{
        return <tr key={user.sAMAccountName as string}>
            <td>{user.cn}</td>
            <td>{user.sAMAccountName + "@uic.edu"}</td>
            <td>{user.groups.join('\n')}</td>
            <td>{user.sAMAccountName}</td>

            <td><div className="edit-button" onClick={() => handleOpen(user)}><img className="pensvg" src={pensolid} alt="Edit Pen" /></div></td>
            <td><div className="enable-switch"></div></td>

        </tr>
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

    const handleOpen = (user: User) => {
        setEditingUser(user);
        setShow(true)
    }
    const handleClose = () => {setShow(false)}

    function showModal(): JSX.Element {
        return (
        <Modal  show={show} onHide={handleClose} centered>
        <Modal.Body>
            <h1>{editingUser.cn}</h1>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder={editingUser.sAMAccountName} />
            <input type="text" placeholder="Mail" />
            <input type="text" placeholder="New Password" />
            <input type="text" placeholder="New Password (Verify)" />
            <input type="text" placeholder="Gropus to Add (Comma Seperated)" />
            <input type="text" placeholder="Gropus to Remove (Comma Seperated)" />
            <div className="button-secondary modal-button">Update User</div>
        </Modal.Body>
      </Modal>
               )
    }

    return (<div className="container-lg">
        {getSearchBar()}
        {showModal()}
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
