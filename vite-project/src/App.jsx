import { useEffect, useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm';

function App() {

  const [helloWorld, setHelloWorld] = useState("");

  useEffect(() => {
    hello();
  }, []);

  async function hello() {
    const fetchHello = await fetch("http://localhost:8080/hello");
    const fetchHelloParsed = await fetchHello.json();
    setHelloWorld(fetchHelloParsed);
  }

  return (
    <>
    This is App
    <p>{helloWorld}</p>
    <LoginForm />
    </>
  )
}

export default App
