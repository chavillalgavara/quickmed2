export const user = {
  fullName: 'Rajesh Kumar',
  email: 'rajesh.pharmacy@gmail.com',
  phone: '9876543210',
  pharmacyName: 'City Medical Store',
  licenseNumber: 'PHARM-UP-2024-789',
  gstNumber: '07AABCU9603R1ZM',
  address: 'Shop No. 15, Medical Complex, Sector 15',
  city: 'Noida',
  state: 'Uttar Pradesh',
  pincode: '201301',
  openingTime: '08:00 AM',
  closingTime: '10:00 PM'
};

export const initialData = {
  stock: [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      category: 'Pain Relief',
      quantity: 45,
      minStock: 20,
      price: 15,
      expiryDate: '2024-12-15',
      prescriptionRequired: false,
      supplier: 'MedPlus Suppliers',
      batchNo: 'BATCH-001'
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      category: 'Antibiotic',
      quantity: 12,
      minStock: 15,
      price: 85,
      expiryDate: '2024-08-20',
      prescriptionRequired: true,
      supplier: 'PharmaCorp',
      batchNo: 'BATCH-002'
    },
    {
      id: 3,
      name: 'Vitamin C 1000mg',
      category: 'Supplements',
      quantity: 78,
      minStock: 25,
      price: 120,
      expiryDate: '2025-03-10',
      prescriptionRequired: false,
      supplier: 'HealthPlus',
      batchNo: 'BATCH-003'
    },
    {
      id: 4,
      name: 'Insulin Syringes',
      category: 'Diabetes Care',
      quantity: 8,
      minStock: 10,
      price: 45,
      expiryDate: '2025-01-30',
      prescriptionRequired: true,
      supplier: 'Diabetic Care Ltd',
      batchNo: 'BATCH-004'
    },
    {
      id: 5,
      name: 'Aspirin 75mg',
      category: 'Cardiac',
      quantity: 32,
      minStock: 20,
      price: 25,
      expiryDate: '2024-11-15',
      prescriptionRequired: false,
      supplier: 'Cardio Pharma',
      batchNo: 'BATCH-005'
    }
  ],
  orders: {
    pending: [
      {
        id: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        items: [
          { name: 'Paracetamol 500mg', quantity: 2, price: 15 },
          { name: 'Vitamin C 1000mg', quantity: 1, price: 120 }
        ],
        total: 150,
        orderTime: '2024-01-15 10:30',
        deliveryType: 'home',
        address: 'H-12, Sector 15, Noida',
        prescriptionRequired: false
      },
      {
        id: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        items: [
          { name: 'Amoxicillin 250mg', quantity: 1, price: 85 }
        ],
        total: 85,
        orderTime: '2024-01-15 11:15',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: true
      }
    ],
    ready: [
      {
        id: 'ORD-003',
        customerName: 'Amit Patel',
        customerPhone: '+91 98765 43212',
        items: [
          { name: 'Insulin Syringes', quantity: 1, price: 45 },
          { name: 'Diabetes Strips', quantity: 1, price: 320 }
        ],
        total: 365,
        orderTime: '2024-01-15 09:45',
        deliveryType: 'home',
        address: 'B-5, Preet Vihar, Delhi',
        prescriptionRequired: true
      }
    ],
    picked: [
      {
        id: 'ORD-004',
        customerName: 'Sunita Reddy',
        customerPhone: '+91 98765 43213',
        items: [
          { name: 'Aspirin 75mg', quantity: 1, price: 25 }
        ],
        total: 25,
        orderTime: '2024-01-15 08:30',
        deliveryType: 'pickup',
        address: 'Store Pickup',
        prescriptionRequired: false
      }
    ],
    cancelled: []
  },
  prescriptions: [
    {
      id: 1,
      orderId: 'ORD-002',
      customerName: 'Priya Sharma',
      doctorName: 'Sharma',
      uploadedTime: '2024-01-15 11:15',
      status: 'pending',
      medicines: ['Amoxicillin 250mg', 'Azithromycin 500mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    },
    {
      id: 2,
      orderId: 'ORD-003',
      customerName: 'Amit Patel',
      doctorName: 'Gupta',
      uploadedTime: '2024-01-15 09:45',
      status: 'pending',
      medicines: ['Insulin Syringes', 'Diabetes Strips', 'Metformin 500mg'],
      imageUrl: 'https://via.placeholder.com/400x500?text=Prescription+Image'
    }
  ]
};

export const navigationItems = [
  { id: 'stock', label: 'Stock Management', icon: '📦' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'prescriptions', label: 'Prescription Verification', icon: '🩺' },
  { id: 'analytics', label: 'Analytics', icon: '📊' }
];

export const stockFilters = [
  { id: 'all', label: 'All Medicines' },
  { id: 'low', label: 'Low Stock' },
  { id: 'expiring', label: 'Expiring Soon' },
  { id: 'prescription', label: 'Prescription Only' }
];

// This will be dynamically calculated based on actual orders data
export const getOrderTabs = (orders) => [
  { id: 'pending', label: 'Pending', count: orders.pending?.length || 0 },
  { id: 'ready', label: 'Ready', count: orders.ready?.length || 0 },
  { id: 'picked', label: 'Picked', count: orders.picked?.length || 0 },
  { id: 'cancelled', label: 'Cancelled', count: orders.cancelled?.length || 0 }
];