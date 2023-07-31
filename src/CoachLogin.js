import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import {Table, Label, Input, Button} from 'reactstrap';


const CoachLogin = () => {
    // Initialising state for coachName
    const [coachName, setCoachName] = useState("");
    // Initialising state for coachPassword
    const [coachPassword, setCoachPassword] = useState("");

    // Initialising state for invalid credentials
    const [invalidCredentials, setInvalidCredentials] = useState(false);

    const [loginSuccess, setLoginSuccess] = useState(false);

    // Taking useNavigate hook to navigate in between the routes
    const navigate = useNavigate();


    // Handle change function for coachName
    const coachNameHnadleChange = (e) => {
        setCoachName(e.target.value);
    }

    // Handle change function for coachPassword
    const coachPasswordHnadleChange = (e) => {
        setCoachPassword(e.target.value);
        
    }

    // Handle submit function for the submit button
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Getting all coaches data
        const allCoaches = await axios.get("http://localhost:5000/coaches");
        const allCoachesData = allCoaches.data;

        // Checking whether the coach is existing or not
        const isExistingCoach = allCoachesData.filter(coach=>coach.name === coachName)[0];
        
        if(!isExistingCoach){
            // If coach does not exist
            setInvalidCredentials(true);
        }else{
            // If coach exists
            // Checking whether the coachPassword is correct or not
            const isValidCoachPassword = isExistingCoach.password === coachPassword;
            if(!isValidCoachPassword){
                // If coachPassword is incorrect
                setInvalidCredentials(true);
            }else{
                // If both coachName and coachPassword are correct
                setLoginSuccess(true);
                
            }
        }       
    }

  return (
    <div className='login-div'>
        <p> Coach Signin </p>
        {loginSuccess ? (
            <div>
                <h5 style={{color : 'blue'}}>Coach logged in successfully</h5>
                <Button className='Button-class' color='warning' onClick={() => navigate('/')}>Logout</Button>
                <Button className='Button-class' color='primary' onClick={() => navigate('/coachProfile')}>Proile</Button>
            </div>

        ) : (
            
            <div className="login-credentials-div">
                <Table borderless>
                    <tbody>
                        <tr>
                            <td> 
                                <Label> Name </Label>
                                <Input type="text" name="name" placeholder="Enter coach name" value={coachName} onChange={coachNameHnadleChange} />
                                
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label> Password </Label>
                                <Input type="password" name="password" placeholder="Enter password" value={coachPassword} onChange={coachPasswordHnadleChange} />
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

export default CoachLogin