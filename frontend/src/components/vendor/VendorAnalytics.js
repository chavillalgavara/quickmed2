import React from 'react';

const VendorAnalytics = ({
  analyticsData,
  formatIndianCurrency,
  setShowNotificationsBellModal,
  notifications
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

  const kpisGridStyle = {
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

  const kpiCardStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  };

  const kpiIconStyle = {
    fontSize: '32px',
    marginRight: '16px',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: '#F7D9EB'
  };

  const kpiContentStyle = {
    flex: 1
  };

  const kpiNumberStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  };

  const kpiLabelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  };

  const analyticsGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const chartSectionStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const chartTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 20px 0'
  };

  const chartContainerStyle = {
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end'
  };

  const chartBarsStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    width: '100%',
    height: '150px'
  };

  const chartBarContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  };

  const chartBarStyle = {
    backgroundColor: '#7C2A62',
    width: '30px',
    borderRadius: '4px 4px 0 0',
    minHeight: '10px'
  };

  const chartLabelStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginTop: '8px'
  };

  const chartValueStyle = {
    fontSize: '10px',
    color: '#7C2A62',
    fontWeight: '600',
    marginTop: '4px'
  };

  const efficiencyChartStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const efficiencyMetricStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const efficiencyLabelStyle = {
    fontSize: '14px',
    color: '#6b7280',
    minWidth: '120px'
  };

  const efficiencyBarStyle = {
    flex: 1,
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  };

  const efficiencyFillStyle = {
    height: '100%',
    backgroundColor: '#7C2A62',
    borderRadius: '4px'
  };

  const efficiencyValueStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#7C2A62',
    minWidth: '40px'
  };

  const heatmapSectionStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const heatmapContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const heatmapItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const localityNameStyle = {
    fontSize: '14px',
    color: '#6b7280',
    minWidth: '80px'
  };

  const heatmapBarStyle = {
    flex: 1,
    height: '8px',
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    overflow: 'hidden'
  };

  const heatmapFillStyle = {
    height: '100%',
    backgroundColor: '#7C2A62',
    borderRadius: '4px'
  };

  const localityOrdersStyle = {
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '600',
    minWidth: '60px'
  };

  const revenueChartStyle = {
    height: '200px',
    display: 'flex',
    alignItems: 'flex-end'
  };

  const revenueBarsStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '16px',
    width: '100%',
    height: '150px'
  };

  const revenueBarContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1
  };

  const revenueBarStyle = {
    backgroundColor: '#7C2A62',
    width: '30px',
    borderRadius: '4px 4px 0 0',
    minHeight: '10px'
  };

  return (
    <div style={mainContentStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>Business Analytics</h1>
          <p style={subtitleStyle}>Track your pharmacy performance and insights</p>
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
        </div>
      </div>

      <div style={kpisGridStyle}>
        <div style={kpiCardStyle}>
          <div style={kpiIconStyle}>📋</div>
          <div style={kpiContentStyle}>
            <h3 style={kpiNumberStyle}>{analyticsData.kpis.ordersToday}</h3>
            <p style={kpiLabelStyle}>Orders Today</p>
          </div>
        </div>

        <div style={kpiCardStyle}>
          <div style={kpiIconStyle}>⏱️</div>
          <div style={kpiContentStyle}>
            <h3 style={kpiNumberStyle}>{analyticsData.kpis.avgFulfillment}</h3>
            <p style={kpiLabelStyle}>Avg Fulfillment Time</p>
          </div>
        </div>

        <div style={kpiCardStyle}>
          <div style={kpiIconStyle}>📦</div>
          <div style={kpiContentStyle}>
            <h3 style={kpiNumberStyle}>{analyticsData.kpis.splitOrders}</h3>
            <p style={kpiLabelStyle}>Split Orders</p>
          </div>
        </div>

        <div style={kpiCardStyle}>
          <div style={kpiIconStyle}>💰</div>
          <div style={kpiContentStyle}>
            <h3 style={kpiNumberStyle}>
              {formatIndianCurrency(analyticsData.kpis.revenue)}
            </h3>
            <p style={kpiLabelStyle}>Revenue</p>
          </div>
        </div>
      </div>

      <div style={analyticsGridStyle}>
        <div style={chartSectionStyle}>
          <h3 style={chartTitleStyle}>Order Trends</h3>
          <div style={chartContainerStyle}>
            <div style={chartBarsStyle}>
              {analyticsData.orderTrends.map((day, index) => (
                <div key={index} style={chartBarContainerStyle}>
                  <div 
                    style={{
                      ...chartBarStyle,
                      height: `${(day.orders / 35) * 100}px`
                    }}
                  ></div>
                  <span style={chartLabelStyle}>{day.day}</span>
                  <span style={chartValueStyle}>{day.orders}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={chartSectionStyle}>
          <h3 style={chartTitleStyle}>Delivery Efficiency</h3>
          <div style={efficiencyChartStyle}>
            <div style={efficiencyMetricStyle}>
              <span style={efficiencyLabelStyle}>On Time Delivery</span>
              <div style={efficiencyBarStyle}>
                <div style={{...efficiencyFillStyle, width: '85%'}}></div>
              </div>
              <span style={efficiencyValueStyle}>85%</span>
            </div>
            <div style={efficiencyMetricStyle}>
              <span style={efficiencyLabelStyle}>Order Accuracy</span>
              <div style={efficiencyBarStyle}>
                <div style={{...efficiencyFillStyle, width: '92%'}}></div>
              </div>
              <span style={efficiencyValueStyle}>92%</span>
            </div>
            <div style={efficiencyMetricStyle}>
              <span style={efficiencyLabelStyle}>Customer Satisfaction</span>
              <div style={efficiencyBarStyle}>
                <div style={{...efficiencyFillStyle, width: '88%'}}></div>
              </div>
              <span style={efficiencyValueStyle}>88%</span>
            </div>
          </div>
        </div>

        <div style={heatmapSectionStyle}>
          <h3 style={chartTitleStyle}>High-Demand Localities</h3>
          <div style={heatmapContainerStyle}>
            {analyticsData.topLocalities.map((locality, index) => (
              <div key={index} style={heatmapItemStyle}>
                <span style={localityNameStyle}>{locality.area}</span>
                <div style={heatmapBarStyle}>
                  <div 
                    style={{
                      ...heatmapFillStyle,
                      width: `${(locality.orders / 45) * 100}%`
                    }}
                  ></div>
                </div>
                <span style={localityOrdersStyle}>{locality.orders} orders</span>
              </div>
            ))}
          </div>
        </div>

        <div style={chartSectionStyle}>
          <h3 style={chartTitleStyle}>Revenue Trend</h3>
          <div style={revenueChartStyle}>
            <div style={revenueBarsStyle}>
              {analyticsData.orderTrends.map((day, index) => (
                <div key={index} style={revenueBarContainerStyle}>
                  <div 
                    style={{
                      ...revenueBarStyle,
                      height: `${(day.revenue / 11500) * 100}px`
                    }}
                  ></div>
                  <span style={chartLabelStyle}>{day.day}</span>
                  <span style={chartValueStyle}>{formatIndianCurrency(day.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;