import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserEditView from "../components/UserEditView";
import UserView from "../components/UserView";
import { Link, useSearchParams } from "react-router-dom";
import { apiReducerState } from "../redux/reducers/apikey";
import API, { User } from "../util/Api";
import './Users.scss'
export default function Users(): JSX.Element {
    const server = useSelector((state: apiReducerState) => state.server);
    const apikey = useSelector((state: apiReducerState) => state.key);
    const [searchParams, setSearchParams] = useSearchParams();
    let [searchQuery, setSearchQuery] = useState("");
    let [users, setUsers] = useState<User[]>([]);

    // Load only once
    useEffect(() => {
        API.getAllUsers(server, apikey).then(users => setUsers(users)).catch(err => console.log(err))
        console.log(searchParams.get("token"))
    }, [])
    

    function getSearchBar(): JSX.Element {
        return (<div className="container-lg">
                <div className="search-bar">
                    <input type="text" placeholder="Search" name="search" id="search-input" onChange={event => setSearchQuery(event.target.value)} />
                    <div className="show-active-box">
                        <p id="show-active-text">Show Only Active</p>
                        <input type="checkbox" id="show-active-checkbox"/>
                    </div>
                    <Link to="/create" className="nav-item nav-link add-user"><p>Add User</p></Link>
                </div>
            </div>)
    }

    let userEditStatus : {[key:string] : boolean} = {};
    const userClickHandler = (user: User) => {
        userEditStatus[user.cn]? userEditStatus[user.cn] = false: userEditStatus[user.cn] = true;
        console.log(`${user.cn}User with cn has edit status of ${userEditStatus[user.cn]}`)
        // document.getElementById("view-" + user.cn)!.classList.toggle("animate-left--animating")
        // document.getElementById("edit-view-" + user.cn)!.classList.toggle("animate-left-edit--animating")
    }
    return (<div className="container-lg">
        {getSearchBar()}
            {users.filter(
                (user: User) => 
                    user.cn
                        .toLowerCase().includes(searchQuery.toLowerCase()) || user.sAMAccountName.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map((user: User) => 
                            <div className="user-container"> 
                                <div className={`user-view-container animate-left ${userEditStatus[user.cn]? `animate-left--animating`:`animate-left-edit--animating`}`} id={"view-" + user.cn}>
                                    <UserView user={user} />
                                    <div className="arrow"  onClick={() => userClickHandler(user)}>→</div>
                                </div>
                                <div className={`user-edit-container animate-left ${userEditStatus[user.cn]? `animate-left-edit--animating`:`animate-left--animating`}`}>
                                {/* <div className="user-edit-container animate-left" id={"edit-view-" + user.cn}> */}
                                    <UserEditView user={user} />
                                    
                                    <div className="edit-arrow" onClick={() => userClickHandler(user)} >→</div>
                                </div>
                            </div> )}
        </div>)
}
