import React, { useState, useEffect } from 'react';

const ReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockReviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent service! Quick delivery and genuine medicines.',
      date: '2024-01-15',
      status: 'pending',
      userType: 'Customer'
    },
    {
      id: 2,
      user: 'Sarah Smith',
      rating: 4,
      comment: 'Good experience overall. Would recommend to others.',
      date: '2024-01-14',
      status: 'approved',
      userType: 'Customer'
    },
    {
      id: 3,
      user: 'Mike Johnson',
      rating: 3,
      comment: 'Average service. Delivery was a bit delayed.',
      date: '2024-01-13',
      status: 'rejected',
      userType: 'Customer'
    },
    {
      id: 4,
      user: 'Dr. Robert Brown',
      rating: 5,
      comment: 'Great platform for telemedicine consultations.',
      date: '2024-01-12',
      status: 'pending',
      userType: 'Doctor'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'approved' } : review
    ));
    // Here you would make an API call to update the review status
  };

  const handleReject = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'rejected' } : review
    ));
    // Here you would make an API call to update the review status
  };

  const handlePending = (reviewId) => {
    setReviews(reviews.map(review => 
      review.id === reviewId ? { ...review, status: 'pending' } : review
    ));
    // Here you would make an API call to update the review status
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: '#FFA500',
      approved: '#28A745',
      rejected: '#DC3545'
    };
    
    return (
      <span style={{
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        backgroundColor: statusColors[status],
        color: 'white'
      }}>
        {status.toUpperCase()}
      </span>
    );
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const ReviewCard = ({ review, showPendingButton = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardStyle = {
      border: '1px solid #DEE2E6',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      backgroundColor: '#F8F9FA',
      transition: 'all 0.3s ease',
      transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      borderLeft: `4px solid ${
        review.status === 'approved' ? '#28A745' : 
        review.status === 'rejected' ? '#DC3545' : '#FFA500'
      }`
    };

    const approvedCardStyle = {
      ...cardStyle,
      border: '1px solid #D4EDDA',
      backgroundColor: '#F8FFF9'
    };

    const rejectedCardStyle = {
      ...cardStyle,
      border: '1px solid #F8D7DA',
      backgroundColor: '#FFF5F5'
    };

    const getCardStyle = () => {
      if (review.status === 'approved') return approvedCardStyle;
      if (review.status === 'rejected') return rejectedCardStyle;
      return cardStyle;
    };

    const buttonStyle = {
      padding: '8px 16px',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      fontSize: '14px'
    };

    const approveButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#28A745'
    };

    const rejectButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#DC3545'
    };

    const pendingButtonStyle = {
      ...buttonStyle,
      backgroundColor: '#FFA500'
    };

    const handleButtonHover = (e, isHover) => {
      e.target.style.transform = isHover ? 'scale(1.05)' : 'scale(1)';
      e.target.style.boxShadow = isHover ? '0 2px 8px rgba(0,0,0,0.2)' : 'none';
    };

    return (
      <div 
        style={getCardStyle()} 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <div>
            <strong style={{ fontSize: '16px' }}>{review.user}</strong>
            <span style={{ 
              marginLeft: '10px', 
              padding: '2px 8px', 
              backgroundColor: '#E9ECEF', 
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {review.userType}
            </span>
            <div style={{ marginTop: '8px', fontSize: '16px' }}>
              {getRatingStars(review.rating)}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: '#6C757D', marginBottom: '5px' }}>{review.date}</div>
            {getStatusBadge(review.status)}
          </div>
        </div>

        <p style={{ 
          margin: '10px 0', 
          lineHeight: '1.5',
          color: '#333'
        }}>
          {review.comment}
        </p>

        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'flex-end', 
          flexWrap: 'wrap',
          marginTop: '15px'
        }}>
          {review.status === 'pending' ? (
            <>
              <button
                onClick={() => handleApprove(review.id)}
                style={approveButtonStyle}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(review.id)}
                style={rejectButtonStyle}
                onMouseEnter={(e) => handleButtonHover(e, true)}
                onMouseLeave={(e) => handleButtonHover(e, false)}
              >
                Reject
              </button>
            </>
          ) : (
            <>
              {showPendingButton && (
                <button
                  onClick={() => handlePending(review.id)}
                  style={pendingButtonStyle}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  Mark as Pending
                </button>
              )}
              {review.status === 'approved' ? (
                <button
                  onClick={() => handleReject(review.id)}
                  style={rejectButtonStyle}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  Reject
                </button>
              ) : (
                <button
                  onClick={() => handleApprove(review.id)}
                  style={approveButtonStyle}
                  onMouseEnter={(e) => handleButtonHover(e, true)}
                  onMouseLeave={(e) => handleButtonHover(e, false)}
                >
                  Approve
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const pendingReviews = reviews.filter(review => review.status === 'pending');
  const approvedReviews = reviews.filter(review => review.status === 'approved');
  const rejectedReviews = reviews.filter(review => review.status === 'rejected');

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        fontSize: '18px', 
        color: '#6C757D' 
      }}>
        Loading reviews...
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#333', marginBottom: '10px', fontSize: '28px' }}>Reviews Management</h2>
      <p style={{ color: '#6C757D', marginBottom: '30px', fontSize: '16px' }}>
        Manage and moderate user reviews. Approve, reject, or change review status as needed.
      </p>
      
      {/* Statistics */}
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#FFF3CD',
          borderRadius: '8px',
          flex: '1',
          minWidth: '200px',
          textAlign: 'center',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ margin: 0, color: '#856404', fontSize: '24px' }}>{pendingReviews.length}</h3>
          <p style={{ margin: 0, color: '#856404', fontWeight: '500' }}>Pending Reviews</p>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#D4EDDA',
          borderRadius: '8px',
          flex: '1',
          minWidth: '200px',
          textAlign: 'center',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ margin: 0, color: '#155724', fontSize: '24px' }}>{approvedReviews.length}</h3>
          <p style={{ margin: 0, color: '#155724', fontWeight: '500' }}>Approved Reviews</p>
        </div>
        <div style={{
          padding: '20px',
          backgroundColor: '#F8D7DA',
          borderRadius: '8px',
          flex: '1',
          minWidth: '200px',
          textAlign: 'center',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <h3 style={{ margin: 0, color: '#721C24', fontSize: '24px' }}>{rejectedReviews.length}</h3>
          <p style={{ margin: 0, color: '#721C24', fontWeight: '500' }}>Rejected Reviews</p>
        </div>
      </div>

      {/* Pending Reviews Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#856404', 
          paddingBottom: '10px', 
          borderBottom: '2px solid #FFF3CD',
          marginBottom: '20px',
          fontSize: '20px'
        }}>
          ⏳ Pending Approval ({pendingReviews.length})
        </h3>
        {pendingReviews.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6C757D', 
            padding: '40px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            border: '1px dashed #DEE2E6'
          }}>
            No pending reviews for approval
          </div>
        ) : (
          pendingReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>

      {/* Approved Reviews Section */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          color: '#155724', 
          paddingBottom: '10px', 
          borderBottom: '2px solid #D4EDDA',
          marginBottom: '20px',
          fontSize: '20px'
        }}>
          ✅ Approved Reviews ({approvedReviews.length})
        </h3>
        {approvedReviews.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6C757D', 
            padding: '40px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            border: '1px dashed #DEE2E6'
          }}>
            No approved reviews yet
          </div>
        ) : (
          approvedReviews.map(review => (
            <ReviewCard key={review.id} review={review} showPendingButton={true} />
          ))
        )}
      </div>

      {/* Rejected Reviews Section */}
      <div>
        <h3 style={{ 
          color: '#721C24', 
          paddingBottom: '10px', 
          borderBottom: '2px solid #F8D7DA',
          marginBottom: '20px',
          fontSize: '20px'
        }}>
          ❌ Rejected Reviews ({rejectedReviews.length})
        </h3>
        {rejectedReviews.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#6C757D', 
            padding: '40px',
            backgroundColor: '#F8F9FA',
            borderRadius: '8px',
            border: '1px dashed #DEE2E6'
          }}>
            No rejected reviews
          </div>
        ) : (
          rejectedReviews.map(review => (
            <ReviewCard key={review.id} review={review} showPendingButton={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsManagement;