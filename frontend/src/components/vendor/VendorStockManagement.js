import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, onClearSearch, filteredStock }) => {
  const searchContainerStyle = {
    marginBottom: '24px'
  };

  const searchInputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px',
    transition: 'border-color 0.3s ease'
  };

  const searchInputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    padding: '4px 0'
  };

  const clearSearchButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#6b7280',
    fontSize: '16px',
    padding: '4px'
  };

  const searchResultsInfoStyle = {
    marginTop: '8px',
    fontSize: '14px',
    color: '#6b7280'
  };

  return (
    <div style={searchContainerStyle}>
      <div style={searchInputContainerStyle}>
        <input
          type="text"
          style={searchInputStyle}
          placeholder="Search medicines by name, category, or batch number..."
          value={searchTerm}
          onChange={onSearchChange}
        />
        {searchTerm && (
          <button 
            style={clearSearchButtonStyle}
            onClick={onClearSearch}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div style={searchResultsInfoStyle}>
          Found {filteredStock.length} medicine(s) matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

const VendorStockManagement = ({
  userProfile,
  stockFilter,
  stock,
  searchTerm,
  filteredStock,
  stockFilters,
  formatIndianCurrency,
  getCurrentGreeting,
  isLowStock,
  isExpiringSoon,
  isExpired,
  handleSearchChange,
  handleClearSearch,
  handleEditMedicine,
  setShowAddMedicineModal,
  setShowNotificationsBellModal,
  notifications,
  setStockFilter
}) => {
  const mainContentStyle = {
    padding: '24px',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '15px'
    }
  };

  const headerActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'space-between'
    }
  };

  const notificationBellStyle = {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const notificationBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  };

  const greetingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    '@media (max-width: 768px)': {
      fontSize: '24px'
    }
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
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

  const filterTabsStyle = {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  };

  const filterTabStyle = {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  const filterTabActiveStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginBottom: '30px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (max-width: 480px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  };

  const statIconStyle = {
    fontSize: '24px',
    marginRight: '16px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px'
  };

  const statContentStyle = {
    flex: 1
  };

  const statNumberStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  };

  const statLabelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const viewAllStyle = {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const tableContainerStyle = {
    overflowX: 'auto'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: '800px'
  };

  const tableHeaderStyle = {
    backgroundColor: '#f8fafc',
    borderBottom: '2px solid #e5e7eb'
  };

  const tableRowStyle = {
    borderBottom: '1px solid #e5e7eb',
    transition: 'background-color 0.2s ease'
  };

  const tableCellStyle = {
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px'
  };

  const medicineInfoStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  };

  const batchNoStyle = {
    fontSize: '12px',
    color: '#6b7280'
  };

  const quantityStyle = {
    fontWeight: '600'
  };

  const lowStockStyle = {
    color: '#EF4444'
  };

  const expiringSoonStyle = {
    color: '#F59E0B'
  };

  const expiredStyle = {
    color: '#EF4444',
    fontWeight: '600'
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: '4px',
    flexWrap: 'wrap'
  };

  const smallButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '8px'
  };

  const noResultsStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280'
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

  return (
    <div style={mainContentStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>{getCurrentGreeting()}, {userProfile.fullName?.split(' ')[0] || 'User'}</h1>
          <p style={subtitleStyle}>Manage your medicine inventory and stock levels</p>
        </div>
        <div style={headerActionsStyle}>
          <button 
            style={notificationBellStyle}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={notificationBadgeStyle}>
                {notifications.length}
              </span>
            )}
          </button>
          <button 
            style={primaryButtonStyle}
            onClick={() => setShowAddMedicineModal(true)}
          >
            + Add Medicine
          </button>
        </div>
      </div>

      <div style={filterTabsStyle}>
        {stockFilters.map(filter => (
          <button
            key={filter.id}
            style={{
              ...filterTabStyle,
              ...(stockFilter === filter.id ? filterTabActiveStyle : {})
            }}
            onClick={() => setStockFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={{...statIconStyle, backgroundColor: '#F7D9EB'}}>📦</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>{stock.length}</h3>
            <p style={statLabelStyle}>Total Medicines</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{...statIconStyle, backgroundColor: '#FFE4E6'}}>⚠️</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>
              {stock.filter(isLowStock).length}
            </h3>
            <p style={statLabelStyle}>Low Stock</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{...statIconStyle, backgroundColor: '#FEF3C7'}}>📅</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>
              {stock.filter(isExpiringSoon).length}
            </h3>
            <p style={statLabelStyle}>Expiring Soon</p>
          </div>
        </div>

        <div style={statCardStyle}>
          <div style={{...statIconStyle, backgroundColor: '#D1FAE5'}}>🩺</div>
          <div style={statContentStyle}>
            <h3 style={statNumberStyle}>
              {stock.filter(m => m.prescriptionRequired).length}
            </h3>
            <p style={statLabelStyle}>Prescription Only</p>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Medicine Inventory</h2>
          <span style={viewAllStyle}>{filteredStock.length} items</span>
        </div>

        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          filteredStock={filteredStock}
        />

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={tableCellStyle}>Medicine Name</th>
                <th style={tableCellStyle}>Category</th>
                <th style={tableCellStyle}>Quantity</th>
                <th style={tableCellStyle}>Price</th>
                <th style={tableCellStyle}>Expiry Date</th>
                <th style={tableCellStyle}>Prescription</th>
                <th style={tableCellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map(medicine => (
                <tr key={medicine.id} style={tableRowStyle}>
                  <td style={tableCellStyle}>
                    <div style={medicineInfoStyle}>
                      <strong>{medicine.name}</strong>
                      <span style={batchNoStyle}>{medicine.batchNo}</span>
                    </div>
                  </td>
                  <td style={tableCellStyle}>{medicine.category}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      ...quantityStyle,
                      ...(isLowStock(medicine) ? lowStockStyle : {})
                    }}>
                      {medicine.quantity}
                      {isLowStock(medicine) && ' ⚠️'}
                    </span>
                  </td>
                  <td style={tableCellStyle}>{formatIndianCurrency(medicine.price)}</td>
                  <td style={tableCellStyle}>
                    <span style={{
                      ...(isExpired(medicine) ? expiredStyle : {}),
                      ...(isExpiringSoon(medicine) && !isExpired(medicine) ? expiringSoonStyle : {})
                    }}>
                      {medicine.expiryDate}
                      {isExpired(medicine) && ' 🔴'}
                      {isExpiringSoon(medicine) && !isExpired(medicine) && ' 🟡'}
                    </span>
                  </td>
                  <td style={tableCellStyle}>
                    {medicine.prescriptionRequired ? 'Yes' : 'No'}
                  </td>
                  <td style={tableCellStyle}>
                    <div style={actionButtonsStyle}>
                      <button 
                        style={smallButtonStyle}
                        onClick={() => handleEditMedicine(medicine)}
                      >
                        Update Stock
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStock.length === 0 && (
          <div style={noResultsStyle}>
            <p>No medicines found matching your search criteria.</p>
            {searchTerm && (
              <button 
                style={secondaryButtonStyle}
                onClick={handleClearSearch}
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorStockManagement;