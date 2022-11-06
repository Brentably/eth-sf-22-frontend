import './App.css';
import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
// import EthersAdapter from '@gnosis.pm/safe-ethers-lib'





function App() {
  const [signer, setSigner] = useState(null)
  const [provider, setProvider] = useState(null)
  const [address, setAddress] = useState(null)
  const [timeValue, setTimeValue] = useState(300)
  const [safeAddress, setSafeAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [lockAddress, setLockAddress] = useState("")
  const [textCopied, setTextCopied] = useState(false)

// connects on page load
  useEffect(() => connect, [])

  useEffect(() => {
    const func = async () => {
    if(safeAddress) {
    let resp = await fetch(`https://api.covalenthq.com/v1/5/address/${safeAddress}/balances_v2/?quote-currency=USD&format=JSON&nft=false&no-nft-fetch=false&key=ckey_2b4e40855724423b83d84b656a6`)
    console.log(await resp.json())
    }
  }
    func()
  }, [safeAddress])


  const TimeGuardABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_time",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "stateMutability": "nonpayable",
      "type": "fallback"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "name": "checkAfterExecution",
      "outputs": [],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        },
        {
          "internalType": "enum Enum.Operation",
          "name": "operation",
          "type": "uint8"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "checkTransaction",
      "outputs": [],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "time",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]


  //contract pre-compiled
  const TimeGuardByteCode= "0x608060405234801561001057600080fd5b5060405161077f38038061077f8339818101604052810190610032919061005b565b4260018190555080600081905550506100ae565b60008151905061005581610097565b92915050565b60006020828403121561007157610070610092565b5b600061007f84828501610046565b91505092915050565b6000819050919050565b600080fd5b6100a081610088565b81146100ab57600080fd5b50565b6106c2806100bd6000396000f3fe608060405234801561001057600080fd5b50600436106100505760003560e01c8063041151871461005357806316ada5471461007157806375f0bb521461008f57806393271368146100ab57610051565b5b005b61005b6100c7565b60405161006891906103e1565b60405180910390f35b6100796100cd565b60405161008691906103e1565b60405180910390f35b6100a960048036038101906100a49190610223565b6100d3565b005b6100c560048036038101906100c0919061034f565b610131565b005b60015481565b60005481565b6000546001546100e39190610463565b4211610124576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161011b906103c1565b60405180910390fd5b5050505050505050505050565b5050565b600061014861014384610421565b6103fc565b905082815260208101848484011115610164576101636105c0565b5b61016f84828561051d565b509392505050565b60008135905061018681610609565b92915050565b60008135905061019b81610620565b92915050565b6000813590506101b081610637565b92915050565b6000813590506101c58161064e565b92915050565b600082601f8301126101e0576101df6105bb565b5b81356101f0848260208601610135565b91505092915050565b60008135905061020881610665565b92915050565b60008135905061021d81610675565b92915050565b60008060008060008060008060008060006101608c8e031215610249576102486105ca565b5b60006102578e828f01610177565b9b505060206102688e828f0161020e565b9a505060408c013567ffffffffffffffff811115610289576102886105c5565b5b6102958e828f016101cb565b99505060606102a68e828f016101f9565b98505060806102b78e828f0161020e565b97505060a06102c88e828f0161020e565b96505060c06102d98e828f0161020e565b95505060e06102ea8e828f01610177565b9450506101006102fc8e828f0161018c565b9350506101208c013567ffffffffffffffff81111561031e5761031d6105c5565b5b61032a8e828f016101cb565b92505061014061033c8e828f01610177565b9150509295989b509295989b9093969950565b60008060408385031215610366576103656105ca565b5b6000610374858286016101b6565b9250506020610385858286016101a1565b9150509250929050565b600061039c601783610452565b91506103a7826105e0565b602082019050919050565b6103bb81610513565b82525050565b600060208201905081810360008301526103da8161038f565b9050919050565b60006020820190506103f660008301846103b2565b92915050565b6000610406610417565b9050610412828261052c565b919050565b6000604051905090565b600067ffffffffffffffff82111561043c5761043b61058c565b5b610445826105cf565b9050602081019050919050565b600082825260208201905092915050565b600061046e82610513565b915061047983610513565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156104ae576104ad61055d565b5b828201905092915050565b60006104c4826104f3565b9050919050565b60006104d6826104f3565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b610535826105cf565b810181811067ffffffffffffffff821117156105545761055361058c565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f546869732063616c6c2069732072657374726963746564000000000000000000600082015250565b610612816104b9565b811461061d57600080fd5b50565b610629816104cb565b811461063457600080fd5b50565b610640816104dd565b811461064b57600080fd5b50565b610657816104e9565b811461066257600080fd5b50565b6002811061067257600080fd5b50565b61067e81610513565b811461068957600080fd5b5056fea2646970667358221220f985e648f3a3adee752cef7de7ee4eab060e6140e14724ea9acbe3aa1e02b7ef64736f6c63430008070033"

  const SafeABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"AddedOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"approvedHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"owner","type":"address"}],"name":"ApproveHash","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"handler","type":"address"}],"name":"ChangedFallbackHandler","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"guard","type":"address"}],"name":"ChangedGuard","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"threshold","type":"uint256"}],"name":"ChangedThreshold","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"module","type":"address"}],"name":"DisabledModule","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"module","type":"address"}],"name":"EnabledModule","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"txHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"payment","type":"uint256"}],"name":"ExecutionFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"module","type":"address"}],"name":"ExecutionFromModuleFailure","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"module","type":"address"}],"name":"ExecutionFromModuleSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bytes32","name":"txHash","type":"bytes32"},{"indexed":false,"internalType":"uint256","name":"payment","type":"uint256"}],"name":"ExecutionSuccess","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"owner","type":"address"}],"name":"RemovedOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"SafeReceived","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"initiator","type":"address"},{"indexed":false,"internalType":"address[]","name":"owners","type":"address[]"},{"indexed":false,"internalType":"uint256","name":"threshold","type":"uint256"},{"indexed":false,"internalType":"address","name":"initializer","type":"address"},{"indexed":false,"internalType":"address","name":"fallbackHandler","type":"address"}],"name":"SafeSetup","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"msgHash","type":"bytes32"}],"name":"SignMsg","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[],"name":"VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"_threshold","type":"uint256"}],"name":"addOwnerWithThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"hashToApprove","type":"bytes32"}],"name":"approveHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"approvedHashes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_threshold","type":"uint256"}],"name":"changeThreshold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"signatures","type":"bytes"},{"internalType":"uint256","name":"requiredSignatures","type":"uint256"}],"name":"checkNSignatures","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"dataHash","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"signatures","type":"bytes"}],"name":"checkSignatures","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"prevModule","type":"address"},{"internalType":"address","name":"module","type":"address"}],"name":"disableModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"domainSeparator","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"enableModule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"},{"internalType":"uint256","name":"safeTxGas","type":"uint256"},{"internalType":"uint256","name":"baseGas","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"gasToken","type":"address"},{"internalType":"address","name":"refundReceiver","type":"address"},{"internalType":"uint256","name":"_nonce","type":"uint256"}],"name":"encodeTransactionData","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"},{"internalType":"uint256","name":"safeTxGas","type":"uint256"},{"internalType":"uint256","name":"baseGas","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"gasToken","type":"address"},{"internalType":"address payable","name":"refundReceiver","type":"address"},{"internalType":"bytes","name":"signatures","type":"bytes"}],"name":"execTransaction","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"}],"name":"execTransactionFromModule","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"}],"name":"execTransactionFromModuleReturnData","outputs":[{"internalType":"bool","name":"success","type":"bool"},{"internalType":"bytes","name":"returnData","type":"bytes"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getChainId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"start","type":"address"},{"internalType":"uint256","name":"pageSize","type":"uint256"}],"name":"getModulesPaginated","outputs":[{"internalType":"address[]","name":"array","type":"address[]"},{"internalType":"address","name":"next","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwners","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"offset","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"}],"name":"getStorageAt","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"},{"internalType":"uint256","name":"safeTxGas","type":"uint256"},{"internalType":"uint256","name":"baseGas","type":"uint256"},{"internalType":"uint256","name":"gasPrice","type":"uint256"},{"internalType":"address","name":"gasToken","type":"address"},{"internalType":"address","name":"refundReceiver","type":"address"},{"internalType":"uint256","name":"_nonce","type":"uint256"}],"name":"getTransactionHash","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"module","type":"address"}],"name":"isModuleEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"prevOwner","type":"address"},{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"_threshold","type":"uint256"}],"name":"removeOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"enum Enum.Operation","name":"operation","type":"uint8"}],"name":"requiredTxGas","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"handler","type":"address"}],"name":"setFallbackHandler","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"guard","type":"address"}],"name":"setGuard","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_owners","type":"address[]"},{"internalType":"uint256","name":"_threshold","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"address","name":"fallbackHandler","type":"address"},{"internalType":"address","name":"paymentToken","type":"address"},{"internalType":"uint256","name":"payment","type":"uint256"},{"internalType":"address payable","name":"paymentReceiver","type":"address"}],"name":"setup","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"signedMessages","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"targetContract","type":"address"},{"internalType":"bytes","name":"calldataPayload","type":"bytes"}],"name":"simulateAndRevert","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"prevOwner","type":"address"},{"internalType":"address","name":"oldOwner","type":"address"},{"internalType":"address","name":"newOwner","type":"address"}],"name":"swapOwner","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]



  
  const connect = async () => {
    //B/c the bytecode is EVM, it's compatible with all EVM-compatible chains :)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    setSigner(signer)
    setProvider(provider)
    setAddress(await signer.getAddress())
    console.log(signer)
  }

  const genLock = async () => {

    const factory = new ethers.ContractFactory(TimeGuardABI, TimeGuardByteCode, signer)
    const timeGuardContract = await factory.deploy(timeValue);
    
    setLoading(true)
    console.log(await timeGuardContract.deployTransaction.wait())
    setLoading(false)

    console.log(timeGuardContract.address)
    setLockAddress(timeGuardContract.address)

    console.log(signer)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(lockAddress)
    setTextCopied(true)
  }
  
  const something = async () => {
    const safeAddress = "0x2A31b4aE7d4D1dcE2f5d1E08c67Bae1747835EC3"
    const lockAddress = "0xC30bdAD24C1cC4fAF6F714Ca02eA2ae2c26fF376"
    //^hardcoded for testing

    //two things to try: 1.) sign the tx_data using sign_message 2.) sign the unsigned tx, which can be classified as a transaction request

    const safeABI = SafeABI
    const safeContract = new ethers.Contract(safeAddress, safeABI, signer)
    console.log(safeContract)

    const {data: tx_data} = await safeContract.populateTransaction.setGuard(lockAddress)

    const tx_nonce = await safeContract.nonce()
    const new_tx_data = await safeContract.encodeTransactionData(safeAddress, 0, tx_data, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", tx_nonce)
    const tx_hash = await safeContract.getTransactionHash(safeAddress, 0, new_tx_data, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", tx_nonce)
    console.log(tx_hash)
    
    const arrayified_tx_hash = ethers.utils.arrayify(tx_hash)

    const signatures = await signer.signMessage(arrayified_tx_hash)
    console.log(signatures)
    console.log(ethers.utils.splitSignature(signatures))

    const test = await safeContract.execTransaction(safeAddress, 0, tx_data, 0, 0, 0, 0, "0x0000000000000000000000000000000000000000", "0x0000000000000000000000000000000000000000", signatures)
    console.log(await test.wait())

    
  }
 

  return (
    <div className="App">
      <h1>HODL Machine <span role="img">💎</span><span role="img">👐</span></h1>
      <p>1. </p><button onClick={connect}>{signer ? "connected!" : "Connect Wallet"}</button>
      <br/><br/>
      2.
      <br/>
      <p>Deploy Safe at <a href="https://gnosis-safe.io/app/welcome" target="_blank">https://gnosis-safe.io/app/welcome</a> and send assets to Safe</p>
      <br/>
      3.
      <br /><br />
      How long do you want to HODL? <br /> <br />
      <select value={timeValue} onChange={(e) => setTimeValue(e.target.value)}>
            <option value={300} >5 minutes</option>
            <option value={2630000}>1 month</option>
            <option value={7890000}>3 months</option>
            <option value={31560000}>1 year</option>
            <option value={157680000}>5 years</option>
          </select>
      
      <br /><br />
      4.
      <br /><br />
      <form>
      <label>Safe Address: <br /> <br />
        <input type="text" value={safeAddress} onChange={(e) => setSafeAddress(e.target.value)}/>
      </label>
    </form>
    <br/>
     <button onClick={genLock}>Generate Lock</button>
     <p onClick={handleCopy}>{lockAddress ? `${lockAddress}` : null}{textCopied? " copied!" : null}</p>
     <h1>{loading ? "Generating lock..." : null}</h1>
     <br />
      5. Install the lock via Gnosis Safe's Web App (<a href="https://help.gnosis-safe.io/en/articles/5496893-add-a-transaction-guard" target="_blank">tutorial here</a>)

      {/* <br /><br /><br /><br /><button onClick={something}>test button</button> */}
    </div>
  );
}

export default App;
