import React, { useState } from 'react';
import './App.css';
import API from './util/Api'

function App() {
  // Create the api object and store its state
  const [api, setAPI] = useState(new API(""));
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [userdata, updateUserdata] = useState("");
  
  async function handleSubmit(): Promise<string> {
    let res: API = await api.getTokenFromAPI(username, password)
    setAPI(new API(res.token))
    return JSON.stringify((await api.getAllUsers()).data)
  }

  return (
    <div className="App container-lg">
      <h1>ACM@UIC IAM</h1>
      <div className="form-group">
        <input onChange={event => updateUsername(event.target.value)} type="text" name="username" className='form-control my-2' />
        <input onChange={event => updatePassword(event.target.value)} type="password" name="password" className='form-control my-2' />
        {/*When updating the actual API object, you need to add the variable to the constructor and create a new object! THIS MEANS DON'T ADD EVERYTHING TO THE API THAT ISN'T FUNCTIONS*/}
        <button className='btn btn-primary my-2' onClick={() => handleSubmit().then(users => updateUserdata(users)).catch(err => updateUserdata(JSON.stringify(err)))}>Log In</button>
      </div>
      {/* Print the API token out for debugging; BTW this is how you define a comment in TSX*/}
      <p>{userdata}</p>
    </div>
  );
}

export default App;
