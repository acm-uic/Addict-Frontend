import axios, { AxiosResponse } from "axios"
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

    async getAllUsers(): Promise<AxiosResponse<any, any>>{
        if(this._token === "") throw new Error("No valid API token!");
        
        return await axios.get("http://addict-api.acmuic.org:3000/user/", {
            headers: {
                'Authorization': 'Bearer ' + this._token
            }
        });
    }

    async getUser(name: string): Promise<AxiosResponse<any, any>>{
        if(this._token === "") throw new Error("No valid API token!");
        
        return await axios.get("http://addict-api.acmuic.org:3000/user/" + name, {
            headers: {
                'Authorization': 'Bearer ' + this._token
            }
        });
    }
    
}
export default API