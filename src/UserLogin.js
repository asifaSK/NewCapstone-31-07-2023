import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Table, Label, Input, Button} from 'reactstrap';


const UserLogin = () => {
    // Initialising state for userName
    const [userName, setUserName] = useState("");
    // Initialising state for password
    const [password, setPassword] = useState("");

    // Initialising state for invalid credentials
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const [loginSuccess, setLoginSuccess] = useState(false);

    // Taking useNavigate hook to navigate in between the routes
    const navigate = useNavigate();


    // Handle change function for userName
    const userNameHnadleChange = (e) => {
        setUserName(e.target.value);
    }

    // Handle change function for password
    const passwordHnadleChange = (e) => {
        setPassword(e.target.value);
        
    }

    // Handle submit function for the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Getting all users data
        const allUsers = await axios.get("http://localhost:5000/users");
        const allUsersData = allUsers.data;

        // Checking whether the user is existing or not
        const isExistingUser = allUsersData.filter(user=>user.name === userName)[0];
        
        if(!isExistingUser){
            // If user does not exist
            setInvalidCredentials(true);
        }else{
            // If user exists
            // Checking whether the password is correct or not
            const isValidPassword = isExistingUser.password === password;
            if(!isValidPassword){
                // If password is incorrect
                setInvalidCredentials(true);
            }else{
                // If both userName and password are correct
                // If both userName and userPassword are correct
                setLoginSuccess(true);
            }
        }       
    }

  return (
    <div className='login-div'>
        <p> User Signin </p>
        {loginSuccess ? (
            <div>
                <h5 style={{color : 'blue'}}>User logged in successfully</h5>
                <Button className='Button-class' color='warning' onClick={() => navigate('/')}>Logout</Button>
                <Button className='Button-class' color='primary' onClick={() => navigate('/userProfile')}>Proile</Button>

            </div>

        ) : (
            <div className="login-credentials-div">
                <Table borderless>
                    <tbody>
                        <tr>
                            <td> 
                                <Label> Name </Label>
                                <Input type="text" name="name" placeholder="Enter user name" value={userName} onChange={userNameHnadleChange} />
                                
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label> Password </Label>
                                <Input type="password" name="password" placeholder="Enter password" value={password} onChange={passwordHnadleChange} />
                                {/* If credentials are invalid: then message */}
                                {invalidCredentials? (<p className="invalid-cred-p">Invalid credentials</p>) : ""}

                            </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Button className='Button-class' color='success' onClick={handleSubmit}>Signin</Button>
                    <Button className='Button-class' color='warning' onClick={() => navigate('/')}>To home page</Button>
            </div>
        )}

        
    </div>
  )
}

export default UserLogin