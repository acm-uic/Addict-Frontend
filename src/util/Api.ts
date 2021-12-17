import axios from "axios"
class API {
    private _token: string
    constructor(token: string) {
        this._token = token
    }

    async getTokenFromAPI(username: string, password: string): Promise<API>{
        const res = await axios.post("http://addict-api.acmuic.org:3000/api/authenticate", {
            username: username,
            password: password
        });
        this._token = res.data.token;
        return this;
    }

    public get token(): string {
        return this._token
    }
    
}
export default API