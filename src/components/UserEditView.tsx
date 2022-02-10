import { User } from '../util/Api';
import './UserEditView.scss';

interface props {
    user: User
}

export default function UserEditView(props: props): JSX.Element {
    return (<div id={"user-card-edit-" + props.user.cn} className={"container-sm user-card-edit"}>Test
    <div id={"drop-arrow-" + props.user.cn} className={"drop-arrow"} onClick={() => {
        document.getElementById("drop-arrow-" + props.user.cn)!.classList.toggle("drop-arrow--animating");
        document.getElementById('user-card-edit-' + props.user.cn)!.classList.toggle("user-card-edit--animating");
    }}>→</div></div>);
}