import './App.css';
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import EthersAdapter from '@gnosis.pm/safe-ethers-lib'
import Safe, { SafeFactory, SafeAccountConfig } from '@gnosis.pm/safe-core-sdk'





function App() {
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [safeOwner, setSafeOwner] = useState(null)
  const [ethAdapter, setEthAdapter] = useState(null)
  const [address, setAddress] = useState(null)
  const [timeValue, setTimeValue] = useState(300)

  // const SafeFactoryAddress = "0xa6B71E26C5e0845f74c812102Ca7114b6a896AB2"
  // const SafeFactoryABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"},{"indexed":false,"internalType":"address","name":"singleton","type":"address"}],"name":"ProxyCreation","type":"event"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"}],"name":"calculateCreateProxyWithNonceAddress","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"singleton","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"createProxy","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"},{"internalType":"contract IProxyCreationCallback","name":"callback","type":"address"}],"name":"createProxyWithCallback","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_singleton","type":"address"},{"internalType":"bytes","name":"initializer","type":"bytes"},{"internalType":"uint256","name":"saltNonce","type":"uint256"}],"name":"createProxyWithNonce","outputs":[{"internalType":"contract GnosisSafeProxy","name":"proxy","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"proxyCreationCode","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"proxyRuntimeCode","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"pure","type":"function"}]


  
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    setSigner(signer)
    setProvider(provider)
    const safeOwner = provider.getSigner(0)
    setSafeOwner(safeOwner)
    const ethAdapter = new EthersAdapter({
      ethers,
      signer: safeOwner
    })
    setEthAdapter(ethAdapter)
    setAddress(await signer.getAddress())
    console.log(signer)
  }

  // const deploySafe = async () => {
    
  // }

  


  return (
    <div className="App">
      <p>1. </p><button onClick={connect}>{signer ? "connected!" : "Connect Wallet"}</button>
      <br/><br/>
      2.
      <br/>
      <p>Deploy Safe at <a href="https://gnosis-safe.io/app/welcome" target="_blank">https://gnosis-safe.io/app/welcome</a> and send assets to Safe</p>
      <br/>
      3.
      <br /><br />
      How long do you want to HODL? 
      <select value={timeValue} onChange={(e) => setTimeValue(e.target.value)}>
            <option value={300} >5 minutes</option>
            <option value={2630000}>1 month</option>
            <option value={7890000}>3 months</option>
            <option value={31560000}>1 year</option>
            <option value={157680000}>5 years</option>
          </select>
    </div>
  );
}

export default App;
