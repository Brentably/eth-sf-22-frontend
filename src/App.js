import './App.css';
import { useEffect } from 'react';
import { ethers } from "ethers";

const connect = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner()
  console.log('hi')
}


function App() {
  
  

  return (
    <div className="App">
      <button onClick={connect}>Connect wallet</button>
    </div>
  );
}

export default App;
