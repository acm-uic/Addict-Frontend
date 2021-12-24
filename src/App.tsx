import React, { useState } from 'react';
import './App.css';
import API from './util/Api'

const server: string = "http://addict-api.acmuic.org"

function App() {
  // Create the api object and store its state
  const [api] = useState(new API(server));
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [userdata, updateUserdata] = useState("");
  const [newUsername, updateNewUsername] = useState("");
  const [newFirstName, updateNewFirstName] = useState("");
  const [newLastName, updateNewLastName] = useState("");
  const [newEmail, updateNewEmail] = useState("");
  const [newDescription, updateNewDescription] = useState("");
  const [newUserPassword, updateNewUserPassword] = useState("");

  
  async function handleSubmit(all: boolean): Promise<string> {
    await api.getTokenFromAPI(username, password)
    if(all) {
      return JSON.stringify((await api.getAllUsers()).data)
    }
    else {
      return JSON.stringify((await api.getUser(username)))
    }
  }

  return (
    <div className="App container-lg">
      <h1>ACM@UIC IAM</h1>
      <div className="form-group">
        <input onChange={event => updateUsername(event.target.value)} type="text" name="username" className='form-control my-2' />
        <input onChange={event => updatePassword(event.target.value)} type="password" name="password" className='form-control my-2' />
        {/*When updating the actual API object, you need to add the variable to the constructor and create a new object! THIS MEANS DON'T ADD EVERYTHING TO THE API THAT ISN'T FUNCTIONS*/}
        {/* Print the API token out for debugging; BTW this is how you define a comment in TSX*/}
        token:<br></br>{api.token}<br></br>
        <button className='btn btn-primary my-2' onClick={() => handleSubmit(false).then(users => updateUserdata(users)).catch(err => updateUserdata(JSON.stringify(err)))}>Login -Show My Info Only</button>
        <br></br>
        <button className='btn btn-primary my-2' onClick={() => handleSubmit(true).then(user => updateUserdata(user)).catch(err => updateUserdata(JSON.stringify(err)))}>Login -Show All Users Info</button>
      </div>
      {/* Create user form */}
      <div className="form-group">
        <label htmlFor="newusername">New Username:</label>
        <input onChange={event => updateNewUsername(event.target.value)} type="text" name="newusername" className='form-control my-2' />
        <label htmlFor="newfirstname">New First Name:</label>
        <input onChange={event => updateNewFirstName(event.target.value)} type="text" name="newfirstname" className='form-control my-2' />
        <label htmlFor="newlastname">New Last Name:</label>
        <input onChange={event => updateNewLastName(event.target.value)} type="text" name="newlastname" className='form-control my-2' />
        <label htmlFor="newemail">New Email:</label>
        <input onChange={event => updateNewEmail(event.target.value)} type="text" name="newemail" className='form-control my-2' />
        <label htmlFor="newdescription">New Description:</label>
        <input onChange={event => updateNewDescription(event.target.value)} type="text" name="newdescription" className='form-control my-2' />
        <button className='btn btn-primary my-2' onClick={() => api.createUser(newFirstName, newLastName, newUsername, newEmail, newDescription).then(password => updateNewUserPassword(password)).catch(err => alert(err))}>Create User</button>
      </div>
      {/* Print the data generated at login*/}
      <p>{userdata}</p>
      <p>{newUserPassword}</p>
    </div>
  );
}

export default App;
