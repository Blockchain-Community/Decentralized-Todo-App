// SPDX-License-Identifier: Non Licensed
pragma solidity ^0.5.0;

contract Todo{
    // init the count for item
    uint public itemCount = 0;
    
    // declare todo structure
    struct TodoItem {
        uint256 id;
        string title;
        string description;
        string createdAt;
    }
    
    // event after the process is completed
    event NewItemAdded(string _title, string _description, string _createdAt);
    
    // init array of structs
    mapping(uint256 => TodoItem) public todoItems;
    
    // add new item to the array
    function setNewItem(string memory _title, string memory _description, string memory _createdAt) public {
        // check all the requirement    ites
        require(bytes(_title).length > 0 , 'Title is required!');
        require(bytes(_description).length > 0 , 'Description is required!');
        require(bytes(_createdAt).length > 0 , 'Created at is required!');
        require(msg.sender != address(0x0), "User address is required!");
        
        ++itemCount;
        todoItems[itemCount] = TodoItem(itemCount, _title, _description, _createdAt);
        emit NewItemAdded(_title, _description, _createdAt);
    }
}