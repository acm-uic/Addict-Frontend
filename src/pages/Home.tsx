import { useSelector } from "react-redux"
import { apiReducerState } from "../redux/reducers/apikey"

export default function Home(): JSX.Element {
    const apikey = useSelector((state: apiReducerState) => state.key)
    return (<div><h1>Home</h1><br /> <h3>{apikey}</h3></div>)
}