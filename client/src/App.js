import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { createAlchemyWeb3 } from "@alch/alchemy-web3"
import contract from "./build/contracts/Todo.json"
import Home from './Home.';

require('dotenv').config();

export default function App() {
  const [account, setAccount] = useState('')
  const [todoItems, setTodoItems] = useState([])
  const [todoContract, setTodoContract] = useState(null);
  const [loading, setLoading] = useState(true)

  async function loadWeb3() {
    var { ethereum, web3 } = window;

    if (ethereum) {
      await ethereum.request({ method: "eth_requestAccounts" });
      ethereum.autoRefreshOnNetworkChange = false;
    } else if (web3) {
      web3 = new Web3(web3.currentProvider);
    } else {
      window.alert("Consider using metamask or web3 compatible browser(Mist).");
    }

    // get ethereum accounts
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    setAccount(accounts[0]);
  }

  async function loadBlockchainData() {
    // setup contract
    const API_KEY = "your api key here";
    const alchWeb3 = createAlchemyWeb3(API_KEY);

    const contractAddress = "contract address here";
    const todoContract = new alchWeb3.eth.Contract(contract.abi, contractAddress);
    setTodoContract(todoContract)

    const itemCount = await todoContract.methods.itemCount().call()

    // Load images
    for (var i = 1; i <= itemCount; i++) {
      const item = await todoContract.methods.todoItems(i).call()
      setTodoItems(prev => [...prev, item])
    }

    setLoading(false)
  }

  const setNewItem = async (title, description) => {
    setLoading(true);
    todoContract.methods.setNewItem(title, description, String(Date.now())).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false)
    });

  }
  useEffect(() => {
    (async function fetchData() {
      await loadWeb3()
      await loadBlockchainData()
    })()
  }, [])

  return (
    <div>
      { loading
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        : <Home setNewItem={setNewItem}  todoItems={todoItems} setTodoItems={setTodoItems}/>
      }
    </div>
  )
}