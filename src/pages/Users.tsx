import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User, Group } from "../util/Api";
import pensolid from "../svg/pen-solid.svg"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);
    const [show, setShow] = useState(false);

    // Load only once
    useEffect(() => {
        //API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
        setUsers([{sAMAccountName: "tuser2", dn: "Test", whenCreated: "0", pwdLastSet: "0", userAccountControl: "0", cn: "Test User", description: "Description", groups: []}])
        
    }, [])
    
    function getTableRow(name: String, email: String, groups: Group[], username: String): JSX.Element{
        return <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{groups.join('\n')}</td>
            <td>{username}</td>

            <td><button className="edit-button" onClick={() => setShow(true)}><img className="pensvg" src={pensolid} alt="Edit Pen" /></button></td>
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
    const handleClose = () => setShow(false)

    function showModal(): JSX.Element {
        return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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
                        (user: User) => getTableRow(user.cn, user.sAMAccountName + "@uic.edu", user.groups, user.sAMAccountName)
                    )}
                
            </tbody>
        </table>
        </div>)
}
