import { useSelector } from "react-redux"
import { apiReducerState } from "../redux/reducers/apikey"

export default function Home(): JSX.Element {
    const apikey = useSelector((state: apiReducerState) => state.key)
    return <h1>Home {apikey}</h1>
}