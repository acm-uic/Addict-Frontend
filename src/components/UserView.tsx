import { User } from '../util/Api'
import './UserView.scss'

interface props {
    user: User
}
function getDatePlusYear(dateString:string): string {
    if(parseInt(dateString) == 0) return "Not Set"
    let date = new Date(parseInt(dateString)/1e4 - 1.16444736e13)
    date.setDate(date.getDate() + 365);
    return date.toDateString();
}
export default function UserView(props: props): JSX.Element {
    let expire = getDatePlusYear(props.user.pwdLastSet)
    return (<div className="user-card container-sm">
        <div className="side">
            <div className="cn">{props.user.cn}</div>
            <div className="sAMAccountName">{props.user.sAMAccountName}</div>
        </div>
        <div className="mid">
            <div className="dn">{props.user.dn}</div>
            <div className="pw">Password Expires: {expire}</div>
            <div className="groups">Groups: {props.user.groups.map(group => group.cn).join(',')}</div>
            <div className="created">Created: {props.user.whenCreated}</div>
            <div className="description">{props.user.description}</div>
        </div>
    </div>)
}