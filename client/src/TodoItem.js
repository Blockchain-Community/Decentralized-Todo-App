import React from 'react'

export default function TodoItem({ item }) {
    return (
        <div>
            <div className="card" style={{ marginTop: "20px" }}>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{item.createdAt}</h6>
                    <p className="card-text">{item.description}</p>
                </div>
            </div>
        </div>
    )
}
