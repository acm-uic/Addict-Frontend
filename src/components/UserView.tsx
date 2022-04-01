import { isExportDeclaration } from 'typescript';
import { User } from '../util/Api'
import './UserView.scss'

interface props {
    user: User
}
export default function UserView(props: props): JSX.Element {
    let n = parseInt(props.user.pwdLastSet);
    let date = new Date(n/1e4 - 1.16444736e13);
    let dateString = date.toUTCString();
    let expiration = new Date(date.setFullYear(date.getFullYear() + 1))
    let expirationString = expiration.toUTCString()

    return (<div className="user-card container-sm">
        <div className="side">
            <div className="cn">{props.user.cn}</div>
            <div className="sAMAccountName">{props.user.sAMAccountName}</div>
        </div>
        <div className="mid">
            <div className="dn">{props.user.dn}</div>
            <div className="pw">Password Last Set: {dateString}</div>
            <div className="pw">Expire date: {expirationString}</div>
            <div className="groups">Groups: {props.user.groups.map(group => group.cn).join(',')}</div>
            <div className="created">Created: {props.user.whenCreated}</div>
            <div className="description">{props.user.description}</div>
        </div>
    </div>)
}