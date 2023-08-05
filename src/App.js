import "./App.css";
import React from "react";
const { ethers } = require("ethers");
function App() {
    const [hash, setHash] = React.useState('none');
    const [status, setStatus] = React.useState('none');
    const [gasFee, setGasFee] = React.useState('none');
    const [transactionFee, setTransactionFee] = React.useState('none');
    const [from, setFrom] = React.useState('none');
    const [to, setTo] = React.useState('none');
    const [block, setBlock] = React.useState('none');
    const [currentValue, setCurrentValue] = React.useState(0);
    React.useEffect(() => {
        const abi = [
            {
                inputs: [
                    {
                        internalType: "uint16",
                        name: "_value",
                        type: "uint16",
                    },
                ],
                name: "store",
                outputs: [],
                stateMutability: "nonpayable",
                type: "function",
            },
            {
                inputs: [],
                name: "value",
                outputs: [
                    {
                        internalType: "uint16",
                        name: "",
                        type: "uint16",
                    },
                ],
                stateMutability: "view",
                type: "function",
            },
        ];
        async function a() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                "0x3468ce335938c2e4747e5b6c9a87b94169be17e0",
                abi,
                provider
            );
            const initialValue = await contract.value();
            setCurrentValue(String(initialValue));
        }
        a();
    }, [currentValue]);
    async function handleRefresh(){
        try{
            setCurrentValue('fetching...');
        }
        catch(e){
            console.log('some error occured while retrieving the value on blockchain');
            console.log('error message',e);
        }
    }
    async function handleSubmit() {
        try {
            // contract address - 0x3468ce335938c2e4747e5b6c9a87b94169be17e0
            // const provider = new ethers.BrowserProvider(window.ethereum);
            // my address - 0x7C6c885Df55e42E0aFccfbE42F9bf6D906F7C827;
            // private key -  035f80f66bf2c6e1a5c61886302d88a41c0244e1e23fb6f967898412e636479c
            // my rpc url - https://eth-sepolia.g.alchemy.com/v2/jagNpWxwdx3cUV04kxR2LgbXaffhOuvr
            const abi = [
                {
                    inputs: [
                        {
                            internalType: "uint16",
                            name: "_value",
                            type: "uint16",
                        },
                    ],
                    name: "store",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "value",
                    outputs: [
                        {
                            internalType: "uint16",
                            name: "",
                            type: "uint16",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
            ];
            //wallet,rpc provider,contract info
            if (window.ethereum) {
                async function a() {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    // const wallet = new ethers.Wallet()
                    // const wallet =  new ethers.Wallet(,provider)
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(
                        "0x3468ce335938c2e4747e5b6c9a87b94169be17e0",
                        abi,
                        signer
                    );
                    const q = document.getElementById("update");

                    const transactionResponce = await contract.store(q.value);
                    const transactionReciept = await transactionResponce.wait(
                        1
                    );
                    console.log("transactionReciept:", transactionReciept);
                    if(transactionReciept.status==1){
                        setStatus('success');
                    }
                    else{
                        setStatus('failed');
                    }
                    setHash(transactionReciept.transactionHash);
                    setFrom(transactionReciept.from);
                    setTo(transactionReciept.to);
                    setBlock(transactionReciept.blockNumber);
                    // const gasPrice = ethers.utils.parseUnits((transactionReciept.effectiveGasPrice).toString());
                    // setGasFee(gasPrice);
                    // const totalFee = Number(ethers.utils.parseUnits(String(transactionReciept.effectiveGasPrice)))*Number(ethers.utils.parseUnits((transactionReciept.cumulativeGasUsed).tostring()));
                    // setTransactionFee(totalFee);
                }
                a();
            } else {
                console.log("please connect to metamask or other wallets");
            }
        } catch (e) {
            console.log("error uccured ramu!", e);
            // return (
            //   <h1 className='App'>error uccured ramu!</h1>
            // );
        }
    }
    return (
        <div className="App">
            <img
                src="https://media.istockphoto.com/id/1344021555/photo/blocks-with-locks-on-dark-blue-background-future-innovation-blockchain-technology-token-money.webp?b=1&s=170667a&w=0&k=20&c=CgTveKWIUY7mVdbvRqdpx93afQ35MuLn5MGZIVEOYAU="
                alt="Blockchain Explorer cum function caller"
                id="image"
            />
            <h1 id="heading">
                This website can be used to store a value in Sepolia blockchain
            </h1>
            <h3 id="subHeading">and also different functionalities</h3>
            <div id="currentValue" className="info">
                <span> The present value in the blockchain is: </span>
                <span>{currentValue}</span><button id='refresh' className="info" onClick={handleRefresh}>Refresh the value</button>
                <div id="inputValue" className="info">
                    <label htmlFor="update">
                        Enter the value you would love to store:
                    </label>
                    <input
                        type="text"
                        id="update"
                        placeholder="from 0 to 65535"
                    />
                </div>
                <button
                    id="submitValue"
                    onClick={handleSubmit}
                    className="info"
                >
                    submit
                </button>
            </div>
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
