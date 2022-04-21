import { User } from '../util/Api';
import './UserEditView.scss';

interface props {
    user: User
}

export default function UserEditView(props: props): JSX.Element {
    return (<div id={"user-card-edit-" + props.user.cn} className={"container-sm user-card-edit"}>
        <div className="inputs">
            <input type="text" placeholder='Common Name' defaultValue={props.user.cn} />
            <input type="text" placeholder='Description' defaultValue={props.user.description} />
            <input type="text" placeholder='Distinguished Name' disabled={true} defaultValue={props.user.dn} />
            <input type="text" placeholder='sAMAccountName' defaultValue={props.user.sAMAccountName} />
            <input type="text" placeholder='New Password' />
            <input type="text" placeholder='Group' />
            <div className='add-remove-group'>
            <button className="add-button">Add</button>
            <button className="remove-button">Remove</button>
            </div>
            

        </div>
        <button className='apply-button'>Apply</button>
    <div id={"drop-arrow-" + props.user.cn} className={"drop-arrow"} onClick={() => {
        document.getElementById("drop-arrow-" + props.user.cn)!.classList.toggle("drop-arrow--animating");
        document.getElementById('user-card-edit-' + props.user.cn)!.classList.toggle("user-card-edit--animating");
    }}>→</div></div>);
}