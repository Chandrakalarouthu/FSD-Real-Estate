import React from 'react';
import '../App.css';

const PropertyList = ({ properties, onContactOwner, onDeleteProperty }) => {
  return (
    <div className="property-list">
      {properties.map((property) => (
        <div key={property._id} className="property-card">
          <img src={property.image} alt={property.title} />
          <h3>{property.title}</h3>
          <p>{property.description}</p>
          <button onClick={() => onContactOwner(property.contact)}>Contact Owner</button>
          <button onClick={() => onDeleteProperty(property._id)} style={{ marginLeft: '10px', backgroundColor: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
