
import './App.scss';
import { FC } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Redirect from "./pages/Redirect/Redirect"
import { Dashboard } from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/redirect" element={<Redirect/>}/>

      <Route path="/" element={<Login />}/>
      <Route path="/join" element={<SignUp />}/>

      <Route path="/dashboard" element={<Dashboard />}/>
      {/* <Route path="/teacherdash" element={<TeacherDashboard />}/> */}

      {/* <Route path="/notes/new" element={<UploadNotes />}/>
      <Route path="/notes/type" element={<Notes />}/>
      <Route path="/notes" element={<LNotes />}/>

      <Route path="/classes/search" element={<Classes />}/>
      <Route path="/class/:id" element={<SingleClassPage/>} />
      <Route path="/homework" element={<HomeworkPage/>}/>
      <Route path='/grade' element={<Grade />}/> */}
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
