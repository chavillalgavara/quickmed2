import React, { useState, useEffect } from 'react';

const TimeSlotsContent = ({ state, actions }) => {
  const { timeslots } = state;
  const { 
    setTimeslots, 
    addTimeslot, 
    updateTimeslot, 
    deleteTimeslot,
    toggleTimeslotAvailability 
  } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const [newSlot, setNewSlot] = useState({
    date: '',
    startTime: '09:00',
    endTime: '17:00',
    duration: 30
  });

  const [editingSlot, setEditingSlot] = useState(null);
  const [availabilityStatus, setAvailabilityStatus] = useState({});
  const [showAvailabilityToggle, setShowAvailabilityToggle] = useState(false);

  // Initialize availability status
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const status = {};
    const dates = [...new Set(timeslots.map(slot => slot.date))];
    dates.forEach(date => {
      status[date] = date === today ? true : Math.random() > 0.3;
    });
    setAvailabilityStatus(status);
  }, [timeslots]);

  // Generate time slots for the next 7 days
  const generateDefaultSlots = () => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      // Generate slots from 9 AM to 5 PM with 30-minute intervals
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const endHour = minute === 30 ? hour + 1 : hour;
          const endMinute = minute === 30 ? 0 : 30;
          const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
          
          slots.push({
            id: `${dateString}-${startTime}`,
            date: dateString,
            startTime,
            endTime,
            duration: 30,
            isAvailable: true,
            isBooked: Math.random() > 0.7 // Randomly mark some as booked for demo
          });
        }
      }
    }
    
    return slots;
  };

  useEffect(() => {
    if (timeslots.length === 0) {
      setTimeslots(generateDefaultSlots());
    }
  }, []);

  const handleAddSlot = () => {
    if (newSlot.date && newSlot.startTime && newSlot.endTime) {
      const slot = {
        id: `${newSlot.date}-${newSlot.startTime}`,
        ...newSlot,
        isAvailable: true,
        isBooked: false
      };
      addTimeslot(slot);
      setNewSlot({
        date: '',
        startTime: '09:00',
        endTime: '17:00',
        duration: 30
      });
    }
  };

  const handleEditSlot = (slot) => {
    setEditingSlot({ ...slot });
  };

  const handleUpdateSlot = () => {
    if (editingSlot) {
      updateTimeslot(editingSlot);
      setEditingSlot(null);
    }
  };

  const toggleDateAvailability = (date) => {
    setAvailabilityStatus(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  const getSlotsByDate = () => {
    const slotsByDate = {};
    timeslots.forEach(slot => {
      if (!slotsByDate[slot.date]) {
        slotsByDate[slot.date] = [];
      }
      slotsByDate[slot.date].push(slot);
    });
    return slotsByDate;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date().toISOString().split('T')[0];
    const isToday = dateString === today;
    
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      isToday,
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  };

  const getStatusColor = (slot) => {
    if (slot.isBooked) return '#EF4444'; // Red for booked
    if (!slot.isAvailable) return '#9CA3AF'; // Gray for unavailable
    return '#10B981'; // Green for available
  };

  const getStatusText = (slot) => {
    if (slot.isBooked) return 'Booked';
    if (!slot.isAvailable) return 'Unavailable';
    return 'Available';
  };

  const TimeSlotCard = ({ slot }) => (
    <div style={{
      ...styles.timeSlotCard,
      borderLeft: `4px solid ${getStatusColor(slot)}`,
      opacity: !availabilityStatus[slot.date] ? 0.5 : 1
    }}>
      <div style={styles.slotTime}>
        <strong>{slot.startTime} - {slot.endTime}</strong>
        <span style={styles.slotDuration}>{slot.duration} mins</span>
      </div>
      <div style={styles.slotStatus}>
        <span style={{
          ...styles.statusBadge,
          backgroundColor: getStatusColor(slot)
        }}>
          {getStatusText(slot)}
        </span>
      </div>
      <div style={styles.slotActions}>
        <button 
          style={styles.smallButton}
          onClick={() => toggleTimeslotAvailability(slot.id)}
          disabled={slot.isBooked || !availabilityStatus[slot.date]}
        >
          {slot.isAvailable ? 'Mark Busy' : 'Mark Free'}
        </button>
        <button 
          style={styles.editButton}
          onClick={() => handleEditSlot(slot)}
          disabled={!availabilityStatus[slot.date]}
        >
          Edit
        </button>
        <button 
          style={styles.deleteButton}
          onClick={() => deleteTimeslot(slot.id)}
          disabled={slot.isBooked}
        >
          Delete
        </button>
      </div>
    </div>
  );

  const DateSection = ({ date, slots }) => {
    const formattedDate = formatDate(date);
    const isAvailable = availabilityStatus[date];
    
    return (
      <div style={styles.dateSection}>
        <div style={styles.dateHeader}>
          <div style={styles.dateInfo}>
            <h3 style={styles.dateTitle}>
              {formattedDate.full}
              {formattedDate.isToday && <span style={styles.todayBadge}>Today</span>}
            </h3>
            <span style={styles.slotCount}>{slots.length} slots</span>
          </div>
          <div style={styles.availabilityControl}>
            <button
              style={{
                ...styles.availabilityButton,
                ...(isAvailable ? styles.availableButton : styles.unavailableButton)
              }}
              onClick={() => toggleDateAvailability(date)}
            >
              {isAvailable ? '✅ Available' : '❌ Unavailable'}
            </button>
          </div>
        </div>
        
        {!isAvailable && (
          <div style={styles.unavailableNotice}>
            <span style={styles.unavailableIcon}>🚫</span>
            <span>Not available for appointments on this day</span>
          </div>
        )}
        
        <div style={{
          ...styles.slotsGrid,
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
          opacity: isAvailable ? 1 : 0.6
        }}>
          {slots.map(slot => (
            <TimeSlotCard key={slot.id} slot={slot} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Time Slots Management</h1>
          <p style={styles.subtitle}>Manage your availability and appointment slots</p>
        </div>
        
        <button
          style={styles.availabilityToggleButton}
          onClick={() => setShowAvailabilityToggle(!showAvailabilityToggle)}
        >
          {showAvailabilityToggle ? '📅 Hide Availability' : '📅 Quick Availability'}
        </button>
      </div>

      {/* Quick Availability Toggle */}
      {showAvailabilityToggle && (
        <div style={styles.quickAvailability}>
          <h3 style={styles.sectionTitle}>Quick Availability Settings</h3>
          <div style={styles.availabilityGrid}>
            {Object.entries(getSlotsByDate()).slice(0, 7).map(([date, slots]) => {
              const formattedDate = formatDate(date);
              const isAvailable = availabilityStatus[date];
              
              return (
                <div key={date} style={styles.availabilityItem}>
                  <span style={styles.availabilityDate}>
                    {formattedDate.dayName}
                    <br />
                    <small>{date}</small>
                  </span>
                  <button
                    style={{
                      ...styles.quickToggleButton,
                      ...(isAvailable ? styles.quickAvailable : styles.quickUnavailable)
                    }}
                    onClick={() => toggleDateAvailability(date)}
                  >
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Slot Form */}
      <div style={styles.addSlotSection}>
        <h3 style={styles.sectionTitle}>Add New Time Slot</h3>
        <div style={{
          ...styles.addSlotForm,
          flexDirection: isMobile ? 'column' : 'row'
        }}>
          <input
            type="date"
            value={newSlot.date}
            onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
            style={styles.input}
            min={new Date().toISOString().split('T')[0]}
          />
          <input
            type="time"
            value={newSlot.startTime}
            onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
            style={styles.input}
          />
          <input
            type="time"
            value={newSlot.endTime}
            onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
            style={styles.input}
          />
          <select
            value={newSlot.duration}
            onChange={(e) => setNewSlot({...newSlot, duration: parseInt(e.target.value)})}
            style={styles.select}
          >
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
          <button 
            style={styles.primaryButton}
            onClick={handleAddSlot}
            disabled={!newSlot.date}
          >
            Add Slot
          </button>
        </div>
      </div>

      {/* Edit Slot Modal */}
      {editingSlot && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>Edit Time Slot</h3>
            <div style={styles.modalForm}>
              <div style={styles.formRow}>
                <label style={styles.label}>Date:</label>
                <input
                  type="date"
                  value={editingSlot.date}
                  onChange={(e) => setEditingSlot({...editingSlot, date: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Start Time:</label>
                <input
                  type="time"
                  value={editingSlot.startTime}
                  onChange={(e) => setEditingSlot({...editingSlot, startTime: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>End Time:</label>
                <input
                  type="time"
                  value={editingSlot.endTime}
                  onChange={(e) => setEditingSlot({...editingSlot, endTime: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Duration (minutes):</label>
                <select
                  value={editingSlot.duration}
                  onChange={(e) => setEditingSlot({...editingSlot, duration: parseInt(e.target.value)})}
                  style={styles.select}
                >
                  <option value={15}>15</option>
                  <option value={30}>30</option>
                  <option value={45}>45</option>
                  <option value={60}>60</option>
                </select>
              </div>
            </div>
            <div style={styles.modalActions}>
              <button 
                style={styles.secondaryButton}
                onClick={() => setEditingSlot(null)}
              >
                Cancel
              </button>
              <button 
                style={styles.primaryButton}
                onClick={handleUpdateSlot}
              >
                Update Slot
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Slots Overview */}
      <div style={styles.slotsOverview}>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {timeslots.filter(slot => slot.isAvailable && !slot.isBooked && availabilityStatus[slot.date]).length}
            </h3>
            <p style={styles.statLabel}>Available Slots</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {timeslots.filter(slot => slot.isBooked).length}
            </h3>
            <p style={styles.statLabel}>Booked Slots</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {timeslots.filter(slot => !slot.isAvailable).length}
            </h3>
            <p style={styles.statLabel}>Busy Slots</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>
              {Object.keys(getSlotsByDate()).filter(date => availabilityStatus[date]).length}
            </h3>
            <p style={styles.statLabel}>Available Days</p>
          </div>
        </div>

        {/* Slots by Date */}
        <div style={styles.slotsByDate}>
          <h3 style={styles.sectionTitle}>Your Time Slots</h3>
          {Object.entries(getSlotsByDate())
            .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
            .map(([date, slots]) => (
              <DateSection key={date} date={date} slots={slots} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  availabilityToggleButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0
  },
  quickAvailability: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px',
    textAlign: 'left'
  },
  availabilityGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  availabilityItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px'
  },
  availabilityDate: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937'
  },
  quickToggleButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '80px'
  },
  quickAvailable: {
    backgroundColor: '#10B981',
    color: 'white'
  },
  quickUnavailable: {
    backgroundColor: '#EF4444',
    color: 'white'
  },
  addSlotSection: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px',
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0',
    textAlign: 'left'
  },
  addSlotForm: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-end',
    flexWrap: 'wrap'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1,
    minWidth: '120px'
  },
  select: {
    padding: '10px 12px',
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    fontSize: '14px',
    flex: 1,
    minWidth: '120px'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '2px solid #e5e7eb',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0
  },
  slotsOverview: {
    textAlign: 'left'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    margin: '0 0 8px 0'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  slotsByDate: {
    textAlign: 'left'
  },
  dateSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  },
  dateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  dateInfo: {
    flex: 1
  },
  dateTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  todayBadge: {
    backgroundColor: '#7C2A62',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500'
  },
  slotCount: {
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '12px'
  },
  availabilityControl: {
    flexShrink: 0
  },
  availabilityButton: {
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '120px'
  },
  availableButton: {
    backgroundColor: '#10B981',
    color: 'white'
  },
  unavailableButton: {
    backgroundColor: '#EF4444',
    color: 'white'
  },
  unavailableNotice: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    borderRadius: '6px',
    marginBottom: '16px',
    color: '#DC2626',
    fontSize: '14px'
  },
  unavailableIcon: {
    fontSize: '16px'
  },
  slotsGrid: {
    display: 'grid',
    gap: '12px',
    transition: 'opacity 0.3s ease'
  },
  timeSlotCard: {
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease'
  },
  slotTime: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  slotDuration: {
    fontSize: '12px',
    color: '#6b7280',
    backgroundColor: '#e5e7eb',
    padding: '2px 6px',
    borderRadius: '8px'
  },
  slotStatus: {
    marginBottom: '12px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  slotActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  smallButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    flex: 1
  },
  editButton: {
    backgroundColor: 'transparent',
    color: '#F59E0B',
    border: '1px solid #F59E0B',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    flex: 1
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#EF4444',
    border: '1px solid #EF4444',
    padding: '6px 10px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    flex: 1
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflow: 'auto'
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 20px 0'
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '20px'
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  }
};

export default TimeSlotsContent;