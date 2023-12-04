# Todo Dapp

![Blockchain Explorer](https://media.istockphoto.com/id/1344021555/photo/blocks-with-locks-on-dark-blue-background-future-innovation-blockchain-technology-token-money.webp?b=1&s=170667a&w=0&k=20&c=CgTveKWIUY7mVdbvRqdpx93afQ35MuLn5MGZIVEOYAU=)

## Overview
Welcome to the Todo Dapp, a decentralized application (Dapp) developed using blockchain technology. This application utilizes a blockchain-based smart contract as the backend infrastructure and is built with React for the frontend. The Dapp allows users to manage their todo lists securely on the Sepolia blockchain.

## Features
- **Wallet Connection**: Connect your wallet, such as MetaMask, to interact with the smart contract on the blockchain.
- **Task Creation**: Create and store your todos securely on the blockchain.
- **Transaction History**: Retrieve and view details of previous transactions, including transaction hash, status, block number, sender, and recipient.
- **Delete Tasks**: Remove completed tasks within the application.

## Live Demo
Experience the Todo Dapp live at [https://rampreethamkanchi.github.io/todos-smartcontract-lumos-labs/](https://rampreethamkanchi.github.io/todos-smartcontract-lumos-labs/)

## Getting Started
1. Install a compatible wallet extension (e.g., MetaMask) in your browser.
2. Connect your wallet to the Dapp by clicking on "Click here to connect To MetaMask To see your Todo List."
3. Create new todos, delete completed tasks, and explore the transaction history.

## Smart Contract
The smart contract (`Contract.sol`) responsible for managing todos is available in the [Contract folder](./Contract).

**Contract.sol**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract TodoApp{

    uint8 public countOfTodos=0;

// Structure to store title, id and status of the todo.
    struct todo{
        uint8 id;
        string title;
        bool status;
    }
// Array of todos.
    todo[] public todoList;

// Mapping to map id to address of creater of todo.
    mapping (uint8 => address) public map ;

// fuction to create a new todo and add it to array and mapping.
    function createTodo(string memory _title) public {
        countOfTodos++;
        todo memory userTodo;
        userTodo.title=_title;
        userTodo.status=true;
        userTodo.id=countOfTodos;
        todoList.push(userTodo);
        map[countOfTodos]=msg.sender;
    }

// function to disable (delete) a todo by setting status to false.
    function disableTodo(uint8 _id) public {
        todoList[(_id)-1].status=false;
    }

}
```

**Note:** To run the project, you will need some Sepolia test Ether, as the contract is deployed on the Sepolia testnet.

## Recent Transactions
Check the information regarding your recent transactions with the smart contract in the application.

- **Transaction Hash**: {hash}
- **Transaction Status**: {status}
- **Block Number**: {block}
- **From**: {from}
- **To**: {to}
- **Transaction Fee**: {transactionFee}
- **Gas Price**: {gasFee}

## Future Plans
The Todo Dapp is an ongoing project, and future updates may include additional features and improvements to enhance the user experience.

Feel free to explore, contribute, or provide feedback!

*Note: Ensure that you have a compatible wallet extension (e.g., MetaMask) installed to interact with the blockchain.*
