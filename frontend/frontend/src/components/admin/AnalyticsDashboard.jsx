import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  const revenueColor = '#4CAF50';
  const refundColor = '#F44336';

  // State for real-time data with proper initial values
  const [kpiData, setKpiData] = useState([
    { title: 'Orders Today', value: '324', trend: '+3.2%', id: 'FR-1', previousValue: '314', isActive: true, filter: 'orders' },
    { title: 'On-Time Delivery %', value: '93.2%', trend: '+0.8%', id: 'FR-2', previousValue: '92.4%', isActive: true, filter: 'delivery' },
    { title: 'Cancellation Rate', value: '2.7%', trend: '+0.4%', id: 'FR-3', previousValue: '2.3%', isActive: true, filter: 'cancellation' },
    { title: 'Refund Requests', value: '18', trend: '-2%', id: 'FR-4', previousValue: '20', isActive: true, filter: 'refunds' }
  ]);

  const [dailyOrders, setDailyOrders] = useState([4, 3, 6, 7, 9, 12, 15, 18, 15]);
  const [revenueData, setRevenueData] = useState([12000, 15000, 18000, 14000, 22000, 19000, 25000]);
  const [refundData, setRefundData] = useState([800, 1200, 600, 1000, 1500, 900, 1100]);
  
  // New state for investigation and real-time features with proper initial values
  const [investigationData, setInvestigationData] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [heatmapUpdateTime, setHeatmapUpdateTime] = useState(new Date());

  // New state for filters
  const [revenueFilter, setRevenueFilter] = useState('all');
  const [refundFilter, setRefundFilter] = useState('all');
  const [dailyOrdersFilter, setDailyOrdersFilter] = useState('all');
  const [heatmapIntensityFilter, setHeatmapIntensityFilter] = useState('all');
  
  // New state for active KPI navigation
  const [activeKPI, setActiveKPI] = useState('all');
  const [chartFocus, setChartFocus] = useState('all'); // 'revenue', 'refunds', or 'all'

  // Static data - no setters needed
  const alerts = [
    { 
      type: 'Region with highest delays', 
      meaning: 'Signals delivery performance issue', 
      id: 'FR-10',
      region: 'Downtown Area',
      delayRate: '15%',
      module: 'Delivery'
    },
    { 
      type: 'Vendor with rising cancellations', 
      meaning: 'Indicates possible inventory or quality issue', 
      id: 'FR-11',
      vendor: 'QuickMed Pharmacy',
      cancellationRate: '12%',
      module: 'Vendor'
    },
    { 
      type: 'Doctor with abnormal prescription volume', 
      meaning: 'Detects possible fraud/malpractice', 
      id: 'FR-12',
      doctor: 'Dr. Michael Chen',
      prescriptionCount: '145',
      module: 'Doctor'
    },
    { 
      type: 'Top support ticket reason', 
      meaning: 'Helps identify common customer complaints', 
      id: 'FR-13',
      reason: 'Delivery delays',
      count: '23',
      module: 'Support'
    }
  ];

  const [topVendors, setTopVendors] = useState([
    { 
      id: 1, 
      name: 'HealthPlus Pharmacy', 
      orders: 156, 
      rating: 4.8,
      location: 'Downtown',
      performance: 'Excellent',
      growth: '+12%'
    },
    { 
      id: 2, 
      name: 'MediCare Store', 
      orders: 142, 
      rating: 4.7,
      location: 'Uptown',
      performance: 'Very Good',
      growth: '+8%'
    },
    { 
      id: 3, 
      name: 'QuickCare Pharmacy', 
      orders: 128, 
      rating: 4.6,
      location: 'Eastside',
      performance: 'Good',
      growth: '+5%'
    }
  ]);

  const [topDoctors, setTopDoctors] = useState([
    { 
      id: 1, 
      name: 'Dr. Sarah Lee', 
      prescriptions: 89, 
      approvalRate: '96%',
      specialty: 'Cardiology',
      satisfaction: '98%'
    },
    { 
      id: 2, 
      name: 'Dr. James Clark', 
      prescriptions: 76, 
      approvalRate: '94%',
      specialty: 'Pediatrics',
      satisfaction: '95%'
    },
    { 
      id: 3, 
      name: 'Dr. Priya Sharma', 
      prescriptions: 72, 
      approvalRate: '95%',
      specialty: 'General Medicine',
      satisfaction: '96%'
    }
  ]);

  // Star rating component
  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
        {/* Full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} style={{ color: '#FFD700', fontSize: '14px' }}>★</span>
        ))}
        {/* Half star */}
        {hasHalfStar && (
          <span style={{ color: '#FFD700', fontSize: '14px' }}>★</span>
        )}
        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} style={{ color: '#DDD', fontSize: '14px' }}>★</span>
        ))}
        <span style={{ marginLeft: '5px', fontSize: '12px', fontWeight: 'bold', color: primaryColor }}>
          {typeof rating === 'number' ? rating.toFixed(1) : '4.5'}
        </span>
      </div>
    );
  };

  // Initialize heatmap data
  useEffect(() => {
    const initialHeatmapData = [
      { 
        id: 1, 
        name: 'Downtown', 
        x: 30, y: 20, 
        intensity: 0.8, 
        orders: 45,
        growth: '+15%',
        trend: 'rising',
        deliveryTime: '45min'
      },
      { 
        id: 2, 
        name: 'Uptown', 
        x: 60, y: 50, 
        intensity: 0.4, 
        orders: 22,
        growth: '+5%',
        trend: 'stable',
        deliveryTime: '35min'
      },
      { 
        id: 3, 
        name: 'Eastside', 
        x: 40, y: 40, 
        intensity: 0.6, 
        orders: 35,
        growth: '+12%',
        trend: 'rising',
        deliveryTime: '40min'
      },
      { 
        id: 4, 
        name: 'Westside', 
        x: 70, y: 30, 
        intensity: 0.3, 
        orders: 18,
        growth: '-2%',
        trend: 'declining',
        deliveryTime: '50min'
      },
      { 
        id: 5, 
        name: 'Central', 
        x: 50, y: 60, 
        intensity: 0.9, 
        orders: 52,
        growth: '+20%',
        trend: 'rising',
        deliveryTime: '30min'
      }
    ];
    setHeatmapData(initialHeatmapData);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update KPI data with random fluctuations
      setKpiData(prev => prev.map(kpi => {
        const randomChange = Math.random() * 2 - 1; // -1 to 1
        const currentValue = parseFloat(kpi.value.replace(/[%,]/g, ''));
        const newValue = Math.max(0, currentValue + randomChange);
        const trend = randomChange >= 0 ? `+${randomChange.toFixed(1)}%` : `${randomChange.toFixed(1)}%`;
        
        return {
          ...kpi,
          value: kpi.title.includes('%') ? `${newValue.toFixed(1)}%` : Math.round(newValue).toString(),
          trend: trend
        };
      }));

      // Update daily orders with new data point
      setDailyOrders(prev => {
        const newOrders = [...prev.slice(1), Math.floor(Math.random() * 10) + 10];
        return newOrders;
      });

      // Update revenue and refund data
      setRevenueData(prev => {
        const newRevenue = [...prev.slice(1), Math.floor(Math.random() * 5000) + 15000];
        return newRevenue;
      });

      setRefundData(prev => {
        const newRefunds = [...prev.slice(1), Math.floor(Math.random() * 500) + 800];
        return newRefunds;
      });

      // Update heatmap data in real-time
      updateHeatmapData();

      // Update vendor and doctor data in real-time
      updateVendorDoctorData();

    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Update heatmap data in real-time - FIXED with null safety
  const updateHeatmapData = () => {
    setHeatmapData(prev => 
      prev ? prev.map(region => {
        const intensityChange = (Math.random() * 0.3 - 0.15);
        const newIntensity = Math.max(0.1, Math.min(1, region.intensity + intensityChange));
        const orderChange = Math.floor(Math.random() * 8 - 3);
        const newOrders = Math.max(5, region.orders + orderChange);
        
        // Determine trend based on order change
        let newTrend = region.trend;
        if (orderChange > 2) newTrend = 'rising';
        else if (orderChange < -2) newTrend = 'declining';
        else newTrend = 'stable';

        // Calculate growth percentage
        const growthPercentage = orderChange > 0 ? `+${orderChange}%` : `${orderChange}%`;

        return {
          ...region,
          intensity: newIntensity,
          orders: newOrders,
          growth: growthPercentage,
          trend: newTrend,
          x: Math.max(10, Math.min(90, region.x + (Math.random() * 6 - 3))),
          y: Math.max(10, Math.min(90, region.y + (Math.random() * 6 - 3))),
          deliveryTime: `${Math.max(20, Math.min(60, parseInt(region.deliveryTime) + Math.floor(Math.random() * 6 - 3)))}min`
        };
      }) : []
    );
    setHeatmapUpdateTime(new Date());
  };

  // Update vendor and doctor data in real-time - FIXED with null safety
  const updateVendorDoctorData = () => {
    setTopVendors(prev => 
      prev ? prev.map(vendor => {
        const ratingChange = (Math.random() * 0.2 - 0.1);
        const newRating = Math.min(5, Math.max(4, parseFloat(vendor.rating) + ratingChange));
        
        return {
          ...vendor,
          orders: vendor.orders + Math.floor(Math.random() * 5),
          rating: newRating
        };
      }) : []
    );

    setTopDoctors(prev => 
      prev ? prev.map(doctor => ({
        ...doctor,
        prescriptions: doctor.prescriptions + Math.floor(Math.random() * 3),
        satisfaction: `${Math.min(100, Math.max(90, parseInt(doctor.satisfaction) + Math.floor(Math.random() * 4 - 2)))}%`
      })) : []
    );
  };

  // Handle KPI button clicks - NEW FUNCTION
  const handleKPIClick = (kpiId, filterType) => {
    setActiveKPI(activeKPI === kpiId ? 'all' : kpiId);
    
    // Update KPI active states
    setKpiData(prev => prev.map(kpi => ({
      ...kpi,
      isActive: kpiId === 'all' || kpi.id === kpiId
    })));

    // Log the action for analytics
    console.log(`KPI ${kpiId} clicked, filter: ${filterType}`);
    
    // Show visual feedback
    if (kpiId !== 'all') {
      const clickedKPI = kpiData.find(k => k.id === kpiId);
      if (clickedKPI) {
        console.log(`Focusing on: ${clickedKPI.title} - ${clickedKPI.value}`);
      }
    }
  };

  // Handle vendor selection
  const handleVendorSelect = (vendor) => {
    setSelectedVendor(vendor);
    console.log('Selected Vendor:', vendor);
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    console.log('Selected Doctor:', doctor);
  };

  // Handle investigation start
  const startInvestigation = (alert) => {
    setIsInvestigating(true);
    
    const investigationDetails = {
      alertType: alert.type,
      module: alert.module,
      timestamp: new Date().toLocaleTimeString(),
      status: 'Investigating...',
      findings: [],
      recommendations: []
    };

    switch(alert.id) {
      case 'FR-10':
        investigationDetails.findings = [
          'High traffic congestion in downtown area',
          'Delivery personnel shortage detected',
          'Weather conditions affecting delivery times'
        ];
        investigationDetails.recommendations = [
          'Reroute deliveries through alternative paths',
          'Increase delivery personnel in affected area',
          'Implement weather-based delivery time adjustments'
        ];
        break;
      case 'FR-11':
        investigationDetails.findings = [
          'Inventory stock levels below threshold',
          'Multiple customer complaints about product quality',
          'Supplier delivery delays identified'
        ];
        investigationDetails.recommendations = [
          'Conduct immediate inventory audit',
          'Quality check for affected product batches',
          'Contact supplier for delivery schedule review'
        ];
        break;
      case 'FR-12':
        investigationDetails.findings = [
          'Prescription volume increased by 200% in 24 hours',
          'Multiple prescriptions for controlled substances',
          'Unusual prescription patterns detected'
        ];
        investigationDetails.recommendations = [
          'Schedule review with medical board',
          'Temporary prescription limitations',
          'Enhanced verification process implementation'
        ];
        break;
      case 'FR-13':
        investigationDetails.findings = [
          '23 support tickets related to delivery delays',
          'Average resolution time: 4.2 hours',
          'Customer satisfaction score dropped by 15%'
        ];
        investigationDetails.recommendations = [
          'Implement priority ticket system for delivery issues',
          'Add real-time delivery tracking for customers',
          'Train support team on delivery process updates'
        ];
        break;
      default:
        break;
    }

    setInvestigationData(investigationDetails);

    const investigationInterval = setInterval(() => {
      setInvestigationData(prev => {
        if (!prev) return prev;
        
        const newFindings = [
          ...prev.findings,
          `New data point analyzed at ${new Date().toLocaleTimeString()}`
        ];

        return {
          ...prev,
          status: `Analysis ${Math.floor(Math.random() * 100)}% complete`,
          findings: newFindings.slice(-5)
        };
      });
    }, 3000);

    setTimeout(() => {
      clearInterval(investigationInterval);
      setInvestigationData(prev => prev ? {
        ...prev,
        status: 'Investigation Complete',
        completedAt: new Date().toLocaleTimeString()
      } : null);
      setIsInvestigating(false);
    }, 15000);
  };

  // Handle alert clicks (FR-14) - Enhanced with investigation
  const handleAlertClick = (alert) => {
    console.log(`Starting investigation for: ${alert.type}`);
    startInvestigation(alert);
  };

  // Close investigation panel
  const closeInvestigation = () => {
    setInvestigationData(null);
    setIsInvestigating(false);
  };

  // UPDATED Filter functions to properly handle low, medium, high filters
  const getFilteredRevenueData = () => {
    if (revenueFilter === 'all') return revenueData;
    
    return revenueData.map(value => {
      if (revenueFilter === 'low' && value <= 15000) return value;
      if (revenueFilter === 'medium' && value > 15000 && value <= 20000) return value;
      if (revenueFilter === 'high' && value > 20000) return value;
      return 0; // Show 0 instead of hiding to maintain chart structure
    });
  };

  const getFilteredRefundData = () => {
    if (refundFilter === 'all') return refundData;
    
    return refundData.map(value => {
      if (refundFilter === 'low' && value <= 800) return value;
      if (refundFilter === 'medium' && value > 800 && value <= 1200) return value;
      if (refundFilter === 'high' && value > 1200) return value;
      return 0; // Show 0 instead of hiding to maintain chart structure
    });
  };

  // FIXED: Filter function for daily orders - now properly shows low values
  const getFilteredDailyOrdersData = () => {
    if (dailyOrdersFilter === 'all') return dailyOrders;
    
    const filteredData = dailyOrders.map(value => {
      if (dailyOrdersFilter === 'low' && value <= 8) return value;
      if (dailyOrdersFilter === 'medium' && value > 8 && value <= 15) return value;
      if (dailyOrdersFilter === 'high' && value > 15) return value;
      return 0; // Show 0 instead of hiding to maintain chart structure
    });
    
    return filteredData;
  };

  const getFilteredHeatmapData = () => {
    if (heatmapIntensityFilter === 'all') return heatmapData;
    
    return heatmapData.filter(region => {
      if (heatmapIntensityFilter === 'low') return region.intensity <= 0.4;
      if (heatmapIntensityFilter === 'medium') return region.intensity > 0.4 && region.intensity <= 0.7;
      if (heatmapIntensityFilter === 'high') return region.intensity > 0.7;
      return true;
    });
  };

  // Get filtered KPI data based on active selection - NEW FUNCTION
  const getFilteredKPIData = () => {
    if (activeKPI === 'all') return kpiData;
    return kpiData.filter(kpi => kpi.id === activeKPI);
  };

  // Handle chart focus change - NEW FUNCTION
  const handleChartFocusChange = (focus) => {
    setChartFocus(focus);
    console.log(`Chart focus changed to: ${focus}`);
  };

  // Chart rendering functions - FIXED with proper alignment and high value display
  const renderLineChart = () => {
    if (!dailyOrders || dailyOrders.length === 0) {
      return <div>Loading chart data...</div>;
    }
    
    const filteredDailyOrders = getFilteredDailyOrdersData();
    const maxValue = Math.max(...dailyOrders);
    const chartHeight = 200;
    
    return (
      <div style={{ height: `${chartHeight}px`, position: 'relative', padding: '10px 0' }}>
        {filteredDailyOrders.map((value, index) => {
          const height = value > 0 ? (value / maxValue) * (chartHeight - 40) : 0;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                bottom: '20px',
                left: `${(index / (filteredDailyOrders.length - 1)) * 100}%`,
                transform: 'translateX(-50%)',
                width: '8%',
                height: `${height}px`,
                backgroundColor: primaryColor,
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                opacity: (activeKPI === 'all' || activeKPI === 'FR-1') && value > 0 ? 1 : 0.3,
                transition: 'all 0.3s ease',
                minHeight: value > 0 ? '2px' : '0px' // Ensure even low values are visible
              }}
            >
              <span style={{ 
                position: 'absolute', 
                top: '-25px', 
                fontSize: '12px',
                fontWeight: 'bold',
                color: value > 0 ? primaryColor : '#CCC'
              }}>
                {value > 0 ? value : '-'}
              </span>
            </div>
          );
        })}
        
        {/* Connecting lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {filteredDailyOrders.slice(0, -1).map((_, index) => {
            if (filteredDailyOrders[index] === 0 || filteredDailyOrders[index + 1] === 0) return null;
            
            const x1 = (index / (filteredDailyOrders.length - 1)) * 100;
            const x2 = ((index + 1) / (filteredDailyOrders.length - 1)) * 100;
            const y1 = chartHeight - 20 - (filteredDailyOrders[index] / maxValue) * (chartHeight - 40);
            const y2 = chartHeight - 20 - (filteredDailyOrders[index + 1] / maxValue) * (chartHeight - 40);
            
            return (
              <line
                key={index}
                x1={`${x1}%`}
                y1={y1}
                x2={`${x2}%`}
                y2={y2}
                stroke={primaryColor}
                strokeWidth="2"
                strokeDasharray="0"
                opacity={(activeKPI === 'all' || activeKPI === 'FR-1') ? 1 : 0.3}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const renderBarChart = () => {
    if (!revenueData || !refundData || revenueData.length === 0 || refundData.length === 0) {
      return <div>Loading chart data...</div>;
    }
    
    const filteredRevenueData = getFilteredRevenueData();
    const filteredRefundData = getFilteredRefundData();
    
    // Calculate max value based on filtered data to ensure proper scaling
    const allFilteredValues = [...filteredRevenueData, ...filteredRefundData].filter(val => val > 0);
    const maxValue = allFilteredValues.length > 0 ? Math.max(...allFilteredValues) : Math.max(...revenueData, ...refundData);
    
    const chartHeight = 200;
    
    return (
      <div style={{ 
        height: `${chartHeight}px`, 
        position: 'relative', 
        padding: '10px 0', 
        display: 'flex', 
        alignItems: 'flex-end', 
        justifyContent: 'center',
        gap: '2%', // Further reduced gap for perfect alignment
        marginTop: '20px'
      }}>
        {revenueData.map((_, index) => (
          <div key={`day-${index}`} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '12%',
            height: '100%',
            justifyContent: 'flex-end',
            position: 'relative'
          }}>
            {/* Revenue Bar - Positioned on the left side */}
            <div
              style={{
                width: '40%', // Slightly wider for better visibility
                height: `${((filteredRevenueData[index] || 0) / maxValue) * (chartHeight - 60)}px`,
                backgroundColor: revenueColor,
                borderRadius: '4px 4px 0 0',
                opacity: (chartFocus === 'all' || chartFocus === 'revenue') && filteredRevenueData[index] > 0 ? 1 : 0.3,
                transition: 'all 0.3s ease',
                minHeight: filteredRevenueData[index] > 0 ? '3px' : '0px',
                position: 'absolute',
                left: '5%', // Moved left for better alignment
                border: filteredRevenueData[index] > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none'
              }}
              title={`Day ${index + 1} Revenue: $${filteredRevenueData[index]?.toLocaleString() || 0}`}
            />
            {/* Refund Bar - Positioned on the right side */}
            <div
              style={{
                width: '40%', // Slightly wider for better visibility
                height: `${((filteredRefundData[index] || 0) / maxValue) * (chartHeight - 60)}px`,
                backgroundColor: refundColor,
                borderRadius: '4px 4px 0 0',
                opacity: (chartFocus === 'all' || chartFocus === 'refunds') && filteredRefundData[index] > 0 ? 1 : 0.3,
                transition: 'all 0.3s ease',
                minHeight: filteredRefundData[index] > 0 ? '3px' : '0px',
                position: 'absolute',
                right: '5%', // Moved right for better alignment
                border: filteredRefundData[index] > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none'
              }}
              title={`Day ${index + 1} Refunds: $${filteredRefundData[index]?.toLocaleString() || 0}`}
            />
            
            {/* Day Label */}
            <span style={{ 
              fontSize: '10px', 
              marginTop: '5px', 
              color: '#666',
              position: 'absolute',
              bottom: '-20px',
              fontWeight: 'bold'
            }}>
              Day {index + 1}
            </span>
            
            {/* Value Labels */}
            {filteredRevenueData[index] > 0 && (chartFocus === 'all' || chartFocus === 'revenue') && (
              <div style={{
                position: 'absolute',
                top: `${chartHeight - 70 - ((filteredRevenueData[index] / maxValue) * (chartHeight - 60))}px`,
                left: '5%',
                fontSize: '9px',
                fontWeight: 'bold',
                color: revenueColor,
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '1px 3px',
                borderRadius: '2px',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap'
              }}>
                ${(filteredRevenueData[index] / 1000).toFixed(0)}k
              </div>
            )}
            
            {filteredRefundData[index] > 0 && (chartFocus === 'all' || chartFocus === 'refunds') && (
              <div style={{
                position: 'absolute',
                top: `${chartHeight - 70 - ((filteredRefundData[index] / maxValue) * (chartHeight - 60))}px`,
                right: '5%',
                fontSize: '9px',
                fontWeight: 'bold',
                color: refundColor,
                backgroundColor: 'rgba(255,255,255,0.9)',
                padding: '1px 3px',
                borderRadius: '2px',
                transform: 'translateX(50%)',
                whiteSpace: 'nowrap'
              }}>
                ${filteredRefundData[index]}
              </div>
            )}
          </div>
        ))}
        
        {/* Legend - TOP RIGHT */}
        <div style={{ 
          position: 'absolute', 
          top: '-30px',
          right: '10px', 
          display: 'flex', 
          gap: '15px',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '8px 12px',
          borderRadius: '6px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              cursor: 'pointer',
              opacity: chartFocus === 'all' || chartFocus === 'revenue' ? 1 : 0.5,
              transition: 'all 0.3s ease',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: chartFocus === 'revenue' ? `${revenueColor}20` : 'transparent'
            }}
            onClick={() => handleChartFocusChange(chartFocus === 'revenue' ? 'all' : 'revenue')}
            title="Click to focus on revenue"
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: revenueColor, 
              borderRadius: '2px'
            }}></div>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Revenue</span>
          </div>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              cursor: 'pointer',
              opacity: chartFocus === 'all' || chartFocus === 'refunds' ? 1 : 0.5,
              transition: 'all 0.3s ease',
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: chartFocus === 'refunds' ? `${refundColor}20` : 'transparent'
            }}
            onClick={() => handleChartFocusChange(chartFocus === 'refunds' ? 'all' : 'refunds')}
            title="Click to focus on refunds"
          >
            <div style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: refundColor, 
              borderRadius: '2px'
            }}></div>
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Refunds</span>
          </div>
        </div>

        {/* Filter Buttons - TOP LEFT */}
        <div style={{ 
          position: 'absolute', 
          top: '-50px',
          left: '10px', 
          display: 'flex', 
          gap: '15px',
          alignItems: 'flex-start',
          flexWrap: 'wrap'
        }}>
          {/* Revenue Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: 'bold', 
              color: revenueColor, 
              marginBottom: '2px',
              textAlign: 'center'
            }}>
              Revenue Filter:
            </div>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
              {['all', 'low', 'medium', 'high'].map(filter => (
                <button
                  key={`revenue-${filter}`}
                  onClick={() => setRevenueFilter(filter)}
                  style={{
                    padding: '3px 6px',
                    fontSize: '8px',
                    backgroundColor: revenueFilter === filter ? revenueColor : '#F0F0F0',
                    color: revenueFilter === filter ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    minWidth: '40px'
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Refund Filter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ 
              fontSize: '11px', 
              fontWeight: 'bold', 
              color: refundColor, 
              marginBottom: '2px',
              textAlign: 'center'
            }}>
              Refund Filter:
            </div>
            <div style={{ display: 'flex', gap: '3px', flexWrap: 'wrap' }}>
              {['all', 'low', 'medium', 'high'].map(filter => (
                <button
                  key={`refund-${filter}`}
                  onClick={() => setRefundFilter(filter)}
                  style={{
                    padding: '3px 6px',
                    fontSize: '8px',
                    backgroundColor: refundFilter === filter ? refundColor : '#F0F0F0',
                    color: refundFilter === filter ? 'white' : '#666',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.2s ease',
                    minWidth: '40px'
                  }}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render real-time heatmap - FIXED with null safety
  const renderHeatmap = () => {
    const filteredHeatmapData = getFilteredHeatmapData();
    
    if (!filteredHeatmapData || filteredHeatmapData.length === 0) {
      return <div>No data available for selected filter</div>;
    }

    return (
      <div style={{
        height: '250px',
        background: `linear-gradient(45deg, ${accentColor} 0%, ${primaryColor} 100%)`,
        borderRadius: '5px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {filteredHeatmapData.map((region) => (
          <div
            key={region.id}
            style={{
              position: 'absolute',
              top: `${region.y}%`,
              left: `${region.x}%`,
              width: `${40 + region.intensity * 60}px`,
              height: `${40 + region.intensity * 60}px`,
              borderRadius: '50%',
              backgroundColor: `rgba(255, 255, 255, ${0.2 + region.intensity * 0.4})`,
              boxShadow: `0 0 ${15 + region.intensity * 25}px rgba(124, 42, 98, ${0.4 + region.intensity * 0.3})`,
              transform: 'translate(-50%, -50%)',
              transition: 'all 3s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: 'bold',
              color: primaryColor,
              cursor: 'pointer',
              textAlign: 'center',
              padding: '5px'
            }}
            title={`${region.name}: ${region.orders} orders | Growth: ${region.growth} | Delivery: ${region.deliveryTime}`}
          >
            {region.intensity > 0.6 && (
              <>
                <div>{region.name}</div>
                <div style={{ fontSize: '8px', marginTop: '2px' }}>
                  {region.orders} orders
                </div>
                <div style={{ 
                  fontSize: '7px', 
                  color: region.trend === 'rising' ? '#4CAF50' : region.trend === 'declining' ? '#F44336' : '#FFA500'
                }}>
                  {region.growth} • {region.deliveryTime}
                </div>
              </>
            )}
          </div>
        ))}
        
        {/* Heatmap Legend */}
        <div style={{ 
          position: 'absolute', 
          top: '10px', 
          left: '10px', 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          padding: '8px 12px', 
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 'bold',
          color: primaryColor,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <div>🌍 Live Demand Heatmap</div>
          <div style={{ fontSize: '9px', color: '#666', marginTop: '4px' }}>
            Real-time order concentration
          </div>
        </div>
        
        {/* Heatmap Stats */}
        <div style={{ 
          position: 'absolute', 
          bottom: '10px', 
          right: '10px', 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          padding: '8px 12px', 
          borderRadius: '8px',
          fontSize: '10px',
          color: primaryColor,
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <div>🔄 Updated: {heatmapUpdateTime.toLocaleTimeString()}</div>
          <div style={{ fontSize: '9px', color: '#666', marginTop: '4px' }}>
            Showing: {filteredHeatmapData.length} regions
          </div>
        </div>

        {/* Intensity Filter Buttons */}
        <div style={{ 
          position: 'absolute', 
          bottom: '10px', 
          left: '10px', 
          backgroundColor: 'rgba(255,255,255,0.95)', 
          padding: '8px 12px', 
          borderRadius: '8px',
          fontSize: '10px',
          color: primaryColor
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Demand Intensity Filter</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px' }}>
            {['all', 'low', 'medium', 'high'].map(filter => (
              <button
                key={`intensity-${filter}`}
                onClick={() => setHeatmapIntensityFilter(filter)}
                style={{
                  padding: '2px 6px',
                  fontSize: '8px',
                  backgroundColor: heatmapIntensityFilter === filter ? primaryColor : '#E0E0E0',
                  color: heatmapIntensityFilter === filter ? 'white' : '#666',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      height: '100vh',
      overflow: 'auto',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ color: primaryColor, marginBottom: '20px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px' }}>
        Analytics Dashboard
      </h2>
      
      {/* Investigation Panel */}
      {investigationData && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          zIndex: 1000,
          minWidth: '500px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          overflow: 'auto',
          border: `3px solid ${primaryColor}`
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: primaryColor, margin: 0 }}>Real-time Investigation</h3>
            <button 
              onClick={closeInvestigation}
              style={{
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Close
            </button>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: primaryColor }}>Alert: {investigationData.alertType}</h4>
            <p><strong>Module:</strong> {investigationData.module}</p>
            <p><strong>Status:</strong> 
              <span style={{ 
                color: isInvestigating ? '#FFA500' : '#4CAF50',
                fontWeight: 'bold',
                marginLeft: '10px'
              }}>
                {investigationData.status}
              </span>
            </p>
            <p><strong>Started:</strong> {investigationData.timestamp}</p>
            {investigationData.completedAt && (
              <p><strong>Completed:</strong> {investigationData.completedAt}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: primaryColor }}>Key Findings:</h4>
            <ul>
              {investigationData.findings && investigationData.findings.map((finding, index) => (
                <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ color: primaryColor }}>Recommendations:</h4>
            <ul>
              {investigationData.recommendations && investigationData.recommendations.map((recommendation, index) => (
                <li key={index} style={{ 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  backgroundColor: accentColor,
                  padding: '8px',
                  borderRadius: '5px'
                }}>
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>

          {isInvestigating && (
            <div style={{
              marginTop: '20px',
              padding: '10px',
              backgroundColor: '#FFF3CD',
              borderRadius: '5px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#856404'
            }}>
              🔍 Real-time analysis in progress... New findings are being added automatically.
            </div>
          )}
        </div>
      )}

      {/* KPI Overview - FR-1 to FR-5 with active navigation */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h3 style={{ color: primaryColor, margin: 0 }}>KPI Overview</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>Filter KPIs:</span>
            <button
              onClick={() => handleKPIClick('all', 'all')}
              style={{
                padding: '6px 12px',
                fontSize: '11px',
                backgroundColor: activeKPI === 'all' ? primaryColor : '#F0F0F0',
                color: activeKPI === 'all' ? 'white' : '#666',
                border: 'none',
                borderRadius: '15px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
            >
              Show All
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          {getFilteredKPIData().map(kpi => (
            <div 
              key={kpi.id} 
              onClick={() => handleKPIClick(kpi.id, kpi.filter)}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `2px solid ${activeKPI === kpi.id ? primaryColor : accentColor}`,
                textAlign: 'center',
                boxShadow: activeKPI === kpi.id ? `0 4px 12px ${primaryColor}40` : '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeKPI === kpi.id ? 'translateY(-2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (activeKPI !== kpi.id) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeKPI !== kpi.id) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }
              }}
            >
              <h4 style={{ 
                margin: '0 0 10px', 
                color: activeKPI === kpi.id ? primaryColor : '#666', 
                fontSize: '14px',
                fontWeight: activeKPI === kpi.id ? 'bold' : 'normal'
              }}>
                {kpi.title}
                {activeKPI === kpi.id && (
                  <span style={{ 
                    marginLeft: '8px', 
                    fontSize: '10px', 
                    backgroundColor: primaryColor, 
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '10px'
                  }}>
                    Active
                  </span>
                )}
              </h4>
              <div style={{ 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: activeKPI === kpi.id ? primaryColor : '#333', 
                marginBottom: '5px' 
              }}>
                {kpi.value}
              </div>
              <div style={{ 
                color: kpi.trend.startsWith('+') ? '#4CAF50' : '#F44336',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}>
                {kpi.trend.startsWith('+') ? '↗' : '↘'} {kpi.trend}
              </div>
              {activeKPI === kpi.id && (
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  marginTop: '8px',
                  fontStyle: 'italic'
                }}>
                  Click again to deselect
                </div>
              )}
            </div>
          ))}
        </div>
        {activeKPI !== 'all' && (
          <div style={{
            textAlign: 'center',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: accentColor,
            borderRadius: '5px',
            fontSize: '12px',
            color: primaryColor,
            fontWeight: 'bold'
          }}>
            🔍 Focusing on: {kpiData.find(k => k.id === activeKPI)?.title} • 
            Click any KPI card to filter or "Show All" to reset
          </div>
        )}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
        {/* Daily Orders Chart - FR-6, FR-7 */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h4 style={{ color: primaryColor, margin: 0 }}>Daily Orders Chart</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
              <div style={{ 
                fontSize: '11px', 
                fontWeight: 'bold', 
                color: primaryColor, 
                marginBottom: '5px',
                textAlign: 'center'
              }}>
                Orders Filter:
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['all', 'low', 'medium', 'high'].map(filter => (
                  <button
                    key={`orders-${filter}`}
                    onClick={() => setDailyOrdersFilter(filter)}
                    style={{
                      padding: '4px 8px',
                      fontSize: '9px',
                      backgroundColor: dailyOrdersFilter === filter ? primaryColor : '#F0F0F0',
                      color: dailyOrdersFilter === filter ? 'white' : '#666',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      minWidth: '45px'
                    }}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {renderLineChart()}
          <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '10px' }}>
            {dailyOrdersFilter !== 'all' ? 
              `🎯 Showing ${dailyOrdersFilter} orders only` : 
              (activeKPI === 'FR-1' ? '🎯 Focused on Orders Today' : 'Order volume over time with trend analysis')}
          </div>
        </div>
        
        {/* Revenue vs Refunds Chart - FR-8, FR-9 */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          <h4 style={{ 
            color: primaryColor, 
            marginBottom: '60px', // Increased margin to accommodate filters
            textAlign: 'center'
          }}>
            Revenue vs Refunds
            {chartFocus !== 'all' && (
              <span style={{ 
                fontSize: '12px', 
                marginLeft: '10px', 
                backgroundColor: chartFocus === 'revenue' ? revenueColor : refundColor,
                color: 'white',
                padding: '2px 8px',
                borderRadius: '10px'
              }}>
                {chartFocus === 'revenue' ? 'Revenue Focus' : 'Refunds Focus'}
              </span>
            )}
          </h4>
          {renderBarChart()}
          <div style={{ 
            fontSize: '12px', 
            color: '#666', 
            textAlign: 'center', 
            marginTop: '30px',
            position: 'absolute',
            bottom: '10px',
            left: '0',
            right: '0'
          }}>
            {chartFocus !== 'all' ? 
              `🎯 Focused on ${chartFocus}` : 
              'Comparison of successful revenue vs refund volume • Click legend to focus'}
          </div>
        </div>
      </div>

      {/* Rest of the components remain the same */}
      {/* Alerts Panel - FR-10 to FR-14 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Operational Flags</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {alerts && alerts.map(alert => (
            <div 
              key={alert.id} 
              onClick={() => handleAlertClick(alert)}
              style={{
                backgroundColor: accentColor,
                padding: '15px',
                borderRadius: '8px',
                borderLeft: `4px solid ${primaryColor}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ fontWeight: 'bold', color: primaryColor, marginBottom: '5px' }}>
                {alert.type}
              </div>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                {alert.meaning}
              </div>
              {alert.region && (
                <div style={{ fontSize: '12px', color: primaryColor }}>
                  <strong>Area:</strong> {alert.region} ({alert.delayRate})
                </div>
              )}
              {alert.vendor && (
                <div style={{ fontSize: '12px', color: primaryColor }}>
                  <strong>Vendor:</strong> {alert.vendor} ({alert.cancellationRate})
                </div>
              )}
              {alert.doctor && (
                <div style={{ fontSize: '12px', color: primaryColor }}>
                  <strong>Doctor:</strong> {alert.doctor} ({alert.prescriptionCount} prescriptions)
                </div>
              )}
              {alert.reason && (
                <div style={{ fontSize: '12px', color: primaryColor }}>
                  <strong>Issue:</strong> {alert.reason} ({alert.count} tickets)
                </div>
              )}
              <div style={{ 
                fontSize: '11px', 
                color: '#888', 
                marginTop: '8px', 
                fontStyle: 'italic',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <span>🔍 Click to investigate →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers - FR-15, FR-16 */}
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Top Performing Vendors & Doctors</h3>
        
        {/* Selected Vendor/Doctor Details */}
        {(selectedVendor || selectedDoctor) && (
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: `2px solid ${primaryColor}`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: primaryColor, marginBottom: '15px' }}>
              {selectedVendor ? 'Selected Vendor Details' : 'Selected Doctor Details'}
            </h4>
            {selectedVendor && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div><strong>Name:</strong> {selectedVendor.name}</div>
                <div><strong>Orders:</strong> {selectedVendor.orders}</div>
                <div><strong>Rating:</strong> <StarRating rating={parseFloat(selectedVendor.rating)} /></div>
                <div><strong>Location:</strong> {selectedVendor.location}</div>
                <div><strong>Performance:</strong> {selectedVendor.performance}</div>
                <div><strong>Growth:</strong> {selectedVendor.growth}</div>
              </div>
            )}
            {selectedDoctor && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                <div><strong>Name:</strong> {selectedDoctor.name}</div>
                <div><strong>Prescriptions:</strong> {selectedDoctor.prescriptions}</div>
                <div><strong>Approval Rate:</strong> {selectedDoctor.approvalRate}</div>
                <div><strong>Specialty:</strong> {selectedDoctor.specialty}</div>
                <div><strong>Satisfaction:</strong> {selectedDoctor.satisfaction}</div>
              </div>
            )}
            <button 
              onClick={() => { setSelectedVendor(null); setSelectedDoctor(null); }}
              style={{
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '15px',
                fontWeight: 'bold'
              }}
            >
              Clear Selection
            </button>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Top Vendors */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Top Vendors</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topVendors && topVendors.map((vendor) => (
                <div 
                  key={vendor.id} 
                  onClick={() => handleVendorSelect(vendor)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: selectedVendor?.id === vendor.id ? accentColor : 'transparent',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedVendor?.id === vendor.id ? `2px solid ${primaryColor}` : '1px solid #eee'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedVendor?.id !== vendor.id) {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedVendor?.id !== vendor.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', color: primaryColor }}>{vendor.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{vendor.orders} orders • {vendor.location}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2px'
                  }}>
                    <StarRating rating={parseFloat(vendor.rating)} />
                    <div style={{
                      backgroundColor: primaryColor,
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {vendor.growth}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Doctors */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Top Doctors</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {topDoctors && topDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  onClick={() => handleDoctorSelect(doctor)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    backgroundColor: selectedDoctor?.id === doctor.id ? accentColor : 'transparent',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: selectedDoctor?.id === doctor.id ? `2px solid ${primaryColor}` : '1px solid #eee'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedDoctor?.id !== doctor.id) {
                      e.currentTarget.style.backgroundColor = '#f9f9f9';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedDoctor?.id !== doctor.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 'bold', color: primaryColor }}>{doctor.name}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>{doctor.prescriptions} prescriptions • {doctor.specialty}</div>
                  </div>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2px'
                  }}>
                    <div style={{
                      backgroundColor: primaryColor,
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {doctor.approvalRate}
                    </div>
                    <div style={{
                      fontSize: '10px',
                      color: '#666'
                    }}>
                      {doctor.satisfaction} satisfaction
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Heatmap - FR-17 */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        border: `1px solid ${accentColor}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Geographic Demand Heatmap</h4>
        {renderHeatmap()}
        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '10px' }}>
          Real-time heatmap showing live geographic clusters of high order demand • Use intensity filter to focus on specific demand levels
        </div>
      </div>

      {/* Last Updated Timestamp */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#888', marginTop: '20px' }}>
        Last updated: {new Date().toLocaleTimeString()} | Data updates every 5 seconds
      </div>
    </div>
  );
};

export default AnalyticsDashboard;