import axios, { AxiosRequestHeaders } from "axios"
export interface User {
    dn: string
    sAMAccountName: string
    whenCreated: string
    pwdLastSet: string
    userAccountControl: string
    cn: string
    description: string
    groups: Group[]
}
export interface Group {
    dn: string
    cn: string
    description: string
    groupType: string
}
class API {
    private static _getHeader(token: string): AxiosRequestHeaders{
        if(token === "") throw new Error("Invalid API Key")
        return {'Authorization': 'Bearer: ' + token}
    }

    /**
     * Gets a 30 minute token and sets it in the token and header
     * @param {string} username - Username to login with
     * @param {string} password - Password to login with
     * @returns {Promise<API>} The new API object
     */
    static async getTokenFromAPI(username: string, password: string, server: string): Promise<string>{
        const res = await axios.post(server + '/api/authenticate', {
            username: username,
            password: password
        });
        return res.data.token
    }

    /**
     * Get token for password change for a user
     * @param {string} username - Username for which token is needed
     * @param {string} token - Token received upon authentication for webdev user
     * @returns {Promise<string>} The password reset token
     */
     static async passwordToken(username: string, token: string, server:string): Promise<string>{
        
        const res = await axios.post(server + "/api/passwordreset", {
            username: username},
            {headers: API._getHeader(token)}
        );

        return res.data
    }

    /**
     * Change a user's password
     * @param {string} username = Username of user for which password change is requested
     * @param {string} newpass = Password to replace old password
     * @param {string} token = Token from authenticated user changing password
     * @returns {Promise<string>} The stringified put response.
     */
     static async changePassword(username: string, newpass: string, token: string, server:string): Promise<string>{
        
        const ptok:string = JSON.stringify(this.passwordToken(username,token,server))
        
        const res = await axios.put(server + "/user/" + username +"/password", {
            password: newpass},
            {headers: API._getHeader(ptok)}
        );
        
        return JSON.stringify(res)
    }


    /**
     * Get all AD users
     * @returns {Promise<User[]>} The Axios response
     */
    static async getAllUsers(server: string, token: string): Promise<User[]>{
        return (await axios.get(server + "/user/", {
            headers: API._getHeader(token)
        })).data;
    }

    /**
     * Get a user by name
     * @param name - Name of the user to get
     * @returns {AxiosResponse<any, any>} The Axios response data
     */
    static async getUser(name: string, token: string, server: string): Promise<User>{
        return (await axios.get(server + "/user/" + name, {
            headers: API._getHeader(token)
        })).data;
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
    static async createUser(fname: string, lname: string, username: string, email: string, description: string, token: string, server: string): Promise<string> {

        /*inspired by several online resources including: https://www.geeksforgeeks.org/how-to-generate-a-random-password-using-javascript/ */
        const lchars:string = "abcdefghijklmnopqrstuvwxyz"
        const uchars:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const numbers:string = "1234567890"
        const symbols:string = "!@#$%^&*?"
        const allchars:string  = lchars + uchars + numbers + symbols
        let password:string = ""
        let i:number = 0
        let location = "WebDev";
        let randomPassLength = 15;

        while(i<randomPassLength){
            let nextIndex: number = Math.floor(Math.random()*allchars.length)
            let nextChar:string = allchars[nextIndex]
            password += nextChar
            i++
        }

        await axios.post(server + '/user', {
            commonName: "",
            userName: username,
            password: password,
            firstName: fname,
            lastName: lname,
            email: email,
            title: description,
            location: location,
            enabled: true
        }, {headers: API._getHeader(token)});

        return password
    }

    
    
    /**
     * Removes a user
     * @param username - The name of the user to remove
     */
    static async removeUser(username: string, token: string, server: string): Promise<void> {
        await axios.delete(server + "/user/" + username, {
            headers: API._getHeader(token)
        });
    }

}
export default API
