import React, { useState } from 'react'
import "./Home.css"
import TodoItem from './TodoItem';

export default function Home({ setNewItem, todoItems, setTodoItems }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    return (
        <div className="container">
            <form className="todo-form" onSubmit={(e) => {
                e.preventDefault();
                setNewItem(title, description);
                setTodoItems(prev => [...prev, { title, description, createdAt: String(Date.now()) }])
            }}>
                <h1>Decentralized Todo</h1>
                <div className="form-group">
                    <label for="todoTitle">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" id="todoTitle" />
                </div>
                <div className="form-group">
                    <label for="todoDescription">Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="todoDescription" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>

                {/* items */}
                {
                    todoItems &&
                    todoItems.map((data, index) => (
                        <TodoItem key={index} item={data} />
                    ))
                }
            </form>
        </div>
    )
}
