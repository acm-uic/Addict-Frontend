import { User } from '../util/Api'
import './UserView.scss'

interface props {
    user: User
}
export default function UserView(props: props): JSX.Element {

    return (<div className="user-card container-sm">
        <div className="side">
            <div className="cn">{props.user.cn}</div>
            <div className="sAMAccountName">{props.user.sAMAccountName}</div>
        </div>
        <div className="mid">
            <div className="dn">{props.user.dn}</div>
            <div className="pw">Password Last Set: {props.user.pwdLastSet}</div>
            <div className="groups">Groups: {props.user.groups.map(group => group.cn).join(',')}</div>
            <div className="created">Created: {props.user.whenCreated}</div>
            <div className="description">{props.user.description}</div>
        </div>
    </div>)
}