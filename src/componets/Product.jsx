import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const Product = () => {
    const [data, setData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null); // Track which product is being edited
    const [editName, setEditName] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDesc, setEditDesc] = useState('');
    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get("http://localhost:3001/product").then((res) => {
            setData(res.data);
        });
    };

    const handleSubmit = () => {
        const newData = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            desc: descRef.current.value,
        };

        axios.post("http://localhost:3001/product", newData).then((res) => {
            setData([...data, res.data]);
            clearInputs();
        });
    };

    const deleteData = (id) => {
        axios.delete(`http://localhost:3001/product/${id}`).then(() => {
            setData(data.filter((val) => val.id !== id));
        });
    };

    const clearInputs = () => {
        nameRef.current.value = '';
        priceRef.current.value = '';
        descRef.current.value = '';
    };

    const handleEdit = (id) => {
        const productToEdit = data.find((val) => val.id === id);
        setEditingId(id);
        setEditName(productToEdit.name);
        setEditPrice(productToEdit.price);
        setEditDesc(productToEdit.desc);
    };

    const handleUpdate = () => {
        const updatedData = {
            name: editName,
            price: editPrice,
            desc: editDesc,
        };

        axios.put(`http://localhost:3001/product/${editingId}`, updatedData).then(() => {
            const updatedProducts = data.map((product) =>
                product.id === editingId ? { ...product, ...updatedData } : product
            );
            setData(updatedProducts);
            setEditingId(null);
        });
    };

    const filteredData = data.filter((item) => {
        return item.name.toLowerCase().includes(inputValue.toLowerCase());
    });

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-light text-center">
                            <h2>Product Management</h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Search Products..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                            </div>
                            <div className="row mb-3">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Product Name" ref={nameRef} />
                                </div>
                                <div className="col">
                                    <input type="number" className="form-control" placeholder="Price" ref={priceRef} />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Description" ref={descRef} />
                                </div>
                                <div className="col-auto">
                                    <button onClick={handleSubmit} className="btn btn-success">Add Product</button>
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((val) => (
                                        <tr key={val.id}>
                                            <td>{val.id}</td>
                                            <td>{val.id === editingId ? <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} /> : val.name}</td>
                                            <td>{val.id === editingId ? <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} /> : `$${val.price}`}</td>
                                            <td>{val.id === editingId ? <input type="text" value={editDesc} onChange={(e) => setEditDesc(e.target.value)} /> : val.desc}</td>
                                            <td>
                                                {val.id === editingId ? (
                                                    <button onClick={handleUpdate} className="btn btn-primary mr-2">Update</button>
                                                ) : (
                                                    <button onClick={() => handleEdit(val.id)} className="btn btn-warning mr-2">Edit</button>
                                                )}
                                                <button onClick={() => deleteData(val.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
