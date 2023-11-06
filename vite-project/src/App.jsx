import { useEffect, useState } from 'react'
import './App.css'

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
    This is App.json
    <p>{helloWorld}</p>
    </>
  )
}

export default App
