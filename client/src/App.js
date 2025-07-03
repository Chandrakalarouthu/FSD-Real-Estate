// src/App.js
import React, { useState, useEffect } from "react";
import PropertyList from "./components/PropertyList";
import AddProperty from "./components/AddProperty";
import Login from "./components/Login";
import axios from "axios";
import "./App.css";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get("http://localhost:5000/api/properties")
        .then((response) => setProperties(response.data))
        .catch((error) => console.error(error));
    }
  }, [loggedIn]);

  const handleAddProperty = (newProperty) => {
    setProperties((prev) => [...prev, newProperty]);
  };

  const handleContactOwner = (contact) => {
    alert(`Contacting the owner: ${contact}`);
  };

  const handleDeleteProperty = (id) => {
    axios.delete(`http://localhost:5000/api/properties/${id}`)
      .then(() => {
        setProperties((prev) => prev.filter(p => p._id !== id));
      })
      .catch(console.error);
  };

  return (
    <div>
      {loggedIn ? (
        <>
          <h1>Real Estate Management System</h1>
          <AddProperty onAddProperty={handleAddProperty} />
          <PropertyList properties={properties} onContactOwner={handleContactOwner} onDeleteProperty={handleDeleteProperty} />
        </>
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;
