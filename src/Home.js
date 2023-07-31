import React from 'react';
import {Nav, NavItem, NavLink, Card, CardBody, Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='Home'>
        <Nav className="nav-bar">
            <NavItem>
                <NavLink className='nav-link'>WeCare</NavLink>
            </NavItem> 
            <NavItem>
                <NavLink>Callus-0802233447</NavLink>
            </NavItem> 
        </Nav>

        <h3>We are at the heart of appropriate care</h3>

        <div className='card-container-div'>
            <Card style={{ width: '15rem'}} className='card'>
            <div>
                <img alt="Coach" width="120px" height="120px" style={{display: "inline"}}
                src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg"/>
                </div>
                        <CardBody>
                            <Button color='primary' className='Button-class' onClick={()=>navigate('/coachlogin')}>Login as a coach</Button>
                            <br />
                            <Button color='primary' className='Button-class' onClick={()=>navigate('/coachsignup')}>Join as a coach</Button>
                        </CardBody>
                </Card>



                <Card style={{ width: '15rem'}} className='card'>
                <div>
                <img alt="User" width="120px" height="120px" style={{display: "inline"}}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeRX-AgTOIqq-So4wvt3pF0SUkuVgR_nzWfw&usqp=CAU"/>
                </div>
                        <CardBody>
                            <Button color='primary' className='Button-class' onClick={()=>navigate('/userlogin')}>Login as a user</Button>
                            <br />
                            <Button color='primary' className='Button-class' onClick={()=>navigate('/usersignup')}>Join as a user</Button>
                        </CardBody>
                </Card>

            </div>

    

    </div>
    
  )
}

export default Home