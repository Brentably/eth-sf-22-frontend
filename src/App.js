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

  const deploySafe = async () => {
    
  }




  return (
    <div className="App">
      <button onClick={connect}>{signer ? "connected!" : "Connect Wallet"}</button>
      <br/><br/><br/><br/><br/>
      <p>Deploy Safe at </p>
    </div>
  );
}

export default App;
