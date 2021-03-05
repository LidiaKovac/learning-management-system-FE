
import './App.css';
import Landing from "./pages/Landing"
import {BrowserRouter, Route} from "react-router-dom"
const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Route exact path='/' component={Landing} />
     
    </BrowserRouter>
  );
}

export default App;
