import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Homepage from './components/Homepage';


function App() {

  // const [helloWorld, setHelloWorld] = useState("");

  // useEffect(() => {
  //   hello();
  // }, []);

  // async function hello() {
  //   const fetchHello = await fetch("http://localhost:8080/hello");
  //   const fetchHelloParsed = await fetchHello.json();
  //   setHelloWorld(fetchHelloParsed);
  // }

  return (
    <>
    This is App
    {/* <p>{helloWorld}</p> */}
    
    <Router>
      <Routes>
        <Route path='/' element={ <LoginForm /> }/>
        <Route path='/registration' element={ <RegistrationForm /> }/>
        <Route path='/home' element={ <Homepage /> }/>
      </Routes>
    </Router>
    </>
  )
}

export default App
