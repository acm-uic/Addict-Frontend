import axios, { AxiosRequestHeaders, AxiosResponse } from "axios"
class API {
    private _server: string;
    private _token: string | null;
    private _headers: object
    private _location: string
    private _randomPassLength: number

    /**
     * The API utilities
     * @class
     * @param {string} server The server address
     */
    constructor(server: string) {
        this._server = server;
        this._token = null;
        this._headers = {'Authorization': ''};
        this._location = "WebDev";
        this._randomPassLength = 15;
    }

    /**
     * Gets a 30 minute token and sets it in the token and header
     * @param {string} username - Username to login with
     * @param {string} password - Password to login with
     * @returns {Promise<API>} The new API object
     */
    async getTokenFromAPI(username: string, password: string): Promise<API>{
        const res = await axios.post(this._server + '/api/authenticate', {
            username: username,
            password: password
        });
        console.log(res)
        this._token = res.data.token;
        this._headers = {'Authorization': 'Bearer ' + this._token};
        return this;
    }

    /**
     * Get the current token
     * @returns {string} The token
     */
    public get token(): string {
        return this._token || ""
    }

    /**
     * Get all AD users
     * @returns {Promise<AxiosResponse<any, any>>} The Axios response
     */
    async getAllUsers(): Promise<AxiosResponse<any, any>>{
        if(this._token === null) throw new Error("No valid API token!");
        
        return await axios.get(this._server + "/user/", {
            headers: this._headers as AxiosRequestHeaders
        });
    }

    /**
     * Get a user by name
     * @param name - Name of the user to get
     * @returns {AxiosResponse<any, any>} The Axios response data
     */
    async getUser(name: string): Promise<AxiosResponse<any, any>>{
        if(this._token === null) throw new Error("No valid API token!");
        
        return await axios.get(this._server + "/user/" + name, {
            headers: this._headers as AxiosRequestHeaders
        });
    }
    
    /**
     * Creates a user
     * @param {string} fname - User's first name
     * @param {string} lname - User's last name
     * @param {string} username - User's username (or netid)
     * @param {string} email - User's email
     * @param {string} description - The user's description (netid - pronouns)
     * @returns {string} The user's password
     */
    async createUser(fname: string, lname: string, username: string, email: string, description: string): Promise<string> {
        if(this._token === null) throw new Error("Invalid Token");
    
        /*inspired by several online resources including: https://www.geeksforgeeks.org/how-to-generate-a-random-password-using-javascript/ */
        const lchars:string = "abcdefghijklmnopqrstuvwxyz"
        const uchars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numbers:string = "1234567890"
        const symbols:string = "!@#$%^&*?"
        const allchars:string  = lchars + uchars + numbers + symbols
        let password:string = ""
        let i:number = 0

        while(i<this._randomPassLength){
            let nextIndex: number = Math.floor(Math.random()*allchars.length)
            let nextChar:string = allchars[nextIndex]
            password += nextChar
            i++
        }

        await axios.post(this._server + '/user', {
            commonName: "",
            userName: username,
            password: password,
            firstName: fname,
            lastName: lname,
            email: email,
            title: description,
            location: this._location,
            enabled: true
        }, {headers: this._headers as AxiosRequestHeaders});

        return password
    }
}
export default API