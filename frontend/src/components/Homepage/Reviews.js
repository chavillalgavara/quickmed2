// import React, { useState, useEffect } from 'react';

// const Reviews = ({ onWriteReview, reviews: propReviews }) => {
//   const [reviews, setReviews] = useState([]);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   // Use propReviews if provided, otherwise load from localStorage
//   useEffect(() => {
//     if (propReviews && propReviews.length > 0) {
//       setReviews(propReviews);
//     } else {
//       const savedReviews = localStorage.getItem('quickmed-reviews');
//       if (savedReviews) {
//         setReviews(JSON.parse(savedReviews));
//       } else {
//         // Initialize with default reviews if none exist
//         const defaultReviews = [
//           {
//             id: 1,
//             name: 'Rahul Sharma',
//             rating: 5,
//             date: '2024-01-15',
//             comment: 'QuickMed saved me during my emergency! The medicine delivery was super fast - received within 25 minutes. Highly recommended!',
//             avatar: 'RS'
//           },
//           {
//             id: 2,
//             name: 'Priya Patel',
//             rating: 4,
//             date: '2024-01-12',
//             comment: 'Excellent service! The doctor consultation was smooth and the medicine reached within 30 minutes as promised.',
//             avatar: 'PP'
//           },
//           {
//             id: 3,
//             name: 'Ankit Verma',
//             rating: 5,
//             date: '2024-01-10',
//             comment: 'Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.',
//             avatar: 'AV'
//           },
//           {
//             id: 4,
//             name: 'Sneha Reddy',
//             rating: 5,
//             date: '2024-01-08',
//             comment: '24/7 doctor consultation is a lifesaver! Got immediate help for my child fever at midnight.',
//             avatar: 'SR'
//           },
//           {
//             id: 5,
//             name: 'Vikram Singh',
//             rating: 4,
//             date: '2024-01-05',
//             comment: 'Great platform for medicine delivery. The delivery executive was very professional and polite.',
//             avatar: 'VS'
//           },
//           {
//             id: 6,
//             name: 'Meera Joshi',
//             rating: 5,
//             date: '2024-01-03',
//             comment: 'The OTC products section is very comprehensive. Found all my regular health supplements easily.',
//             avatar: 'MJ'
//           }
//         ];
//         setReviews(defaultReviews);
//         localStorage.setItem('quickmed-reviews', JSON.stringify(defaultReviews));
//       }
//     }
//   }, [propReviews]);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width <= 1024 && width > 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     // Add fade-in animation
//     setIsVisible(true);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   // Save reviews to localStorage whenever reviews change
//   useEffect(() => {
//     if (reviews.length > 0) {
//       localStorage.setItem('quickmed-reviews', JSON.stringify(reviews));
//     }
//   }, [reviews]);

//   // Calculate rating statistics
//   const calculateRatingStats = () => {
//     const totalReviews = reviews.length;
//     const averageRating = totalReviews > 0
//       ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
//       : '0.0';

//     const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
//     reviews.forEach(review => {
//       ratingDistribution[review.rating]++;
//     });

//     const ratingBars = [5, 4, 3, 2, 1].map(stars => ({
//       stars,
//       percentage: totalReviews > 0 ? Math.round((ratingDistribution[stars] / totalReviews) * 100) : 0,
//       count: ratingDistribution[stars]
//     }));

//     return { averageRating, ratingBars, totalReviews };
//   };

//   const { averageRating, ratingBars, totalReviews } = calculateRatingStats();

//   // Get reviews to display (show first 6 by default, or all if showAllReviews is true)
//   const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

