import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";



function App() {
  const [signer, setSigner] = useState(null)
  
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    setSigner(signer)
    console.log(signer)
  }




  return (
    <div className="App">
      <button onClick={connect}>{signer ? "connected!" : "Connect Wallet"}</button>
      <br/><br/><br/><br/><br/>
      <button></button>
    </div>
  );
}

export default App;
