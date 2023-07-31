import React from 'react';
import {Table, Label, Input, Button} from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userValidation } from './validators/userSignupValidation';

const UserSignup = () => {
    const navigate = useNavigate();
    const [registerSuccess, setRegisterSuccess] = useState(false);


      const [userData, setUserData] = useState({
        "name": "",
        "password": "",
        "gender": "",
        "dateOfBirth": "",
        "mobileNumber": "",
        "email": "",
        "pincode" : "",
        "city" : "",
        "state" : "",
        "country" : ""
      });

      const [userFormErrors, setUserFormErrors] = useState(
        {
            "nameError": "",
            "passwordError": "",
            "genderError": "",
            "dateOfBirthError": "",
            "mobileNumberError": "",
            "emailError": "",
            "pincodeError" : "",
          }
      )

      const [isAllValidData, setIsAllValidData] = useState(false);
    //   const [isAnyEmptyField, setIsAnyEmptyField] = useState(true);
    //   const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

    const [registeredId, setRegisteredId] = useState(0);
    

    const handleChangeUserData = (e) => {
        
        setUserData({...userData, [e.target.name] : e.target.value});

        if(e.target.name === "name"){
            const isValidName = userValidation.validateName(e.target.value);
            if(! isValidName){
                setUserFormErrors({...userFormErrors, "nameError" : "Name should have 3 to 5 characters" });
            }else{
                setUserFormErrors({...userFormErrors, "nameError" : "" });
            }
        }

        if(e.target.name === "password"){
            const isValidPassword = userValidation.validatePassword(e.target.value);
            if(! isValidPassword){
                setUserFormErrors({...userFormErrors, "passwordError" : "Password should have 5 to 10 characters" });
            }else{
                setUserFormErrors({...userFormErrors, "passwordError" : "" });
            }          
        }
               
        if(e.target.name === "gender"){
            const isValidGender = userValidation.validateGender(e.target.value);
            if(! isValidGender){
                setUserFormErrors({...userFormErrors, "genderError" : "Gender is required" });
            }else{
                setUserFormErrors({...userFormErrors, "genderError" : "" });
            }           
        }
              
        if(e.target.name === "dateOfBirth"){
            const isValidDOB = userValidation.validateDOB(e.target.value);
            if(! isValidDOB){
                setUserFormErrors({...userFormErrors, "dateOfBirthError" : "Age should be 20 to 100 years" });
            }else{
                setUserFormErrors({...userFormErrors, "dateOfBirthError" : "" });
            }            
        }
      
        if(e.target.name === "mobileNumber"){
            const isValidMobileNumber = userValidation.validateMobileNumber(e.target.value);
            if(! isValidMobileNumber){
                setUserFormErrors({...userFormErrors, "mobileNumberError" : "Mobile number should have 10 digits" });
            }else{
                setUserFormErrors({...userFormErrors, "mobileNumberError" : "" });
            }           
        }
             
        if(e.target.name === "email"){
            const isValidEmail = userValidation.validateEmail(e.target.value);
            if(! isValidEmail){
                setUserFormErrors({...userFormErrors, "emailError" : "Valid email id is required" });
            }else{
                setUserFormErrors({...userFormErrors, "emailError" : "" });
            }
        }
        
        if(e.target.name === "pincode"){
            const isValidPincode = userValidation.validatePincode(e.target.value);
            if(! isValidPincode){
                setUserFormErrors({...userFormErrors, "pincodeError" : "Pincode should have 6 digits" });
            }else{
                setUserFormErrors({...userFormErrors, "pincodeError" : "" });
            } 
        }
        
        
        const errorsOfForm = Object.values(userFormErrors);
        const nonEmptyErrors = errorsOfForm.filter(val => val!=="");
        

        const validationRequiredFields = ["name","password","gender","dateOfBirth","mobileNumber","email","pincode"];
        const userDataOfValidateFields = [];
        for(let j of validationRequiredFields){
            userDataOfValidateFields.push(userData[j]);
        }

        const emptyFields = userDataOfValidateFields.filter(val => val==="");
        // if(emptyFields.length===0){
        //     console.log('empty data false')
        //     setIsAnyEmptyField(false);
        // }

        if(nonEmptyErrors.length===0 && emptyFields.length===0){
            console.log("valid data true")
            setIsAllValidData(true);
            // setIsReadyToSubmit(true);
        }


    }



    const handleSubmitUserData = (e) => {
        e.preventDefault();

        const postUserData = async () => {
            await axios.post('http://localhost:5000/users', userData)
                .then(res => {  
                    setRegisteredId(res.data.id);
                    setRegisterSuccess(true);
                    console.log('User is joined successfully')
                })
                .catch(err=>console.log(err.message))
            }

        postUserData();

    }




  return (
    <div className='user-signup-div'>
        <h4> Life user profile</h4>
        <hr />
        {registerSuccess ?(
            <div>
                <h4 style={{color : 'blue'}}>User registered successfully.</h4>
                <h5 style={{color : 'blue'}}>Registration ID is {registeredId}</h5>
                <Button className='Button-class' color='warning' onClick={() => navigate('/')}>To home page</Button>
                <Button className='Button-class' color='primary' onClick={() => navigate('/userlogin')}>Signin</Button>
                </div>

        ) : (
            <div>
            <Table borderless>
                <tbody>
                    <tr>
                        <td> 
                            <Label for="name">Name</Label>
                            <Input id="name" name="name" placeholder="Enter name" type="text" value={userData.name} onChange={handleChangeUserData} />
                            <span>{userFormErrors.nameError? userFormErrors.nameError : ""}</span>
                        </td>
                        <td>
                            <Label for="password">Password</Label>
                            <Input id="password" name="password" placeholder="Enter password" type="password" value={userData.password} onChange={handleChangeUserData} />
                            <span>{userFormErrors.passwordError? userFormErrors.passwordError : ""}</span>
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <Label for="mobileNumber">Mobile number</Label>
                            <Input id="mobileNumber" name="mobileNumber" placeholder="Enter mobileNumber" type="text" value={userData.mobileNumber} onChange={handleChangeUserData} />
                            <span>{userFormErrors.mobileNumberError? userFormErrors.mobileNumberError : ""}</span>
                        </td>
                        <td>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" placeholder="Enter email" type="text" value={userData.email} onChange={handleChangeUserData} />
                            <span>{userFormErrors.emailError? userFormErrors.emailError : ""}</span>
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <Label for="dateOfBirth">Date of birth</Label>
                            <Input id="dateOfBirth" name="dateOfBirth" placeholder="dd/mm/yy" type="text" value={userData.dateOfBirth} onChange={handleChangeUserData} />
                            <span>{userFormErrors.dateOfBirthError? userFormErrors.dateOfBirthError : ""}</span>
                        </td>
                        <td>
                            <Label for="gender">Gender</Label>  
                            <br />          
                            <select name='gender' value={userData.gender} onChange={handleChangeUserData} required>
                                <optgroup label="Select gender">
                                    <option value="" disabled selected>Select gender</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </optgroup>
                            </select>
                            <span>{userFormErrors.genderError? userFormErrors.genderError : ""}</span>
            
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <Label for="pincode">Pincode</Label>
                            <Input id="pincode" name="pincode" placeholder="Enter pincode" type="text" value={userData.pincode} onChange={handleChangeUserData} />
                            <span>{userFormErrors.pincodeError? userFormErrors.pincodeError : ""}</span>
                        </td>
                        <td>
                            <Label for="city">City</Label>
                            <Input id="city" name="city" placeholder="Enter city" type="text" value={userData.city} onChange={handleChangeUserData} />
                        </td>
                    </tr>

                    <tr>
                        <td> 
                            <Label for="state">State</Label>
                            <Input id="state" name="state" placeholder="Enter state" type="text" value={userData.state} onChange={handleChangeUserData} />
                        </td>
                        <td>
                            <Label for="country">Country</Label>
                            <Input id="country" name="country" placeholder="Enter country" type="text" value={userData.country} onChange={handleChangeUserData} />
                        </td>
                    </tr>
                </tbody>

        </Table>
        {/* <div>{isAnyEmptyField? "Fill all the fields" : ""}</div> */}
        <Button className='Button-class' type='submit' color='success' disabled={! isAllValidData} onClick={handleSubmitUserData}>Register</Button>
        <Button className='Button-class' color='warning' onClick={()=>navigate('/')}>To home page</Button>
        </div>
        )}

    </div>
  )
}

export default UserSignup