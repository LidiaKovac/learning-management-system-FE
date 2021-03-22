
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import Redirect from "./pages/Redirect/Redirect"
import TeacherDashboard from './pages/Dashboard/TeacherDashboard';
import Upload_Notes from './pages/Notes/Upload/Upload_New';
import L_Notes from "./pages/Notes/Landing"
import Notes from './pages/Notes/Type/Notes';
const App: React.FC = () => {
  return (
    <BrowserRouter>
     <Route exact path="/redirect"><Redirect/></Route>

     <Route exact path="/"><Login/></Route> 
     <Route exact path="/join"><SignUp/></Route>
     
     <Route exact path="/studentdash"><StudentDashboard/></Route>
     <Route exact path="/teacherdash"><TeacherDashboard/></Route>

     <Route exact path="/notes/new"><Upload_Notes/></Route>
     <Route exact path="/notes/type"><Notes/></Route>
     <Route exact path="/notes"><L_Notes/></Route>
    </BrowserRouter>
  );
}

export default App;
