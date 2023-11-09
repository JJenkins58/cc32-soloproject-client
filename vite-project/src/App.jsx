import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/Homepage';
import AddItem from './components/AddItem';


function App() {

  return (
  <Router>
    <Routes>
      <Route path='/' element={ <LoginForm /> }/>
      <Route path='/registration' element={ <RegistrationForm /> }/>
      <Route path='/home' element={ <Homepage /> }/>
      <Route path='/additem' element={ <AddItem /> }/>
    </Routes>
  </Router>
  );
}

export default App
