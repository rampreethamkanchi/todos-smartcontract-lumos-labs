import "./App.css";
import React from "react";
const abi = require('../contract-abi.json');
const { ethers } = require("ethers");
function App() {
    const address = '0xc29fbc55aa098022df3de90a77ebcd5544f37382';
    const [hash, setHash] = React.useState('none');
    const [status, setStatus] = React.useState('none');
    const [gasFee, setGasFee] = React.useState('none');
    const [transactionFee, setTransactionFee] = React.useState('none');
    const [from, setFrom] = React.useState('none');
    const [to, setTo] = React.useState('none');
    const [block, setBlock] = React.useState('none');
    const [currentValue, setCurrentValue] = React.useState(0);
    // contract address - 0xc29fbc55aa098022df3de90a77ebcd5544f37382
    async function handleCreate(){
        const input = document.getElementById('input');
        const value = input.value;
        const accounts= await window.ethereum.request({
            method : 'eth_requestAccounts'
        })
        alert(`Connected to ${accounts[0]}`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address,abi,signer);
        const transactionResponce = await contract.createTodo(value);
        const transactonReciept = await transactionResponce.wait(1);
    }
    
    return (
        <div className="App">
            <img
                src="https://media.istockphoto.com/id/1344021555/photo/blocks-with-locks-on-dark-blue-background-future-innovation-blockchain-technology-token-money.webp?b=1&s=170667a&w=0&k=20&c=CgTveKWIUY7mVdbvRqdpx93afQ35MuLn5MGZIVEOYAU="
                alt="Blockchain Explorer cum function caller"
                id="image"
            />
            <h1 id="heading">
                This website can be used to store your Todo lists in <b>Sepolia blockchain</b>
            </h1>
            <h3 id="subHeading">and also gives you different functionalities</h3>
            <input type="text" placeholder="Enter a name to your Todo" id="input" />
            <button id="create" className="btn" onClick={handleCreate}>Create a Todo</button>
            <button id="disable" className="btn" onClick={handleDisable}>Delete</button>
            <button id="edit" className="btn" onClick={handleEdit}>Edit</button>
            
            <div className="infos" id="info1">Information regarding your recent transaction with the blockchain</div>
            <div className="infos" id="info2">Transaction Hash : {hash}</div>
            <div className="infos" id="info3">Transaction Status : {status}</div>
            <div className="infos" id="info4">Block Number: {block}</div>
            <div className="infos" id="info5">From : {from}</div>
            <div className="infos" id="info6">To : {to}</div>
            <div className="infos" id="info8">Transaction Fee : {transactionFee}</div>
            <div className="infos" id="info9">Gas Price : {gasFee}</div>
        </div>
    );
}

export default App;
