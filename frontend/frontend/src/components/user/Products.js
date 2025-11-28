import React, { useState } from 'react';

const Products = ({ 
  searchQuery, 
  setSearchQuery, 
  medicines, 
  filteredMedicines, 
  cart, 
  addToCart, 
  updateQuantity, 
  setActiveView 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Color constants
  const colors = {
    primary: '#7C2A62',
    accent: '#F7D9EB',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    gray: '#666666',
    darkGray: '#333333',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545'
  };

  // Styles object with the new color scheme
  const styles = {
    mainContent: {
      padding: '20px',
      backgroundColor: colors.lightGray,
      minHeight: '100vh',
      marginTop: '50px',
      paddingTop: '80px'
    },
    backButton: {
      position: 'fixed',
      top: '80px',
      left: '20px',
      padding: '12px 20px',
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    welcomeSection: {
      textAlign: 'center',
      marginBottom: '30px',
      padding: '20px 10px',
      backgroundColor: colors.white,
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      marginTop: '40px'
    },
    welcomeTitle: {
      color: colors.primary,
      fontSize: '2.5rem',
      marginBottom: '20px',
      fontWeight: 'bold'
    },
    welcomeSubtitle: {
      color: colors.gray,
      fontSize: '1.3rem',
      lineHeight: '1.6'
    },
    searchSection: {
      marginBottom: '40px',
      backgroundColor: colors.white,
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '25px',
      gap: '20px'
    },
    searchInput: {
      flex: 0.5,
      padding: '15px 20px',
      border: `2px solid ${colors.accent}`,
      borderRadius: '5px',
      fontSize: '16px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
      backgroundColor: colors.white
    },
    healthMessage: {
      flex: 0.7,
      padding: '15px 20px',
      backgroundColor: colors.accent,
      color: colors.primary,
      borderRadius: '8px',
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '500',
      textAlign: 'center',
      border: `1px solid ${colors.primary}20`
    },
    categoryFilter: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px'
    },
    categoryButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.accent}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '15px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    activeCategoryButton: {
      backgroundColor: colors.primary,
      color: colors.white,
      borderColor: colors.primary
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px'
    },
    productCard: {
      backgroundColor: colors.white,
      borderRadius: '5px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      border: `1px solid ${colors.accent}`,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '200px', // Fixed minimum height
      position: 'relative'
    },
    productImage: {
      fontSize: '3.5rem',
      textAlign: 'center',
      marginBottom: '20px'
    },
    productInfo: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    },
    productName: {
      color: colors.primary,
      fontSize: '1.3rem',
      fontWeight: 'bold',
      marginBottom: '8px'
    },
    productBrand: {
      color: colors.gray,
      fontSize: '1.1rem',
      marginBottom: '12px',
      fontWeight: '500'
    },
    productDescription: {
      color: colors.darkGray,
      fontSize: '0.95rem',
      marginBottom: '18px',
      lineHeight: '1.5'
    },
    productMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    },
    productCategory: {
      backgroundColor: colors.accent,
      color: colors.primary,
      padding: '6px 14px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    prescriptionBadge: {
      backgroundColor: colors.warning,
      color: colors.darkGray,
      padding: '6px 10px',
      borderRadius: '10px',
      fontSize: '0.75rem',
      fontWeight: 'bold'
    },

    // FIXED: Bottom section that stays at bottom
    bottomSection: {
      marginTop: 'auto',
      paddingTop: '15px',
      borderTop: `1px solid ${colors.lightGray}`,
      position: 'sticky',
      bottom: '0',
      backgroundColor: colors.white,
      borderRadius: '0 0 12px 12px'
    },
    productPriceSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '0'
    },
    productPrice: {
      color: colors.primary,
      fontSize: '1.6rem',
      fontWeight: 'bold'
    },
    addToCartButton: {
      padding: '12px 24px',
      backgroundColor: colors.primary,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      minWidth: '120px'
    },
    disabledButton: {
      padding: '12px 24px',
      backgroundColor: colors.gray,
      color: colors.white,
      border: 'none',
      borderRadius: '8px',
      cursor: 'not-allowed',
      fontSize: '0.9rem',
      fontWeight: '600',
      opacity: 0.6,
      whiteSpace: 'nowrap',
      minWidth: '120px'
    },
    quantityControls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '15px',
      padding: '12px',
      backgroundColor: colors.lightGray,
      borderRadius: '8px',
      width: '100%'
    },
    quantityButton: {
      width: '35px',
      height: '35px',
      border: `2px solid ${colors.primary}`,
      backgroundColor: colors.white,
      color: colors.primary,
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      flexShrink: 0
    },
    quantityDisplay: {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      color: colors.primary,
      minWidth: '35px',
      textAlign: 'center',
      flex: 1
    }
  };

  // Enhanced medicine data with detailed information
  const enhancedMedicines = [
    {
      id: 1,
      name: 'Aspirin 75mg',
      brand: 'Bayer',
      price: 25,
      vendor: 'WellCare Store',
      category: 'Pain Relief',
      description: 'Low-dose aspirin for heart health and pain relief',
      detailedDescription: 'Aspirin is a salicylate drug that works by reducing substances in the body that cause pain, fever, and inflammation. Low-dose aspirin (75mg) is commonly used for cardiovascular protection.',
      uses: [
        'Prevention of heart attacks and strokes',
        'Mild to moderate pain relief',
        'Reduction of fever and inflammation'
      ],
      dosage: 'Take one tablet daily with food as directed by your doctor',
      sideEffects: [
        'Stomach upset',
        'Heartburn',
        'Mild headache'
      ],
      precautions: [
        'Do not take if allergic to aspirin',
        'Consult doctor before surgery',
        'Avoid alcohol consumption'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 50,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: 'Paracetamol 500mg',
      brand: 'Crocin',
      price: 30,
      vendor: 'City Pharmacy',
      category: 'Fever & Pain',
      description: 'Effective relief from fever and mild pain',
      detailedDescription: 'Paracetamol (acetaminophen) is a common pain reliever and fever reducer. It works by affecting the areas of the brain that receive pain signals and regulate body temperature.',
      uses: [
        'Fever reduction',
        'Headache relief',
        'Muscle aches and pains',
        'Arthritis pain'
      ],
      dosage: '1-2 tablets every 4-6 hours as needed, maximum 8 tablets in 24 hours',
      sideEffects: [
        'Rare when taken as directed',
        'Allergic reactions in sensitive individuals',
        'Liver damage with overdose'
      ],
      precautions: [
        'Do not exceed recommended dosage',
        'Consult doctor for liver conditions',
        'Avoid with alcohol'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 100,
      rating: 4.7,
      reviews: 256
    },
    {
      id: 3,
      name: 'Ibuprofen 400mg',
      brand: 'Brufen',
      price: 35,
      vendor: 'HealthPlus Medicines',
      category: 'Pain Relief',
      description: 'Anti-inflammatory pain reliever for various conditions',
      detailedDescription: 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) that works by reducing hormones that cause inflammation and pain in the body. Effective for various inflammatory conditions.',
      uses: [
        'Arthritis pain and inflammation',
        'Muscle aches',
        'Menstrual cramps',
        'Dental pain'
      ],
      dosage: 'One tablet every 6-8 hours with food, maximum 1200mg per day',
      sideEffects: [
        'Stomach upset',
        'Heartburn',
        'Dizziness',
        'Increased blood pressure'
      ],
      precautions: [
        'Take with food or milk',
        'Avoid in third trimester of pregnancy',
        'Consult for kidney problems'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 75,
      rating: 4.4,
      reviews: 189
    },
    {
      id: 4,
      name: 'Vitamin C 1000mg',
      brand: 'NatureMade',
      price: 40,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'High-potency Vitamin C for immune support',
      detailedDescription: 'Vitamin C (ascorbic acid) is a water-soluble vitamin essential for growth and development. It helps the body form collagen, absorb iron, and maintain healthy bones, teeth, and immune system.',
      uses: [
        'Immune system support',
        'Collagen production',
        'Antioxidant protection',
        'Iron absorption'
      ],
      dosage: 'One tablet daily with a meal',
      sideEffects: [
        'Mild diarrhea in high doses',
        'Stomach cramps',
        'Nausea'
      ],
      precautions: [
        'Consult for kidney stones history',
        'May interact with chemotherapy',
        'Store in cool dry place'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 200,
      rating: 4.8,
      reviews: 342
    },
    {
      id: 5,
      name: 'Amoxicillin 500mg',
      brand: 'Amoxil',
      price: 120,
      vendor: 'City Pharmacy',
      category: 'Antibiotics',
      description: 'Broad-spectrum antibiotic for bacterial infections',
      detailedDescription: 'Amoxicillin is a penicillin-type antibiotic that fights bacteria in the body. It is used to treat many different types of infections caused by bacteria, such as ear infections, bladder infections, pneumonia, and more.',
      uses: [
        'Bacterial infections',
        'Respiratory tract infections',
        'Urinary tract infections',
        'Skin infections'
      ],
      dosage: 'As prescribed by doctor, typically one capsule three times daily',
      sideEffects: [
        'Nausea',
        'Diarrhea',
        'Skin rash',
        'Yeast infection'
      ],
      precautions: [
        'PRESCRIPTION REQUIRED',
        'Complete full course',
        'Inform about penicillin allergy',
        'Take with plenty of water'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 30,
      rating: 4.3,
      reviews: 95
    },
    {
      id: 6,
      name: 'Blood Pressure Monitor',
      brand: 'Omron',
      price: 899,
      vendor: 'HealthPlus Medicines',
      category: 'Medical Equipment',
      description: 'Digital automatic blood pressure monitor',
      detailedDescription: 'Professional-grade digital blood pressure monitor with advanced accuracy. Features easy-to-read display, irregular heartbeat detector, and memory function for tracking readings over time.',
      uses: [
        'Home blood pressure monitoring',
        'Hypertension management',
        'Health tracking',
        'Doctor consultation support'
      ],
      features: [
        'One-touch operation',
        '90-reading memory',
        'Irregular heartbeat detection',
        'WHO classification indicator'
      ],
      specifications: [
        'Cuff size: 22-32cm',
        'Battery operated',
        '2-year warranty',
        'Clinically validated'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 25,
      rating: 4.6,
      reviews: 167
    },
    {
      id: 7,
      name: 'Cetirizine 10mg',
      brand: 'Zyrtec',
      price: 25,
      vendor: 'City Pharmacy',
      category: 'Allergy',
      description: '24-hour allergy relief without drowsiness',
      detailedDescription: 'Cetirizine is an antihistamine that reduces the effects of natural chemical histamine in the body. Histamine can produce symptoms of sneezing, itching, watery eyes, and runny nose.',
      uses: [
        'Seasonal allergies',
        'Hay fever',
        'Chronic urticaria',
        'Allergic skin reactions'
      ],
      dosage: 'One tablet daily, with or without food',
      sideEffects: [
        'Dry mouth',
        'Mild drowsiness (rare)',
        'Headache',
        'Sore throat'
      ],
      precautions: [
        'Avoid alcohol',
        'Consult for kidney problems',
        'Safe for long-term use'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 80,
      rating: 4.5,
      reviews: 214
    },
    {
      id: 8,
      name: 'Omeprazole 20mg',
      brand: 'Prilosec',
      price: 45,
      vendor: 'City Pharmacy',
      category: 'Acid Reducer',
      description: 'Proton pump inhibitor for acid reflux',
      detailedDescription: 'Omeprazole is a proton pump inhibitor that decreases the amount of acid produced in the stomach. It is used to treat symptoms of GERD and other conditions caused by excess stomach acid.',
      uses: [
        'GERD (gastroesophageal reflux disease)',
        'Stomach ulcers',
        'Zollinger-Ellison syndrome',
        'Erosive esophagitis'
      ],
      dosage: 'One capsule daily before eating, usually for 4-8 weeks',
      sideEffects: [
        'Headache',
        'Diarrhea',
        'Stomach pain',
        'Nausea'
      ],
      precautions: [
        'Take before meals',
        'Do not crush or chew',
        'Long-term use requires monitoring',
        'May affect vitamin B12 absorption'
      ],
      image: '',
      prescriptionRequired: true,
      stock: 40,
      rating: 4.2,
      reviews: 178
    },
    {
      id: 9,
      name: 'Multivitamin Tablets',
      brand: 'Centrum',
      price: 150,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'Complete daily multivitamin for adults',
      detailedDescription: 'Comprehensive multivitamin formula containing essential vitamins and minerals to support overall health, energy production, immune function, and cellular protection.',
      uses: [
        'Daily nutritional support',
        'Energy production',
        'Immune system function',
        'Bone and eye health'
      ],
      keyIngredients: [
        'Vitamin A, C, D, E',
        'B-complex vitamins',
        'Calcium and Magnesium',
        'Zinc and Selenium'
      ],
      dosage: 'One tablet daily with a meal',
      sideEffects: [
        'Mild stomach upset',
        'Constipation',
        'Unusual taste'
      ],
      precautions: [
        'Keep out of reach of children',
        'Do not exceed recommended dose',
        'Consult if pregnant or nursing'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 150,
      rating: 4.7,
      reviews: 289
    },
    {
      id: 10,
      name: 'Calcium Supplements',
      brand: 'Caltrate',
      price: 200,
      vendor: 'WellCare Store',
      category: 'Vitamins & Supplements',
      description: 'Calcium with Vitamin D for bone health',
      detailedDescription: 'Advanced calcium supplement with Vitamin D3 to support bone density and strength. Essential for maintaining healthy bones and teeth, and preventing osteoporosis.',
      uses: [
        'Bone health maintenance',
        'Osteoporosis prevention',
        'Dental health',
        'Muscle function'
      ],
      dosage: 'One tablet twice daily with meals',
      sideEffects: [
        'Constipation',
        'Gas and bloating',
        'Stomach upset'
      ],
      precautions: [
        'Take with plenty of water',
        'Space from other medications',
        'Consult for kidney stones'
      ],
      image: '',
      prescriptionRequired: false,
      stock: 90,
      rating: 4.4,
      reviews: 156
    }
  ];

  const categories = ['all', ...new Set(enhancedMedicines.map(medicine => medicine.category))];

  const filteredProducts = enhancedMedicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         medicine.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCartWithNotification = (product) => {
    addToCart(product);
  };

  // Get quantity of product in cart
  const getProductQuantity = (productId) => {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  // Handle back to home page
  const handleBackToHome = () => {
    setActiveView('home');
  };

  return (
    <div style={styles.mainContent}>
      {/* Back Button */}
      <button 
        style={styles.backButton}
        onClick={handleBackToHome}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = colors.accent;
          e.target.style.color = colors.primary;
          e.target.style.transform = 'translateX(-5px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = colors.primary;
          e.target.style.color = colors.white;
          e.target.style.transform = 'translateX(0)';
        }}
      >
        ← Back to Home
      </button>

      {/* Header Section */}
      <section style={styles.welcomeSection}>
        <h2 style={styles.welcomeTitle}>Our Medicine Products 💊</h2>
        <p style={styles.welcomeSubtitle}>
          Discover high-quality medicines and healthcare products with detailed information
        </p>
      </section>

      {/* Search and Filter Section */}
      <section style={styles.searchSection}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search medicines, brands, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          {/* Health Priority Message */}
          <div style={styles.healthMessage}>
            For your safety and well-being, we provide only quality medicines from trusted sources, properly stored for maximum efficacy.
          </div>
        </div>

        <div style={styles.categoryFilter}>
          {categories.map(category => (
            <button
              key={category}
              style={
                selectedCategory === category 
                  ? {...styles.categoryButton, ...styles.activeCategoryButton}
                  : styles.categoryButton
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section style={styles.productsSection}>
        <div style={styles.productsGrid}>
          {filteredProducts.map(product => {
            const quantityInCart = getProductQuantity(product.id);
            
            return (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImage}>
                  {product.image}
                </div>
                
                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.productBrand}>{product.brand}</p>
                  <p style={styles.productDescription}>{product.description}</p>
                  
                  <div style={styles.productMeta}>
                    <div style={styles.productCategory}>{product.category}</div>
                    {product.prescriptionRequired && (
                      <div style={styles.prescriptionBadge}>Prescription Required</div>
                    )}
                  </div>

                  {/* FIXED: Bottom section that stays at bottom */}
                  <div style={styles.bottomSection}>
                    {/* Add to Cart Button - Only show if product is not in cart */}
                    {quantityInCart === 0 ? (
                      <div style={styles.productPriceSection}>
                        <span style={styles.productPrice}>₹{product.price}</span>
                        <button
                          style={product.stock > 0 ? styles.addToCartButton : styles.disabledButton}
                          onClick={() => product.stock > 0 && addToCartWithNotification(product)}
                          disabled={product.stock === 0}
                          onMouseEnter={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.accent;
                              e.target.style.color = colors.primary;
                              e.target.style.transform = 'translateY(-2px)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (product.stock > 0) {
                              e.target.style.backgroundColor = colors.primary; // FIXED: Changed cards.primary to colors.primary
                              e.target.style.color = colors.white;
                              e.target.style.transform = 'translateY(0)';
                            }
                          }}
                        >
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    ) : (
                      /* Quantity Controls - Only show if product is in cart */
                      <div style={styles.quantityControls}>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = colors.primary;
                            e.target.style.color = colors.white;
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = colors.white;
                            e.target.style.color = colors.primary;
                          }}
                        >
                          −
                        </button>
                        <span style={styles.quantityDisplay}>{quantityInCart}</span>
                        <button
                          style={styles.quantityButton}
                          onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                          disabled={quantityInCart >= product.stock}
                          onMouseEnter={(e) => {
                            if (quantityInCart < product.stock) {
                              e.target.style.backgroundColor = colors.primary;
                              e.target.style.color = colors.white;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (quantityInCart < product.stock) {
                              e.target.style.backgroundColor = colors.white;
                              e.target.style.color = colors.primary;
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}; 

export default Products;