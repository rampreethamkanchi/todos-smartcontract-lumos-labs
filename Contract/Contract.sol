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