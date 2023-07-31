import React from 'react';
import {Table, Label, Input, Button} from 'reactstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { coachValidation } from './validators/coachSignupValidation';


const CoachSingnup = () => {
    const navigate = useNavigate();

    const emptyCoachData = {
        "name": "",
        "password": "",
        "gender": "",
        "dateOfBirth": "",
        "mobileNumber": "",
        "speciality": ""
      };

      const [coachFormErrors, setCoachFormErrors] = useState(
        {
            "nameError": "",
            "passwordError": "",
            "genderError": "",
            "dateOfBirthError": "",
            "mobileNumberError": ""
          }
      )

    const [isAllValidData, setIsAllValidData] = useState(false);

    const [registeredId, setRegisteredId] = useState(0);

      

      const [coachData, setCoachData] = useState(emptyCoachData);
      const [registerSuccess, setRegisterSuccess] = useState(false);

    const handleChangeCoachData = (e) => {
        setCoachData({...coachData, [e.target.name] : e.target.value});

        if(e.target.name === "name"){
            const isValidName = coachValidation.validateName(e.target.value);
            if(! isValidName){
                setCoachFormErrors({...coachFormErrors, "nameError" : "Name should have 3 to 5 characters" });
            }else{
                setCoachFormErrors({...coachFormErrors, "nameError" : "" });
            }
        }

        if(e.target.name === "password"){
            const isValidPassword = coachValidation.validatePassword(e.target.value);
            if(! isValidPassword){
                setCoachFormErrors({...coachFormErrors, "passwordError" : "Password should have 5 to 10 characters" });
            }else{
                setCoachFormErrors({...coachFormErrors, "passwordError" : "" });
            }          
        }
               
        if(e.target.name === "gender"){
            const isValidGender = coachValidation.validateGender(e.target.value);
            if(! isValidGender){
                setCoachFormErrors({...coachFormErrors, "genderError" : "Gender is required" });
            }else{
                setCoachFormErrors({...coachFormErrors, "genderError" : "" });
            }           
        }
              
        if(e.target.name === "dateOfBirth"){
            const isValidDOB = coachValidation.validateDOB(e.target.value);
            if(! isValidDOB){
                setCoachFormErrors({...coachFormErrors, "dateOfBirthError" : "Age should be 20 to 100 years" });
            }else{
                setCoachFormErrors({...coachFormErrors, "dateOfBirthError" : "" });
            }            
        }
      
        if(e.target.name === "mobileNumber"){
            const isValidMobileNumber = coachValidation.validateMobileNumber(e.target.value);
            if(! isValidMobileNumber){
                setCoachFormErrors({...coachFormErrors, "mobileNumberError" : "Mobile number should have 10 digits" });
            }else{
                setCoachFormErrors({...coachFormErrors, "mobileNumberError" : "" });
            }           
        }

        const errorsOfForm = Object.values(coachFormErrors);
        const nonEmptyErrors = errorsOfForm.filter(val => val!=="");
        

        const validationRequiredFields = ["name","password","gender","dateOfBirth","mobileNumber"];
        const coachDataOfValidateFields = [];
        for(let j of validationRequiredFields){
            coachDataOfValidateFields.push(coachData[j]);
        }

        const emptyFields = coachDataOfValidateFields.filter(val => val==="");

        if(nonEmptyErrors.length===0 && emptyFields.length===0){
            console.log("valid data true")
            setIsAllValidData(true);
            
        }
          

    }



    const handleSubmitCoachData = async (e) => {
        e.preventDefault();

        const postCoachData = async () => {
            await axios.post('http://localhost:5000/coaches', coachData)
            .then(res => {
                setRegisteredId(res.data.id);
                setRegisterSuccess(true);
                console.log('Coach is joined successfully')
            })
            .catch(err=>console.log(err.message))
        }
        postCoachData();
    }


  return (
    <div className='coach-signup-div'>
        <h4> Life coach profile</h4>
        <hr />
        {registerSuccess ? (
            <div>
                <h4 style={{color : 'blue'}}>Coach registered successfully</h4>
                <h5 style={{color : 'blue'}}>Registration ID is {registeredId}</h5>
                <Button className='Button-class' color='warning' onClick={() => navigate('/')}>To home page</Button>
                <Button className='Button-class' color='primary' onClick={() => navigate('/coachlogin')}>Signin</Button>
            </div>

        ) : (
                <div>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <td> 
                                    <Label for="name">Name</Label>
                                    <Input id="name" name="name" placeholder="Enter name" type="text" value={coachData.name} onChange={handleChangeCoachData} required minLength={3} maxLength={50}/>
                                    <span>{coachFormErrors.nameError? coachFormErrors.nameError : ""}</span>
                                </td>
                                <td>
                                    <Label for="password">Password</Label>
                                    <Input id="password" name="password" placeholder="Enter password" type="password" value={coachData.password} onChange={handleChangeCoachData} required />
                                    <span>{coachFormErrors.passwordError? coachFormErrors.passwordError : ""}</span>
                                </td>
                            </tr>
                            <tr>
                                <td> 
                                    <Label for="dateOfBirth">Date of birth</Label>
                                    <Input id="dateOfBirth" name="dateOfBirth" placeholder="dd/mm/yy" type="text" value={coachData.dateOfBirth} onChange={handleChangeCoachData} required />
                                    <span>{coachFormErrors.dateOfBirthError? coachFormErrors.dateOfBirthError : ""}</span>
                                </td>
                                <td>
                                    <Label for="gender">Gender</Label>  
                                    <br />          
                                    <select name='gender' value={coachData.gender} onChange={handleChangeCoachData} required>
                                        <optgroup label="Select gender">
                                            <option value="" disabled selected>Select gender</option>
                                            <option value="M">M</option>
                                            <option value="F">F</option>
                                        </optgroup>
                                    </select>
                                    <span>{coachFormErrors.genderError? coachFormErrors.genderError : ""}</span>
                    
                                </td>
                            </tr>

                            <tr>
                                <td> 
                                    <Label for="mobileNumber">Mobile number</Label>
                                    <Input id="mobileNumber" name="mobileNumber" placeholder="Enter mobileNumber" type="text" onChange={handleChangeCoachData} value={coachData.mobileNumber} required />
                                    <span>{coachFormErrors.mobileNumberError? coachFormErrors.mobileNumberError : ""}</span>
                                </td>
                                <td>
                                    <Label for="speciality">Speciality</Label>
                                    <Input id="speciality" name="speciality" placeholder="Enter speciality" type="text" onChange={handleChangeCoachData} value={coachData.speciality} required />
                                </td>
                            </tr>
                        </tbody>

                    </Table>
                    <Button className='Button-class' color='success' disabled={! isAllValidData} onClick={handleSubmitCoachData}>Register</Button>
                    <Button className='Button-class' color='warning' onClick={()=>navigate('/')}>To home page</Button>
            </div>
        )}

    </div>
  )
}

export default CoachSingnup