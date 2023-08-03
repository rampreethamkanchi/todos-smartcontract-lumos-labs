import './App.css';
import React from 'react';
const { ethers, JsonRpcProvider } = require("ethers");
function App() {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    
  }, [value]);
  async function handleSubmit(){
    try{
    // contract address - 0x3468ce335938c2e4747e5b6c9a87b94169be17e0
      // const provider = new ethers.BrowserProvider(window.ethereum);
      // my address - 0x7C6c885Df55e42E0aFccfbE42F9bf6D906F7C827;
      // private key -  035f80f66bf2c6e1a5c61886302d88a41c0244e1e23fb6f967898412e636479c
      // my rpc url - https://eth-sepolia.g.alchemy.com/v2/jagNpWxwdx3cUV04kxR2LgbXaffhOuvr
      const abi = [
        {
          "inputs": [
            {
              "internalType": "uint16",
              "name": "_value",
              "type": "uint16"
            }
          ],
          "name": "store",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "value",
          "outputs": [
            {
              "internalType": "uint16",
              "name": "",
              "type": "uint16"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ];
      //wallet,rpc provider,contract info
      const provider = new ethers.providers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/jagNpWxwdx3cUV04kxR2LgbXaffhOuvr');
      const wallet = new ethers.Wallet('035f80f66bf2c6e1a5c61886302d88a41c0244e1e23fb6f967898412e636479c',provider);
      const contract = new ethers.Contract('0x3468ce335938c2e4747e5b6c9a87b94169be17e0',abi,wallet);
      alert('Wait for few seconds while i get your transaction');
      const transactionResponce=await contract.store(2,{gasLimit:5000000});
      const transactionReciept = await transactionResponce.wait(1);
      alert(`transactionReciept: ${transactionReciept}` );
      alert('Transaction Successful!');

    }
    catch (e){
      console.log('error uccured ramu!',e);
      // return (
      //   <h1 className='App'>error uccured ramu!</h1>
      // );
    }
  }
  return (
    <div className="App">
      <h1 id='heading'>This website can be used to store a value in Sepolia blockchain</h1>
      <h3 id='subHeading'>and also different functionalities</h3>
      <div id="currentValue" className='info'>
        <span > The present value in the blockchain is: </span>
        <span>{0}</span>
        <div id="inputValue" className='info'>
          <label htmlFor="update">Enter the value you would love to store: </label>
          <input type="text" id='update' placeholder='from 0 to 65535'/>
        </div>
        <button id='submitValue' onClick = {handleSubmit} className='info'>submit</button>
      </div>
    </div>
  );
}

export default App;
