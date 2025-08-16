import React, { useState } from 'react';
import { createEntity, updateEntity } from '../api/client';
import '../css/EditModal.css'; // Make sure to create this CSS file

const EditModal = ({ entityType, entity, onClose, onSuccess }) => {
  const [formData, setFormData] = useState(entity || {});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Basic validation: ensure no empty fields
    for (let key in formData) {
      if (!formData[key]) {
        setError(`Please fill in the ${key} field`);
        return;
      }
    }
    setError('');

    const apiCall = entity
      ? updateEntity(entityType, entity.id, formData)
      : createEntity(entityType, formData);

    apiCall
      .then(onSuccess)
      .catch((err) => setError('Error saving data: ' + err.message));
  };

  return (
    <div className="modal-backdrop">
      <div className="edit-modal">
        <div className="edit-modal-header">
          <h5>{entity ? 'Edit' : 'Add'} {entityType}</h5>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="edit-modal-body">
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label>{key}</label>
              <input
                className="form-control"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
        </div>
        <div className="edit-modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
