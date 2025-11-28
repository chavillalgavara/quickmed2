import React, { useState, useCallback } from 'react';

// Separate Modal Components to prevent re-renders
const AddMedicineModal = ({ show, onClose, onAdd, newMedicine, setNewMedicine }) => {
  const [formErrors, setFormErrors] = useState({});

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          error = 'Medicine name is required';
        }
        break;
      case 'category':
        if (!value.trim()) {
          error = 'Category is required';
        }
        break;
      case 'quantity':
        if (!value || parseInt(value) < 0) {
          error = 'Valid quantity is required';
        }
        break;
      case 'minStock':
        if (!value || parseInt(value) < 0) {
          error = 'Valid minimum stock is required';
        }
        break;
      case 'price':
        if (!value || parseFloat(value) < 0) {
          error = 'Valid price is required';
        }
        break;
      case 'expiryDate':
        if (!value) {
          error = 'Expiry date is required';
        } else {
          const expiryDate = new Date(value);
          const today = new Date();
          if (expiryDate <= today) {
            error = 'Expiry date must be in the future';
          }
        }
        break;
      case 'supplier':
        if (!value.trim()) {
          error = 'Supplier is required';
        }
        break;
      case 'batchNo':
        if (!value.trim()) {
          error = 'Batch number is required';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const validateForm = () => {
    const errors = {};
    
    errors.name = validateField('name', newMedicine.name);
    errors.category = validateField('category', newMedicine.category);
    errors.quantity = validateField('quantity', newMedicine.quantity);
    errors.minStock = validateField('minStock', newMedicine.minStock);
    errors.price = validateField('price', newMedicine.price);
    errors.expiryDate = validateField('expiryDate', newMedicine.expiryDate);
    errors.supplier = validateField('supplier', newMedicine.supplier);
    errors.batchNo = validateField('batchNo', newMedicine.batchNo);
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setNewMedicine(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [setNewMedicine, formErrors]);

  const handleAddClick = () => {
    if (validateForm()) {
      onAdd();
    }
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const formRowStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const inputErrorStyle = {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  };

  const errorTextStyle = {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const requiredNoteStyle = {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '16px'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const checkboxStyle = {
    margin: 0
  };

  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Add New Medicine</h3>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={modalContentStyle}>
          <div style={formRowStyle}>
            <label style={labelStyle}>Medicine Name *</label>
            <input
              type="text"
              name="name"
              style={{
                ...inputStyle,
                ...(formErrors.name && inputErrorStyle)
              }}
              value={newMedicine.name}
              onChange={handleChange}
              placeholder="Enter medicine name"
            />
            {formErrors.name && <div style={errorTextStyle}>{formErrors.name}</div>}
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>Category *</label>
            <input
              type="text"
              name="category"
              style={{
                ...inputStyle,
                ...(formErrors.category && inputErrorStyle)
              }}
              value={newMedicine.category}
              onChange={handleChange}
              placeholder="Enter category"
            />
            {formErrors.category && <div style={errorTextStyle}>{formErrors.category}</div>}
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Quantity *</label>
              <input
                type="number"
                name="quantity"
                style={{
                  ...inputStyle,
                  ...(formErrors.quantity && inputErrorStyle)
                }}
                value={newMedicine.quantity}
                onChange={handleChange}
                min="0"
              />
              {formErrors.quantity && <div style={errorTextStyle}>{formErrors.quantity}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Min Stock *</label>
              <input
                type="number"
                name="minStock"
                style={{
                  ...inputStyle,
                  ...(formErrors.minStock && inputErrorStyle)
                }}
                value={newMedicine.minStock}
                onChange={handleChange}
                min="0"
              />
              {formErrors.minStock && <div style={errorTextStyle}>{formErrors.minStock}</div>}
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Price (₹) *</label>
              <input
                type="number"
                name="price"
                style={{
                  ...inputStyle,
                  ...(formErrors.price && inputErrorStyle)
                }}
                value={newMedicine.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
              {formErrors.price && <div style={errorTextStyle}>{formErrors.price}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Expiry Date *</label>
              <input
                type="date"
                name="expiryDate"
                style={{
                  ...inputStyle,
                  ...(formErrors.expiryDate && inputErrorStyle)
                }}
                value={newMedicine.expiryDate}
                onChange={handleChange}
              />
              {formErrors.expiryDate && <div style={errorTextStyle}>{formErrors.expiryDate}</div>}
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Supplier *</label>
              <input
                type="text"
                name="supplier"
                style={{
                  ...inputStyle,
                  ...(formErrors.supplier && inputErrorStyle)
                }}
                value={newMedicine.supplier}
                onChange={handleChange}
                placeholder="Enter supplier name"
              />
              {formErrors.supplier && <div style={errorTextStyle}>{formErrors.supplier}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Batch No *</label>
              <input
                type="text"
                name="batchNo"
                style={{
                  ...inputStyle,
                  ...(formErrors.batchNo && inputErrorStyle)
                }}
                value={newMedicine.batchNo}
                onChange={handleChange}
                placeholder="Enter batch number"
              />
              {formErrors.batchNo && <div style={errorTextStyle}>{formErrors.batchNo}</div>}
            </div>
          </div>
          <div style={formRowStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={newMedicine.prescriptionRequired}
                onChange={handleChange}
                style={checkboxStyle}
              />
              Prescription Required
            </label>
          </div>
          <div style={requiredNoteStyle}>
            * Required fields
          </div>
        </div>
        <div style={modalActionsStyle}>
          <button 
            style={secondaryButtonStyle}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={handleAddClick}
          >
            Add Medicine
          </button>
        </div>
      </div>
    </div>
  );
};

const EditStockModal = ({ show, onClose, onUpdate, editingMedicine, setEditingMedicine }) => {
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEditingMedicine(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, [setEditingMedicine]);

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const formRowStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const checkboxStyle = {
    margin: 0
  };

  if (!show || !editingMedicine) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Update Stock - {editingMedicine.name}</h3>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={modalContentStyle}>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Current Quantity</label>
              <input
                type="number"
                name="quantity"
                style={inputStyle}
                value={editingMedicine.quantity}
                onChange={handleChange}
                min="0"
              />
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Min Stock Level</label>
              <input
                type="number"
                name="minStock"
                style={inputStyle}
                value={editingMedicine.minStock}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Price (₹)</label>
              <input
                type="number"
                name="price"
                style={inputStyle}
                value={editingMedicine.price}
                onChange={handleChange}
                min="0"
                step="0.01"
              />
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                style={inputStyle}
                value={editingMedicine.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div style={formRowStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="prescriptionRequired"
                checked={editingMedicine.prescriptionRequired}
                onChange={handleChange}
                style={checkboxStyle}
              />
              Prescription Required
            </label>
          </div>
        </div>
        <div style={modalActionsStyle}>
          <button 
            style={secondaryButtonStyle}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={onUpdate}
          >
            Update Stock
          </button>
        </div>
      </div>
    </div>
  );
};

const ProfileModal = ({ show, onClose, onUpdate, userProfile, setUserProfile, formErrors, validateField }) => {
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate field on change
    if (validateField) {
      validateField(name, value);
    }
  }, [setUserProfile, validateField]);

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const formRowStyle = {
    marginBottom: '16px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const inputErrorStyle = {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  };

  const lockedFieldStyle = {
    backgroundColor: '#f9fafb',
    color: '#6b7280',
    cursor: 'not-allowed'
  };

  const lockedNoteStyle = {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '4px'
  };

  const errorTextStyle = {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px'
  };

  const requiredNoteStyle = {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic',
    marginTop: '16px'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Edit Pharmacy Profile</h3>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={modalContentStyle}>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Owner Name *</label>
              <input
                type="text"
                name="fullName"
                style={{
                  ...inputStyle,
                  ...(formErrors.fullName && inputErrorStyle)
                }}
                value={userProfile.fullName}
                onChange={handleChange}
                placeholder="Enter owner name"
                maxLength="50"
              />
              {formErrors.fullName && <div style={errorTextStyle}>{formErrors.fullName}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                name="email"
                style={{
                  ...inputStyle,
                  ...lockedFieldStyle,
                  ...(formErrors.email && inputErrorStyle)
                }}
                value={userProfile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled
                title="Email cannot be changed"
              />
              <div style={lockedNoteStyle}>Email cannot be changed</div>
              {formErrors.email && <div style={errorTextStyle}>{formErrors.email}</div>}
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Phone *</label>
              <input
                type="tel"
                name="phone"
                style={{
                  ...inputStyle,
                  ...(formErrors.phone && inputErrorStyle)
                }}
                value={userProfile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                maxLength="15"
              />
              {formErrors.phone && <div style={errorTextStyle}>{formErrors.phone}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Pharmacy Name *</label>
              <input
                type="text"
                name="pharmacyName"
                style={{
                  ...inputStyle,
                  ...(formErrors.pharmacyName && inputErrorStyle)
                }}
                value={userProfile.pharmacyName}
                onChange={handleChange}
                placeholder="Enter pharmacy name"
                maxLength="100"
              />
              {formErrors.pharmacyName && <div style={errorTextStyle}>{formErrors.pharmacyName}</div>}
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>License Number *</label>
              <input
                type="text"
                name="licenseNumber"
                style={{
                  ...inputStyle,
                  ...(formErrors.licenseNumber && inputErrorStyle)
                }}
                value={userProfile.licenseNumber}
                onChange={handleChange}
                placeholder="Enter license number"
                maxLength="50"
              />
              {formErrors.licenseNumber && <div style={errorTextStyle}>{formErrors.licenseNumber}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>GST Number *</label>
              <input
                type="text"
                name="gstNumber"
                style={{
                  ...inputStyle,
                  ...(formErrors.gstNumber && inputErrorStyle)
                }}
                value={userProfile.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST number"
                maxLength="15"
              />
              {formErrors.gstNumber && <div style={errorTextStyle}>{formErrors.gstNumber}</div>}
            </div>
          </div>
          <div style={formRowStyle}>
            <label style={labelStyle}>Address *</label>
            <input
              type="text"
              name="address"
              style={{
                ...inputStyle,
                ...(formErrors.address && inputErrorStyle)
              }}
              value={userProfile.address}
              onChange={handleChange}
              placeholder="Enter complete address"
              maxLength="200"
            />
            {formErrors.address && <div style={errorTextStyle}>{formErrors.address}</div>}
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>City *</label>
              <input
                type="text"
                name="city"
                style={{
                  ...inputStyle,
                  ...(formErrors.city && inputErrorStyle)
                }}
                value={userProfile.city}
                onChange={handleChange}
                placeholder="Enter city"
                maxLength="50"
                pattern="[A-Za-z\s]+"
                title="City should contain only letters and spaces"
              />
              {formErrors.city && <div style={errorTextStyle}>{formErrors.city}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>State *</label>
              <input
                type="text"
                name="state"
                style={{
                  ...inputStyle,
                  ...(formErrors.state && inputErrorStyle)
                }}
                value={userProfile.state}
                onChange={handleChange}
                placeholder="Enter state"
                maxLength="50"
                pattern="[A-Za-z\s]+"
                title="State should contain only letters and spaces"
              />
              {formErrors.state && <div style={errorTextStyle}>{formErrors.state}</div>}
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Pincode *</label>
              <input
                type="text"
                name="pincode"
                style={{
                  ...inputStyle,
                  ...(formErrors.pincode && inputErrorStyle)
                }}
                value={userProfile.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
                maxLength="6"
                pattern="[0-9]{6}"
                title="Pincode should be 6 digits"
              />
              {formErrors.pincode && <div style={errorTextStyle}>{formErrors.pincode}</div>}
            </div>
          </div>
          <div style={formGridStyle}>
            <div style={formRowStyle}>
              <label style={labelStyle}>Opening Time</label>
              <input
                type="text"
                name="openingTime"
                style={inputStyle}
                value={userProfile.openingTime}
                onChange={handleChange}
                placeholder="e.g., 08:00 AM"
                maxLength="10"
              />
            </div>
            <div style={formRowStyle}>
              <label style={labelStyle}>Closing Time</label>
              <input
                type="text"
                name="closingTime"
                style={inputStyle}
                value={userProfile.closingTime}
                onChange={handleChange}
                placeholder="e.g., 10:00 PM"
                maxLength="10"
              />
            </div>
          </div>
          <div style={requiredNoteStyle}>
            * Required fields
          </div>
        </div>
        <div style={modalActionsStyle}>
          <button 
            style={secondaryButtonStyle}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={onUpdate}
            disabled={Object.keys(formErrors).some(key => formErrors[key])}
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationsModal = ({ show, onClose, onSave, notificationSettings, setNotificationSettings }) => {
  const handleChange = useCallback((e) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  }, [setNotificationSettings]);

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '500px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const settingsSectionStyle = {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #e5e7eb'
  };

  const settingsTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  };

  const settingItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '12px'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  };

  const settingDescriptionStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginLeft: '24px'
  };

  const checkboxStyle = {
    margin: 0
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const primaryButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Notification Settings</h3>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={modalContentStyle}>
          <div style={settingsSectionStyle}>
            <h4 style={settingsTitleStyle}>Order Notifications</h4>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="newOrders"
                  checked={notificationSettings.newOrders}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                New Orders
              </label>
              <span style={settingDescriptionStyle}>Get notified when new orders are received</span>
            </div>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="orderReady"
                  checked={notificationSettings.orderReady}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Order Ready
              </label>
              <span style={settingDescriptionStyle}>Get notified when orders are ready for pickup/delivery</span>
            </div>
          </div>

          <div style={settingsSectionStyle}>
            <h4 style={settingsTitleStyle}>Inventory Notifications</h4>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="lowStock"
                  checked={notificationSettings.lowStock}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Low Stock Alerts
              </label>
              <span style={settingDescriptionStyle}>Get notified when medicines are running low</span>
            </div>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="expiringMedicines"
                  checked={notificationSettings.expiringMedicines}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Expiring Medicines
              </label>
              <span style={settingDescriptionStyle}>Get notified when medicines are about to expire</span>
            </div>
          </div>

          <div style={settingsSectionStyle}>
            <h4 style={settingsTitleStyle}>Prescription Notifications</h4>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="prescriptionVerification"
                  checked={notificationSettings.prescriptionVerification}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Prescription Verification
              </label>
              <span style={settingDescriptionStyle}>Get notified when new prescriptions are uploaded</span>
            </div>
          </div>

          <div style={settingsSectionStyle}>
            <h4 style={settingsTitleStyle}>Notification Methods</h4>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="soundEnabled"
                  checked={notificationSettings.soundEnabled}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Sound Alerts
              </label>
              <span style={settingDescriptionStyle}>Play sound for notifications</span>
            </div>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Push Notifications
              </label>
              <span style={settingDescriptionStyle}>Show browser push notifications</span>
            </div>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                Email Notifications
              </label>
              <span style={settingDescriptionStyle}>Receive notifications via email</span>
            </div>
            <div style={settingItemStyle}>
              <label style={checkboxLabelStyle}>
                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onChange={handleChange}
                  style={checkboxStyle}
                />
                SMS Notifications
              </label>
              <span style={settingDescriptionStyle}>Receive notifications via SMS</span>
            </div>
          </div>
        </div>
        <div style={modalActionsStyle}>
          <button 
            style={secondaryButtonStyle}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={onSave}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationsBellModal = ({ show, onClose, notifications, onClearAll }) => {
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '400px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const notificationHeaderActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const clearAllButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '8px'
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const noNotificationsStyle = {
    textAlign: 'center',
    padding: '40px 20px'
  };

  const noNotificationsIconStyle = {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  };

  const noNotificationsTextStyle = {
    color: '#6b7280',
    fontSize: '16px',
    margin: 0
  };

  const notificationsListStyle = {
    maxHeight: '400px',
    overflowY: 'auto'
  };

  const notificationItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '8px',
    backgroundColor: '#f8fafc'
  };

  const notificationIconStyle = {
    fontSize: '20px',
    marginRight: '12px',
    marginTop: '2px'
  };

  const notificationContentStyle = {
    flex: 1
  };

  const notificationTitleStyle = {
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    fontSize: '14px'
  };

  const notificationMessageStyle = {
    color: '#6b7280',
    margin: '0 0 4px 0',
    fontSize: '13px'
  };

  const notificationTimeStyle = {
    color: '#9ca3af',
    fontSize: '11px'
  };

  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Notifications</h3>
          <div style={notificationHeaderActionsStyle}>
            {notifications.length > 0 && (
              <button 
                style={clearAllButtonStyle}
                onClick={onClearAll}
              >
                Clear All
              </button>
            )}
            <button 
              style={closeButtonStyle}
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        <div style={modalContentStyle}>
          {notifications.length === 0 ? (
            <div style={noNotificationsStyle}>
              <div style={noNotificationsIconStyle}>🔔</div>
              <p style={noNotificationsTextStyle}>No new notifications</p>
            </div>
          ) : (
            <div style={notificationsListStyle}>
              {notifications.map((notification, index) => (
                <div key={index} style={notificationItemStyle}>
                  <div style={notificationIconStyle}>
                    {notification.type === 'order' && '📦'}
                    {notification.type === 'prescription' && '🩺'}
                    {notification.type === 'stock' && '⚠️'}
                    {notification.type === 'system' && '🔔'}
                  </div>
                  <div style={notificationContentStyle}>
                    <p style={notificationTitleStyle}>{notification.title}</p>
                    <p style={notificationMessageStyle}>{notification.message}</p>
                    <span style={notificationTimeStyle}>{notification.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatModal = ({ show, onClose, chatMessages, newMessage, setNewMessage, onSendMessage }) => {
  const chatContentRef = React.useRef(null);

  React.useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  const chatModalStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '350px',
    height: '500px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e5e7eb',
    '@media (max-width: 768px)': {
      width: '90vw',
      height: '70vh',
      bottom: '10px',
      right: '5vw'
    }
  };

  const chatHeaderStyle = {
    padding: '16px',
    backgroundColor: '#7C2A62',
    color: 'white',
    borderRadius: '12px 12px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const chatTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: 'white'
  };

  const chatContentStyle = {
    flex: 1,
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#f8fafc'
  };

  const chatMessageStyle = {
    padding: '8px 12px',
    borderRadius: '12px',
    maxWidth: '80%',
    fontSize: '14px',
    wordWrap: 'break-word'
  };

  const userMessageStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    alignSelf: 'flex-end'
  };

  const botMessageStyle = {
    backgroundColor: 'white',
    color: '#374151',
    alignSelf: 'flex-start',
    border: '1px solid #e5e7eb'
  };

  const chatInputContainerStyle = {
    display: 'flex',
    padding: '12px',
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white',
    borderRadius: '0 0 12px 12px'
  };

  const chatInputStyle = {
    flex: 1,
    padding: '8px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    marginRight: '8px'
  };

  const primaryButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  if (!show) return null;

  return (
    <div style={chatModalStyle}>
      <div style={chatHeaderStyle}>
        <h3 style={chatTitleStyle}>QuickMed Support</h3>
        <button 
          style={closeButtonStyle}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div ref={chatContentRef} style={chatContentStyle}>
        {chatMessages.map(message => (
          <div
            key={message.id}
            style={{
              ...chatMessageStyle,
              ...(message.isUser ? userMessageStyle : botMessageStyle)
            }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div style={chatInputContainerStyle}>
        <input
          type="text"
          style={chatInputStyle}
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          style={primaryButtonStyle}
          onClick={onSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const LogoutConfirmationModal = ({ show, onClose, onConfirm }) => {
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: 0,
    width: '400px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  };

  const modalHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const modalTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const closeButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#6b7280'
  };

  const modalContentStyle = {
    padding: '20px'
  };

  const confirmationTextStyle = {
    fontSize: '16px',
    color: '#6b7280',
    textAlign: 'center',
    margin: '20px 0'
  };

  const modalActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const dangerButtonStyle = {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  if (!show) return null;

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <div style={modalHeaderStyle}>
          <h3 style={modalTitleStyle}>Confirm Logout</h3>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div style={modalContentStyle}>
          <p style={confirmationTextStyle}>
            Are you sure you want to logout from the vendor dashboard?
          </p>
        </div>
        <div style={modalActionsStyle}>
          <button 
            style={secondaryButtonStyle}
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            style={dangerButtonStyle}
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const VendorModals = ({
  showAddMedicineModal,
  setShowAddMedicineModal,
  showEditStockModal,
  setShowEditStockModal,
  showProfileModal,
  setShowProfileModal,
  showNotificationsModal,
  setShowNotificationsModal,
  showNotificationsBellModal,
  setShowNotificationsBellModal,
  showChatModal,
  setShowChatModal,
  showLogoutModal,
  setShowLogoutModal,
  newMedicine,
  setNewMedicine,
  editingMedicine,
  setEditingMedicine,
  userProfile,
  setUserProfile,
  notificationSettings,
  setNotificationSettings,
  notifications,
  chatMessages,
  newMessage,
  setNewMessage,
  formErrors,
  validateField,
  handleAddMedicine,
  handleUpdateStock,
  handleProfileUpdate,
  handleSaveNotificationSettings,
  handleClearAllNotifications,
  handleSendMessage,
  confirmLogout
}) => {
  return (
    <>
      <AddMedicineModal
        show={showAddMedicineModal}
        onClose={() => setShowAddMedicineModal(false)}
        onAdd={handleAddMedicine}
        newMedicine={newMedicine}
        setNewMedicine={setNewMedicine}
      />

      <EditStockModal
        show={showEditStockModal}
        onClose={() => setShowEditStockModal(false)}
        onUpdate={handleUpdateStock}
        editingMedicine={editingMedicine}
        setEditingMedicine={setEditingMedicine}
      />

      <ProfileModal
        show={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        onUpdate={handleProfileUpdate}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        formErrors={formErrors}
        validateField={validateField}
      />

      <NotificationsModal
        show={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
        onSave={handleSaveNotificationSettings}
        notificationSettings={notificationSettings}
        setNotificationSettings={setNotificationSettings}
      />

      <NotificationsBellModal
        show={showNotificationsBellModal}
        onClose={() => setShowNotificationsBellModal(false)}
        notifications={notifications}
        onClearAll={handleClearAllNotifications}
      />

      <ChatModal
        show={showChatModal}
        onClose={() => setShowChatModal(false)}
        chatMessages={chatMessages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
      />

      <LogoutConfirmationModal
        show={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default VendorModals;