import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home.js';
import CoachSingnup from './CoachSingnup';
import CoachLogin from './CoachLogin';
import UserSignup from './UserSignup';
import UserLogin from './UserLogin';
import ViewCoachProfile from './ViewCoachProfile';
import ViewUserProfile from './ViewUserProfile';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element ={ <Home /> } />

        <Route path='/coachsignup' element={ <CoachSingnup /> } />
        <Route path='/coachlogin' element={ <CoachLogin /> } />
        
        <Route path='/usersignup' element={ <UserSignup /> } />
        <Route path='/userlogin' element={ <UserLogin /> } />

        <Route path='/coachProfile' element={ <ViewCoachProfile /> } />
        <Route path='/userProfile' element={ <ViewUserProfile /> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
