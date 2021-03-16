
import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
const App: React.FC = () => {
  return (
    <BrowserRouter>
     <Route exact path="/"><Login/></Route> 
     <Route exact path="/join"><SignUp/></Route>
    </BrowserRouter>
  );
}

export default App;