//   const styles = {
//     // Main Reviews Section with Bubble Background
//     reviews: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
//       position: 'relative',
//       overflow: 'hidden',
//       padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
//     },
//     floatingElements: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 1,
//     },
//     floatingElement: {
//       position: 'absolute',
//       background: 'rgba(124, 42, 98, 0.1)',
//       borderRadius: '50%',
//       animation: 'float 6s ease-in-out infinite',
//     },
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       position: 'relative',
//       zIndex: 2,
//     },
//     sectionTitle: {
//       fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
//       textAlign: 'center',
//       marginBottom: '1rem',
//       color: '#7C2A62',
//       fontWeight: '700',
//       background: 'linear-gradient(45deg, #7C2A62, #9C3A7A)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out',
//     },
//     sectionSubtitle: {
//       fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//       textAlign: 'center',
//       marginBottom: isMobile ? '3rem' : '4rem',
//       color: '#666',
//       maxWidth: '600px',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.2s',
//     },
//     ratingSummary: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
//       gap: isMobile ? '2rem' : '3rem',
//       marginBottom: isMobile ? '3rem' : '4rem',
//       padding: isMobile ? '2rem' : '3rem',
//       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//       borderRadius: '20px',
//       boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
//       backdropFilter: 'blur(10px)',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.4s',
//     },
//     overallRating: {
//       textAlign: 'center',
//       padding: isMobile ? '1rem' : '2rem',
//     },
//     overallScore: {
//       fontSize: isMobile ? '3rem' : '4rem',
//       fontWeight: 'bold',
//       color: '#7C2A62',
//       margin: '0 0 1rem 0',
//       background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     starsLarge: {
//       fontSize: isMobile ? '1.5rem' : '2rem',
//       marginBottom: '1rem',
//     },
//     ratingCount: {
//       color: '#666',
//       fontSize: isMobile ? '1rem' : '1.1rem',
//     },
//     ratingBreakdown: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem',
//     },
//     ratingBar: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: isMobile ? '0.5rem' : '1rem',
//     },
//     barContainer: {
//       flex: 1,
//       height: '8px',
//       backgroundColor: '#e8e8e8',
//       borderRadius: '4px',
//       overflow: 'hidden',
//     },
//     barFill: {
//       height: '100%',
//       backgroundColor: '#7C2A62',
//       transition: 'width 0.5s ease-in-out',
//     },
//     reviewsGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
//       gap: isMobile ? '1.5rem' : '2rem',
//       marginBottom: '3rem',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.6s',
//     },
//     reviewsGridScrollable: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
//       gap: isMobile ? '1.5rem' : '2rem',
//       marginBottom: '3rem',
//       maxHeight: '600px',
//       overflowY: 'auto',
//       padding: '1rem',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.6s',
//     },
//     reviewCard: {
//       padding: isMobile ? '1.5rem' : '2rem',
//       backgroundColor: 'rgba(255, 255, 255, 0.9)',
//       borderRadius: '15px',
//       boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       backdropFilter: 'blur(10px)',
//       border: '2px solid transparent',
//     },
//     newReviewBadge: {
//       position: 'absolute',
//       top: '1rem',
//       right: '1rem',
//       backgroundColor: '#4CAF50',
//       color: 'white',
//       padding: '0.3rem 0.8rem',
//       borderRadius: '12px',
//       fontSize: '0.7rem',
//       fontWeight: 'bold',
//     },
//     reviewHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '1.5rem',
//       position: 'relative',
//       paddingRight: '70px',
//     },
//     reviewerInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//     },
//     avatar: {
//       width: isMobile ? '40px' : '50px',
//       height: isMobile ? '40px' : '50px',
//       borderRadius: '50%',
//       backgroundColor: '#F7D9EB',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       color: '#7C2A62',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       border: '2px solid #7C2A62',
//     },
//     reviewerName: {
//       margin: '0 0 0.5rem 0',
//       color: '#333',
//       fontSize: isMobile ? '1.1rem' : '1.2rem',
//       fontWeight: '600',
//     },
//     reviewStars: {
//       color: '#FFD700',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//     },
//     reviewDate: {
//       color: '#666',
//       fontSize: isMobile ? '0.8rem' : '0.9rem',
//       textAlign: 'right',
//       minWidth: isMobile ? '100px' : '120px',
//     },
//     reviewComment: {
//       color: '#333',
//       lineHeight: '1.6',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       margin: 0,
//     },
//     viewMoreButton: {
//       padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
//       backgroundColor: 'transparent',
//       border: '2px solid #7C2A62',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       fontWeight: 'bold',
//       color: '#7C2A62',
//       transition: 'all 0.3s ease',
//       margin: '0 auto 3rem',
//       display: 'block',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     addReviewSection: {
//       textAlign: 'center',
//       padding: isMobile ? '2rem' : '3rem',
//       backgroundColor: 'rgba(247, 217, 235, 0.8)',
//       borderRadius: '20px',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.8s',
//     },
//     addReviewTitle: {
//       fontSize: isMobile ? '1.5rem' : '2rem',
//       marginBottom: '1rem',
//       color: '#7C2A62',
//       fontWeight: '600',
//     },
//     addReviewText: {
//       color: '#666',
//       marginBottom: '2rem',
//       fontSize: isMobile ? '1rem' : '1.1rem',
//       maxWidth: '500px',
//       marginLeft: 'auto',
//       marginRight: 'auto',
//     },
//     addReviewButton: {
//       padding: isMobile ? '0.8rem 2rem' : '1rem 2.5rem',
//       backgroundColor: '#7C2A62',
//       border: 'none',
//       borderRadius: '25px',
//       cursor: 'pointer',
//       fontSize: isMobile ? '1rem' : '1.1rem',
//       fontWeight: 'bold',
//       color: 'white',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
//       position: 'relative',
//       overflow: 'hidden',
//     },
//     scrollIndicator: {
//       textAlign: 'center',
//       color: '#7C2A62',
//       fontSize: isMobile ? '0.8rem' : '0.9rem',
//       marginBottom: '1rem',
//       fontStyle: 'italic',
//     }
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       if (i <= rating) {
//         // Filled star (golden)
//         stars.push(
//           <span key={i} style={{ color: '#FFD700', fontSize: 'inherit' }}>
//             ⭐
//           </span>
//         );
//       } else {
//         // Empty star (gray)
//         stars.push(
//           <span key={i} style={{ color: '#DDDDDD', fontSize: 'inherit' }}>
//             ☆
//           </span>
//         );
//       }
//     }
//     return <div style={{ display: 'inline-block' }}>{stars}</div>;
//   };

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const isNewReview = (reviewDate) => {
//     const reviewDateObj = new Date(reviewDate);
//     const currentDate = new Date();
//     const diffTime = Math.abs(currentDate - reviewDateObj);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays <= 7; // Consider reviews from last 7 days as new
//   };

//   // Generate floating elements
//   const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
//     id: i,
//     size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
//     left: Math.random() * 100,
//     top: Math.random() * 100,
//     animationDelay: Math.random() * 5,
//   }));

//   return (
//     <section style={styles.reviews}>
//       {/* Floating Background Elements */}
//       <div style={styles.floatingElements}>
//         {floatingElements.map((element) => (
//           <div
//             key={element.id}
//             style={{
//               ...styles.floatingElement,
//               width: element.size,
//               height: element.size,
//               left: `${element.left}%`,
//               top: `${element.top}%`,
//               animationDelay: `${element.animationDelay}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div style={styles.container}>
//         <h2 style={styles.sectionTitle}>
//           Patient Reviews
//         </h2>
//         <p style={styles.sectionSubtitle}>
//           See what our patients say about their experience with QuickMed
//         </p>

//         {/* Rating Summary Section */}
//         <div style={styles.ratingSummary}>
//           <div style={styles.overallRating}>
//             <div style={styles.overallScore}>{averageRating}</div>
//             <div style={styles.starsLarge}>
//               {renderStars(Math.round(parseFloat(averageRating)))}
//             </div>
//             <div style={styles.ratingCount}>Based on {totalReviews} reviews</div>
//           </div>
//           <div style={styles.ratingBreakdown}>
//             {ratingBars.map((bar, index) => (
//               <div key={index} style={styles.ratingBar}>
//                 <span style={{fontSize: isMobile ? '0.9rem' : '1rem'}}>{bar.stars} stars</span>
//                 <div style={styles.barContainer}>
//                   <div style={{...styles.barFill, width: `${bar.percentage}%`}}></div>
//                 </div>
//                 <span style={{fontSize: isMobile ? '0.8rem' : '0.9rem'}}>{bar.count} ({bar.percentage}%)</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Reviews Grid */}
//         {showAllReviews && reviews.length > 6 && (
//           <div style={styles.scrollIndicator}>
//             Scroll to view all {reviews.length} reviews ↓
//           </div>
//         )}

//         <div style={showAllReviews ? styles.reviewsGridScrollable : styles.reviewsGrid}>
//           {displayedReviews.map((review) => (
//             <div
//               key={review.id}
//               style={styles.reviewCard}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-10px)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
//                 e.currentTarget.style.borderColor = '#7C2A62';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
//                 e.currentTarget.style.borderColor = 'transparent';
//               }}
//             >
//               {isNewReview(review.date) && (
//                 <div style={styles.newReviewBadge}>NEW</div>
//               )}

//               <div style={styles.reviewHeader}>
//                 <div style={styles.reviewerInfo}>
//                   <div style={styles.avatar}>{review.avatar}</div>
//                   <div>
//                     <h4 style={styles.reviewerName}>{review.name}</h4>
//                     <div style={styles.reviewStars}>{renderStars(review.rating)}</div>
//                   </div>
//                 </div>
//                 <span style={styles.reviewDate}>{formatDate(review.date)}</span>
//               </div>
//               <p style={styles.reviewComment}>{review.comment}</p>
//             </div>
//           ))}
//         </div>

//         {/* View More/Less Button */}
//         {reviews.length > 6 && (
//           <button
//             style={styles.viewMoreButton}
//             onClick={() => setShowAllReviews(!showAllReviews)}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#7C2A62';
//               e.target.style.color = 'white';
//               e.target.style.transform = 'translateY(-2px)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.color = '#7C2A62';
//               e.target.style.transform = 'translateY(0)';
//             }}
//           >
//             {showAllReviews ? `Show Less (Viewing ${reviews.length} reviews)` : `View All Reviews (${reviews.length} total)`}
//           </button>
//         )}

//         {/* Add Review Section */}
//         <div style={styles.addReviewSection}>
//           <h3 style={styles.addReviewTitle}>Share Your Experience</h3>
//           <p style={styles.addReviewText}>
//             Help others make informed decisions about their healthcare
//           </p>
//           <button
//             style={styles.addReviewButton}
//             onClick={onWriteReview}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#5a1a4a';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#7C2A62';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
//             }}
//           >
//             Write a Review
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Reviews;

import React, { useState, useEffect } from "react";

const Reviews = ({ onWriteReview, reviews: propReviews }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch reviews from API
  const fetchReviews = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://127.0.0.1:8000/api/list-reviews/");

      if (response.ok) {
        const data = await response.json();

        // Format backend reviews for your frontend structure
        const formatted = data.map((review) => ({
          id: review.id,
          name: review.name || "Anonymous", // Use backend name if available, otherwise fallback
          rating: review.rating,
          comment: review.comment,
          date: review.created_at, // using backend created_at
          avatar: (review.name || "A").charAt(0).toUpperCase(), // First letter of name or "A"
        }));

        setReviews(formatted);
      } else {
        console.error("Failed to fetch reviews");
        // Fallback to localStorage or propReviews
        handleFallbackReviews();
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      handleFallbackReviews();
    } finally {
      setIsLoading(false);
    }
  };

  // Handle fallback when API fails
  const handleFallbackReviews = () => {
    if (propReviews && propReviews.length > 0) {
      setReviews(propReviews);
    } else {
      const savedReviews = localStorage.getItem("quickmed-reviews");
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        // Initialize with default reviews if none exist
        initializeDefaultReviews();
      }
    }
  };

  // Initialize default reviews
  const initializeDefaultReviews = () => {
    const defaultReviews = [
      {
        id: 1,
        name: "Rahul Sharma",
        rating: 5,
        date: "2024-01-15",
        comment:
          "QuickMed saved me during my emergency! The medicine delivery was super fast - received within 25 minutes. Highly recommended!",
        avatar: "RS",
      },
      {
        id: 2,
        name: "Priya Patel",
        rating: 4,
        date: "2024-01-12",
        comment:
          "Excellent service! The doctor consultation was smooth and the medicine reached within 30 minutes as promised.",
        avatar: "PP",
      },
      {
        id: 3,
        name: "Ankit Verma",
        rating: 5,
        date: "2024-01-10",
        comment:
          "Best healthcare app I have used. The live tracking feature is amazing and the doctors are very professional.",
        avatar: "AV",
      },
      {
        id: 4,
        name: "Sneha Reddy",
        rating: 5,
        date: "2024-01-08",
        comment:
          "24/7 doctor consultation is a lifesaver! Got immediate help for my child fever at midnight.",
        avatar: "SR",
      },
      {
        id: 5,
        name: "Vikram Singh",
        rating: 4,
        date: "2024-01-05",
        comment:
          "Great platform for medicine delivery. The delivery executive was very professional and polite.",
        avatar: "VS",
      },
      {
        id: 6,
        name: "Meera Joshi",
        rating: 5,
        date: "2024-01-03",
        comment:
          "The OTC products section is very comprehensive. Found all my regular health supplements easily.",
        avatar: "MJ",
      },
    ];
    setReviews(defaultReviews);
    localStorage.setItem("quickmed-reviews", JSON.stringify(defaultReviews));
  };

  // Use propReviews if provided, otherwise load from API or localStorage
  useEffect(() => {
    if (propReviews && propReviews.length > 0) {
      setReviews(propReviews);
    } else {
      fetchReviews();
    }
  }, [propReviews]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Add fade-in animation
    setIsVisible(true);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Save reviews to localStorage whenever reviews change (for fallback)
  useEffect(() => {
    if (reviews.length > 0 && (!propReviews || propReviews.length === 0)) {
      localStorage.setItem("quickmed-reviews", JSON.stringify(reviews));
    }
  }, [reviews, propReviews]);

  // Calculate rating statistics
  const calculateRatingStats = () => {
    const totalReviews = reviews.length;
    const averageRating =
      totalReviews > 0
        ? (
            reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          ).toFixed(1)
        : "0.0";

    const ratingDistribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      ratingDistribution[review.rating]++;
    });

    const ratingBars = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      percentage:
        totalReviews > 0
          ? Math.round((ratingDistribution[stars] / totalReviews) * 100)
          : 0,
      count: ratingDistribution[stars],
    }));

    return { averageRating, ratingBars, totalReviews };
  };

  const { averageRating, ratingBars, totalReviews } = calculateRatingStats();

  // Get reviews to display (show first 6 by default, or all if showAllReviews is true)
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

  const styles = {
    // Main Reviews Section with Bubble Background
    reviews: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)",
      position: "relative",
      overflow: "hidden",
      padding: isMobile ? "4rem 1rem" : isTablet ? "5rem 2rem" : "6rem 2rem",
    },
    floatingElements: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    },
    floatingElement: {
      position: "absolute",
      background: "rgba(124, 42, 98, 0.1)",
      borderRadius: "50%",
      animation: "float 6s ease-in-out infinite",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    sectionTitle: {
      fontSize: isMobile ? "2.5rem" : isTablet ? "3rem" : "3.5rem",
      textAlign: "center",
      marginBottom: "1rem",
      color: "#7C2A62",
      fontWeight: "700",
      background: "linear-gradient(45deg, #7C2A62, #9C3A7A)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    sectionSubtitle: {
      fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.2rem",
      textAlign: "center",
      marginBottom: isMobile ? "3rem" : "4rem",
      color: "#666",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.2s",
    },
    loadingText: {
      textAlign: "center",
      fontSize: isMobile ? "1rem" : "1.2rem",
      color: "#7C2A62",
      margin: "2rem 0",
    },
    ratingSummary: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
      gap: isMobile ? "2rem" : "3rem",
      marginBottom: isMobile ? "3rem" : "4rem",
      padding: isMobile ? "2rem" : "3rem",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      boxShadow: "0 8px 30px rgba(124, 42, 98, 0.1)",
      backdropFilter: "blur(10px)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.4s",
    },
    overallRating: {
      textAlign: "center",
      padding: isMobile ? "1rem" : "2rem",
    },
    overallScore: {
      fontSize: isMobile ? "3rem" : "4rem",
      fontWeight: "bold",
      color: "#7C2A62",
      margin: "0 0 1rem 0",
      background: "linear-gradient(45deg, #7C2A62, #D32F2F)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    starsLarge: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      marginBottom: "1rem",
    },
    ratingCount: {
      color: "#666",
      fontSize: isMobile ? "1rem" : "1.1rem",
    },
    ratingBreakdown: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    ratingBar: {
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "0.5rem" : "1rem",
    },
    barContainer: {
      flex: 1,
      height: "8px",
      backgroundColor: "#e8e8e8",
      borderRadius: "4px",
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      backgroundColor: "#7C2A62",
      transition: "width 0.5s ease-in-out",
    },
    reviewsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gap: isMobile ? "1.5rem" : "2rem",
      marginBottom: "3rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.6s",
    },
    reviewsGridScrollable: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gap: isMobile ? "1.5rem" : "2rem",
      marginBottom: "3rem",
      maxHeight: "600px",
      overflowY: "auto",
      padding: "1rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.6s",
    },
    reviewCard: {
      padding: isMobile ? "1.5rem" : "2rem",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "15px",
      boxShadow: "0 5px 20px rgba(124, 42, 98, 0.1)",
      transition: "all 0.3s ease",
      position: "relative",
      backdropFilter: "blur(10px)",
      border: "2px solid transparent",
    },
    newReviewBadge: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "0.3rem 0.8rem",
      borderRadius: "12px",
      fontSize: "0.7rem",
      fontWeight: "bold",
    },
    reviewHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1.5rem",
      position: "relative",
      paddingRight: "70px",
    },
    reviewerInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    avatar: {
      width: isMobile ? "40px" : "50px",
      height: isMobile ? "40px" : "50px",
      borderRadius: "50%",
      backgroundColor: "#F7D9EB",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      color: "#7C2A62",
      fontSize: isMobile ? "0.9rem" : "1rem",
      border: "2px solid #7C2A62",
    },
    reviewerName: {
      margin: "0 0 0.5rem 0",
      color: "#333",
      fontSize: isMobile ? "1.1rem" : "1.2rem",
      fontWeight: "600",
    },
    reviewStars: {
      color: "#FFD700",
      fontSize: isMobile ? "0.9rem" : "1rem",
    },
    reviewDate: {
      color: "#666",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      textAlign: "right",
      minWidth: isMobile ? "100px" : "120px",
    },
    reviewComment: {
      color: "#333",
      lineHeight: "1.6",
      fontSize: isMobile ? "0.9rem" : "1rem",
      margin: 0,
    },
    viewMoreButton: {
      padding: isMobile ? "0.8rem 1.5rem" : "1rem 2rem",
      backgroundColor: "transparent",
      border: "2px solid #7C2A62",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: isMobile ? "0.9rem" : "1rem",
      fontWeight: "bold",
      color: "#7C2A62",
      transition: "all 0.3s ease",
      margin: "0 auto 3rem",
      display: "block",
      position: "relative",
      overflow: "hidden",
    },
    addReviewSection: {
      textAlign: "center",
      padding: isMobile ? "2rem" : "3rem",
      backgroundColor: "rgba(247, 217, 235, 0.8)",
      borderRadius: "20px",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 30px rgba(124, 42, 98, 0.1)",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.8s",
    },
    addReviewTitle: {
      fontSize: isMobile ? "1.5rem" : "2rem",
      marginBottom: "1rem",
      color: "#7C2A62",
      fontWeight: "600",
    },
    addReviewText: {
      color: "#666",
      marginBottom: "2rem",
      fontSize: isMobile ? "1rem" : "1.1rem",
      maxWidth: "500px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    addReviewButton: {
      padding: isMobile ? "0.8rem 2rem" : "1rem 2.5rem",
      backgroundColor: "#7C2A62",
      border: "none",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: isMobile ? "1rem" : "1.1rem",
      fontWeight: "bold",
      color: "white",
      transition: "all 0.3s ease",
      boxShadow: "0 5px 15px rgba(124, 42, 98, 0.3)",
      position: "relative",
      overflow: "hidden",
    },
    scrollIndicator: {
      textAlign: "center",
      color: "#7C2A62",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      marginBottom: "1rem",
      fontStyle: "italic",
    },
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        // Filled star (golden)
        stars.push(
          <span key={i} style={{ color: "#FFD700", fontSize: "inherit" }}>
            ⭐
          </span>
        );
      } else {
        // Empty star (gray)
        stars.push(
          <span key={i} style={{ color: "#DDDDDD", fontSize: "inherit" }}>
            ☆
          </span>
        );
      }
    }
    return <div style={{ display: "inline-block" }}>{stars}</div>;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isNewReview = (reviewDate) => {
    const reviewDateObj = new Date(reviewDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - reviewDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Consider reviews from last 7 days as new
  };

  // Generate floating elements
  const floatingElements = Array.from(
    { length: isMobile ? 8 : 15 },
    (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
    })
  );

  return (
    <section style={styles.reviews}>
      {/* Floating Background Elements */}
      <div style={styles.floatingElements}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            style={{
              ...styles.floatingElement,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Patient Reviews</h2>
        <p style={styles.sectionSubtitle}>
          See what our patients say about their experience with QuickMed
        </p>

        {isLoading ? (
          <div style={styles.loadingText}>Loading reviews...</div>
        ) : (
          <>
            {/* Rating Summary Section */}
            <div style={styles.ratingSummary}>
              <div style={styles.overallRating}>
                <div style={styles.overallScore}>{averageRating}</div>
                <div style={styles.starsLarge}>
                  {renderStars(Math.round(parseFloat(averageRating)))}
                </div>
                <div style={styles.ratingCount}>
                  Based on {totalReviews} reviews
                </div>
              </div>
              <div style={styles.ratingBreakdown}>
                {ratingBars.map((bar, index) => (
                  <div key={index} style={styles.ratingBar}>
                    <span style={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
                      {bar.stars} stars
                    </span>
                    <div style={styles.barContainer}>
                      <div
                        style={{
                          ...styles.barFill,
                          width: `${bar.percentage}%`,
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                      {bar.count} ({bar.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Grid */}
            {showAllReviews && reviews.length > 6 && (
              <div style={styles.scrollIndicator}>
                Scroll to view all {reviews.length} reviews ↓
              </div>
            )}

            <div
              style={
                showAllReviews
                  ? styles.reviewsGridScrollable
                  : styles.reviewsGrid
              }
            >
              {displayedReviews.map((review) => (
                <div
                  key={review.id}
                  style={styles.reviewCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 15px 40px rgba(124, 42, 98, 0.15)";
                    e.currentTarget.style.borderColor = "#7C2A62";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 5px 20px rgba(124, 42, 98, 0.1)";
                    e.currentTarget.style.borderColor = "transparent";
                  }}
                >
                  {isNewReview(review.date) && (
                    <div style={styles.newReviewBadge}>NEW</div>
                  )}

                  <div style={styles.reviewHeader}>
                    <div style={styles.reviewerInfo}>
                      <div style={styles.avatar}>{review.avatar}</div>
                      <div>
                        <h4 style={styles.reviewerName}>{review.name}</h4>
                        <div style={styles.reviewStars}>
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <span style={styles.reviewDate}>
                      {formatDate(review.date)}
                    </span>
                  </div>
                  <p style={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>

            {/* View More/Less Button */}
            {reviews.length > 6 && (
              <button
                style={styles.viewMoreButton}
                onClick={() => setShowAllReviews(!showAllReviews)}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#7C2A62";
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#7C2A62";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {showAllReviews
                  ? `Show Less (Viewing ${reviews.length} reviews)`
                  : `View All Reviews (${reviews.length} total)`}
              </button>
            )}
          </>
        )}

        {/* Add Review Section */}
        <div style={styles.addReviewSection}>
          <h3 style={styles.addReviewTitle}>Share Your Experience</h3>
          <p style={styles.addReviewText}>
            Help others make informed decisions about their healthcare
          </p>
          <button
            style={styles.addReviewButton}
            onClick={onWriteReview}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#5a1a4a";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 20px rgba(124, 42, 98, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7C2A62";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 5px 15px rgba(124, 42, 98, 0.3)";
            }}
          >
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
