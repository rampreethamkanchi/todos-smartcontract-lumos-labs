import "./App.css";
import React from "react";
const abi = require("./contract-abi.json");
const { ethers } = require("ethers");
function App() {
    const [flag, setFlag] = React.useState(0);
    const [arr, setArr] = React.useState(
        <h2>
            Nothing to show. If you already have todos please connect. If not,
            create
        </h2>
    );
    const [connected, setConnected] = React.useState(false);
    const address = "0x3e0fd9275c3a0dab2419c702ad01f973a76eeed2";
    const [hash, setHash] = React.useState("none");
    const [status, setStatus] = React.useState("none");
    const [gasFee, setGasFee] = React.useState("none");
    const [transactionFee, setTransactionFee] = React.useState("none");
    const [from, setFrom] = React.useState("none");
    const [to, setTo] = React.useState("none");
    const [block, setBlock] = React.useState("none");
    const [currentValue, setCurrentValue] = React.useState(0);

    //function to set the recent transaction details
    async function setRecentTransaction(transactonReciept) {
        setBlock(transactonReciept.blockNumber);
        setFrom(transactonReciept.from);
        setHash(transactonReciept.transactionHash);
        setTo(transactonReciept.to);
        if (transactonReciept.status == 1) {
            setStatus("success");
        } else {
            setStatus("failed");
        }
        const bigNumberGP= transactonReciept.effectiveGasPrice;
        const gasPrice = ethers.utils.formatEther(bigNumberGP);
        setGasFee(`${gasPrice} eth`);
        const bigNumberGU= transactonReciept.cumulativeGasUsed;
        const gasUsed = parseInt(bigNumberGU);
        const totalFee = gasUsed*gasPrice;
        setTransactionFee(`${totalFee} eth`);
    }

    //funtion to update or fetch to print all active todos
    async function printTodos(contract,code) {
        let count = 0;
        let a = [];
        let b = [];
        let array = [];
        const countOfTodos = await contract.countOfTodos();
         if(code==0) setArr(<h2>Updating your list...</h2>);
         else setArr( <h2>Fetching your list...</h2> )
        for (let i = 0; i < countOfTodos; i++) {
            a.push(await contract.map(i + 1));
            b.push((await contract.todoList(i)).status);
        }
        for (let i = 0; i < countOfTodos; i++) {
            if (b[i] == true || i == countOfTodos - 1) {
                count++;
                async function q(count, i) {
                    array.push(
                        <h3 className="yourTodo">
                            <span className="left">
                                {count}: {(await contract.todoList(i))["title"]}{" "}
                            </span>
                            <span className="right">
                                <button
                                    id="disable"
                                    className="btn1 btn"
                                    onClick={() => {
                                        handleDisable(count, i + 1);
                                    }}
                                >
                                    Delete
                                </button>
                            </span>
                        </h3>
                    );

                    if (i == countOfTodos - 1) {
                        if (b[i] == false) array.pop();
                        setArr(array);
                    }
                }
                q(count, i);
            }
        }
        if (array.length == 0)
            setArr(<h2>You dont have todos, please create.</h2>);
    }

    //funtion to connect website with the wallet(like Metamask).
    async function handleConnect() {
        const connecting = document.getElementById("connecting");
        if (!connected) {
            connecting.innerHTML = "Waiting for your connection....";
            connecting.style["background-color"] = "yellow";
            connecting.style["color"] = "black";

            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    const provider = new ethers.providers.Web3Provider(
                        window.ethereum
                    );
                    const contract = new ethers.Contract(
                        address,
                        abi,
                        provider
                    );
                    setConnected(true);
                    printTodos(contract,1);

                    connecting.innerHTML = `Connected to ${accounts[0]}`;
                    connecting.style["background-color"] = "green";
                    connecting.style["color"] = "white";
                } catch (e) {
                    console.log(e);
                    connecting.innerHTML =
                        "Connection rejected, please connect and click here.";
                }
            } else {
                connecting.innerHTML = "!!! Please install a wallet !!!";
            }
        } else {
            connecting.innerHTML = "Already Connected";
            connecting.style["color"] = "white";

            connecting.style["background-color"] = "green";
        }
    }

    //funtionto check the wallet and prompt to connect
    function checkConnection() {
        if (window.ethereum) {
            return (
                <div>
                    <button
                        onClick={handleConnect}
                        className="btn"
                        id="connecting"
                    >
                        Click here to connect To MetaMask To see your Todo List
                    </button>
                </div>
            );
        } else {
            return <h1>Please Install a Wallet (ex: MetaMask)</h1>;
        }
    }

    //function to create a new todo in the blockchain
    async function handleCreate() {
        const create = document.getElementById("create");
        const connecting = document.getElementById("connecting");
        if (window.ethereum) {
            try {
                create.innerHTML = "creating...";
                const input = document.getElementById("input");
                const value = input.value;
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                connecting.innerHTML = `Connected to ${accounts[0]}`;
                connecting.style["background-color"] = "green";
                connecting.style["color"] = "white";
                setConnected(true);
                const provider = new ethers.providers.Web3Provider(
                    window.ethereum
                );
                const signer = provider.getSigner();
                const contract = new ethers.Contract(address, abi, signer);
                create.innerHTML =
                    "please wait while the transaction is being processed...";
                const transactionResponce = await contract.createTodo(value);
                create.innerHTML = "waiting for confirmation...";
                const transactonReciept = await transactionResponce.wait(1);
                console.log("transactonReciept:", transactonReciept);
                create.innerHTML =
                    "created, you will see the updated list shortly";
                setRecentTransaction(transactonReciept);
                printTodos(contract,0);
            } catch (e) {
                console.log(e);
                console.log("Please connect with the website");
                connecting.innerHTML = "Connection rejected";
                alert("failed creation");
            } finally {
                create.innerHTML = "create";
            }
        } else {
            connecting.innerHTML = "!!! Please install a wallet !!!";
        }
    }

    //function to delete (disable) a todo in the blockchain
    async function handleDisable(_id, realId) {
        const disable = document.getElementsByClassName("btn1");
        try {
            disable[_id - 1].innerHTML = "Deleting...";
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(address, abi, signer);
            const transactionResponce = await contract.disableTodo(realId);
            disable[_id - 1].innerHTML = "please wait...";
            const transactonReciept = await transactionResponce.wait(1);
            console.log("transactonReciept:", transactonReciept);
            disable[_id - 1].innerHTML =
                "Deleted. It will reflect here shortly";
            setRecentTransaction(transactonReciept);
            printTodos(contract,0);
        } catch (e) {
            console.log(e);
            console.log(
                "failed deletion. Please sign the transaction when trying again"
            );
            disable[_id - 1].innerHTML = "Failed Deletion";
            alert(
                "failed deletion. Please sign the transaction when trying again"
            );
        } finally {
            disable[_id - 1].innerHTML = "Delete";
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
                This website can be used to store your Todo lists in{" "}
                <u>Sepolia blockchain</u>
            </h1>
            <h3 id="subHeading">
                and also gives you different functionalities
            </h3>
            <input
                type="text"
                placeholder="Enter a name to your Todo"
                id="input"
            />
            <button id="create" className="btn" onClick={handleCreate}>
                Create a Todo
            </button>

            {checkConnection()}
            {arr}
            <div className="infos" id="info1">
                Information regarding your recent transaction with the smart
                contract
            </div>
            <div className="infos" id="info2">
                Transaction Hash : {hash}
            </div>
            <div className="infos" id="info3">
                Transaction Status : {status}
            </div>
            <div className="infos" id="info4">
                Block Number: {block}
            </div>
            <div className="infos" id="info5">
                From : {from}
            </div>
            <div className="infos" id="info6">
                To : {to}
            </div>
            <div className="infos" id="info8">
                Transaction Fee : {transactionFee}
            </div>
            <div className="infos" id="info9">
                Gas Price : {gasFee}
            </div>
        </div>
    );
}

export default App;
