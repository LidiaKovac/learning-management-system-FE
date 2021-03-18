
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import Redirect from "./pages/Redirect/Redirect"
import { useSelector } from 'react-redux';
const App: React.FC = () => {
  return (
    <BrowserRouter>
     <Route exact path="/"><Login/></Route> 
     <Route exact path="/join"><SignUp/></Route>
     <Route exact path="/redirect"><Redirect/></Route>
     <Route exact path="/studentdash"><StudentDashboard/></Route>
    </BrowserRouter>
  );
}

export default App;
