import { cleanup } from "@testing-library/react";
import API from "../Api";

afterEach(cleanup)


it('Should change password with result 200', async () => {
    let token =  await API.getTokenFromAPI(
        process.env.REACT_APP_TOKEN_USER,process.env.REACT_APP_TOKEN_PASS,"http://addict-api.acmuic.org")
    let result = await API.changePassword(process.env.REACT_APP_PASS_USER,
        process.env.REACT_APP_NEW_PASS,token,"http://addict-api.acmuic.org")
    expect(result).toContain("200")
})