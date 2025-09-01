// Dashboard Data
const dashboardData = {
    summary: {
        totalUsers: 12453,
        revenue: 89432,
        engagement: 67,
        newOrders: 342
    },
    monthlyData: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        users: [8200, 9350, 10480, 11650, 12800, 13950, 15100, 16300, 17453],
        revenue: [48000, 51500, 55500, 60500, 67500, 75200, 82500, 86900, 89432],
        engagement: [62, 65, 63, 67, 66, 69, 68, 66, 67],
        orders: [280, 310, 290, 320, 340, 360, 350, 365, 380]
    },
    categories: [
        { name: 'Electronics', value: 35, color: '#4361ee' },
        { name: 'Fashion', value: 25, color: '#4cc9f0' },
        { name: 'Home & Garden', value: 20, color: '#4bb543' },
        { name: 'Books', value: 12, color: '#f9c74f' },
        { name: 'Others', value: 8, color: '#ef476f' }
    ],
    recentActivities: [
        { id: 1001, user: 'John Doe', action: 'Purchase', time: '2 mins ago', status: 'completed' },
        { id: 1002, user: 'Jane Smith', action: 'Account Update', time: '15 mins ago', status: 'completed' },
        { id: 1003, user: 'Bob Johnson', action: 'Login', time: '32 mins ago', status: 'completed' },
        { id: 1004, user: 'Alice Brown', action: 'Password Reset', time: '1 hour ago', status: 'pending' },
        { id: 1005, user: 'Charlie Wilson', action: 'Purchase', time: '2 hours ago', status: 'completed' }
    ],
    topProducts: [
        { name: 'Wireless Earbuds', sales: 1245, revenue: 18675 },
        { name: 'Smart Watch', sales: 987, revenue: 24675 },
        { name: 'Bluetooth Speaker', sales: 756, revenue: 15120 },
        { name: 'Laptop Backpack', sales: 543, revenue: 8145 },
        { name: 'Phone Case', sales: 432, revenue: 2160 }
    ],
    trafficSources: [
        { name: 'Organic Search', percent: 45, color: '#4361ee' },
        { name: 'Direct', percent: 30, color: '#4bb543' },
        { name: 'Social', percent: 15, color: '#f9c74f' },
        { name: 'Email', percent: 10, color: '#ef476f' }
    ]
};

// DOM Elements
const elements = {
    totalUsers: document.getElementById('total-users'),
    revenue: document.getElementById('revenue'),
    engagement: document.getElementById('engagement'),
    newOrders: document.getElementById('new-orders'),
    activityBody: document.getElementById('activity-body'),
    topProducts: document.getElementById('top-products'),
    trafficSources: document.getElementById('traffic-sources'),
    themeToggle: document.querySelector('.theme-toggle'),
    sidebarToggle: document.querySelector('.sidebar-toggle'),
    sidebar: document.querySelector('.sidebar'),
    dateRange: document.querySelector('.date-range'),
    chartFilters: {
        performance: document.querySelectorAll('.chart-actions button'),
        revenue: document.querySelector('.chart-filter')
    },
    covidConfirmed: document.getElementById('covid-confirmed'),
    covidRecovered: document.getElementById('covid-recovered'),
    covidDeaths: document.getElementById('covid-deaths'),
    covidCountry: document.getElementById('covid-country')
};

async function fetchCovidData(country = 'all') {
    try {
        const response = await fetch(`https://disease.sh/v3/covid-19/${country === 'global' ? 'all' : `countries/${country}`}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching COVID data:', error);
        return null;
    }
}

async function updateCovidData() {
    const country = elements.covidCountry.value;
    const data = await fetchCovidData(country);
    
    if (data) {
        elements.covidConfirmed.textContent = formatNumber(data.cases);
        elements.covidRecovered.textContent = formatNumber(data.recovered);
        elements.covidDeaths.textContent = formatNumber(data.deaths);
    }
}

// Add event listener
if (elements.covidCountry) {
    elements.covidCountry.addEventListener('change', updateCovidData);
}


// Format numbers with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Format currency
function formatCurrency(amount) {
    return '$' + formatNumber(amount);
}

// Update summary cards
function updateSummaryCards() {
    elements.totalUsers.textContent = formatNumber(dashboardData.summary.totalUsers);
    elements.revenue.textContent = formatCurrency(dashboardData.summary.revenue);
    elements.engagement.textContent = dashboardData.summary.engagement + '%';
    elements.newOrders.textContent = formatNumber(dashboardData.summary.newOrders);
}

// Initialize Line Chart
function initLineChart() {
    const ctx = document.getElementById('lineChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.lineChart) {
        window.lineChart.destroy();
    }
    
    window.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dashboardData.monthlyData.labels,
            datasets: [
                {
                    label: 'Users',
                    data: dashboardData.monthlyData.users,
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#4361ee',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    yAxisID: 'y'
                },
                {
                    label: 'Revenue',
                    data: dashboardData.monthlyData.revenue,
                    borderColor: '#4bb543',
                    backgroundColor: 'rgba(75, 181, 67, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#4bb543',
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        color: 'var(--dark-color)'
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--light-color)',
                    titleColor: 'var(--dark-color)',
                    bodyColor: 'var(--dark-color)',
                    borderColor: 'var(--gray-300)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.dataset.label === 'Revenue') {
                                    label += formatCurrency(context.parsed.y);
                                } else {
                                    label += formatNumber(context.parsed.y);
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        color: 'var(--gray-200)'
                    },
                    ticks: {
                        color: 'var(--gray-600)'
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'var(--gray-200)',
                        borderDash: [5, 5],
                        drawBorder: false
                    },
                    ticks: {
                        color: 'var(--gray-600)',
                        callback: function(value) {
                            return formatNumber(value);
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: 'var(--gray-600)',
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    }
                }
            }
        }
    });
}

// Initialize Doughnut Chart
function initDoughnutChart() {
    const ctx = document.getElementById('doughnutChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.doughnutChart) {
        window.doughnutChart.destroy();
    }
    
    window.doughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: dashboardData.categories.map(item => item.name),
            datasets: [{
                data: dashboardData.categories.map(item => item.value),
                backgroundColor: dashboardData.categories.map(item => item.color),
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        color: 'var(--dark-color)',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--light-color)',
                    titleColor: 'var(--dark-color)',
                    bodyColor: 'var(--dark-color)',
                    borderColor: 'var(--gray-300)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value}% (${percentage}% of total)`;
                        }
                    }
                }
            }
        }
    });
}

// Populate recent activities
function populateRecentActivities() {
    const activityRows = dashboardData.recentActivities.map(activity => `
        <tr class="fade-in">
            <td>#${activity.id}</td>
            <td>
                <div class="d-flex align-center">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(activity.user)}&background=random" 
                         alt="${activity.user}" class="user-avatar">
                    <span>${activity.user}</span>
                </div>
            </td>
            <td>${activity.action}</td>
            <td>${activity.time}</td>
            <td><span class="status ${activity.status}">${activity.status}</span></td>
            <td>
                <button class="btn-icon" title="View Details">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    elements.activityBody.innerHTML = activityRows;
}

// Populate top products
function populateTopProducts() {
    const productItems = dashboardData.topProducts.map(product => `
        <div class="product-item">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-sales">${formatNumber(product.sales)} sales • ${formatCurrency(product.revenue)}</div>
            </div>
            <div class="product-amount">${formatCurrency(product.revenue)}</div>
        </div>
    `).join('');
    
    elements.topProducts.innerHTML = productItems;
}

// Populate traffic sources
function populateTrafficSources() {
    const trafficItems = dashboardData.trafficSources.map(source => `
        <div class="traffic-source">
            <div class="source-header">
                <span class="source-name">${source.name}</span>
                <span class="source-percent">${source.percent}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress ${source.name.toLowerCase().replace(' ', '-')}" 
                     style="width: ${source.percent}%; background: ${source.color};"></div>
            </div>
        </div>
    `).join('');
    
    elements.trafficSources.innerHTML = trafficItems;
}

// Toggle theme
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Update charts to match theme
    if (window.lineChart) window.lineChart.update();
    if (window.doughnutChart) window.doughnutChart.update();
}

// Toggle sidebar on mobile
function toggleSidebar() {
    elements.sidebar.classList.toggle('active');
}

// Update date range display
function updateDateRange(range = 'Last 30 days') {
    const rangeText = elements.dateRange.querySelector('span');
    rangeText.textContent = range;
}

// Handle chart filter changes
function handleChartFilter(chartType, filter) {
    // In a real app, this would fetch new data based on the filter
    console.log(`Filter changed for ${chartType}:`, filter);
    
    // For demo purposes, we'll just update the active state of the buttons
    if (chartType === 'performance') {
        elements.chartFilters.performance.forEach(btn => {
            btn.classList.toggle('active', btn.textContent === filter);
        });
    }
}

// Simulate real-time updates
function simulateUpdates() {
    // Update summary numbers with animation
    let count = 0;
    const duration = 2000; // 2 seconds
    const step = 25; // update every 25ms
    const steps = duration / step;
    
    const values = {
        users: { current: 0, target: dashboardData.summary.totalUsers },
        revenue: { current: 0, target: dashboardData.summary.revenue },
        engagement: { current: 0, target: dashboardData.summary.engagement },
        orders: { current: 0, target: dashboardData.summary.newOrders }
    };
    
    const increment = (target, steps) => Math.ceil(target / steps);
    
    const updateCounter = () => {
        count++;
        
        // Update users
        if (values.users.current < values.users.target) {
            values.users.current = Math.min(
                values.users.current + increment(values.users.target, steps),
                values.users.target
            );
            elements.totalUsers.textContent = formatNumber(values.users.current);
        }
        
        // Update revenue
        if (values.revenue.current < values.revenue.target) {
            values.revenue.current = Math.min(
                values.revenue.current + increment(values.revenue.target, steps),
                values.revenue.target
            );
            elements.revenue.textContent = formatCurrency(values.revenue.current);
        }
        
        // Update engagement
        if (values.engagement.current < values.engagement.target) {
            values.engagement.current = Math.min(
                values.engagement.current + (values.engagement.target / steps),
                values.engagement.target
            );
            elements.engagement.textContent = Math.round(values.engagement.current) + '%';
        }
        
        // Update orders
        if (values.orders.current < values.orders.target) {
            values.orders.current = Math.min(
                values.orders.current + increment(values.orders.target, steps),
                values.orders.target
            );
            elements.newOrders.textContent = formatNumber(values.orders.current);
        }
        
        if (count < steps) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    updateCounter();
}

// Event Listeners
function initEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Sidebar toggle for mobile
    if (elements.sidebarToggle) {
        elements.sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Chart filters
    elements.chartFilters.performance.forEach(btn => {
        btn.addEventListener('click', () => {
            handleChartFilter('performance', btn.textContent);
        });
    });
    
    elements.chartFilters.revenue.addEventListener('change', (e) => {
        handleChartFilter('revenue', e.target.value);
    });
    
    // Date range picker (simplified for demo)
    elements.dateRange.addEventListener('click', () => {
        // In a real app, this would open a date picker
        const ranges = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'This Month', 'Last Month'];
        const currentIndex = ranges.indexOf(elements.dateRange.querySelector('span').textContent);
        const nextIndex = (currentIndex + 1) % ranges.length;
        updateDateRange(ranges[nextIndex]);
    });
}

// Initialize the dashboard
function initDashboard() {
    // Check for saved theme preference

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Initialize components
    updateSummaryCards();
    initLineChart();
    initDoughnutChart();
    populateRecentActivities();
    populateTopProducts();
    populateTrafficSources();
    initEventListeners();
    updateCovidData();
    
    // Simulate loading data
    setTimeout(simulateUpdates, 500);
}

// Start the dashboard when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initDashboard);

// Add styles for dynamically added elements
const style = document.createElement('style');
style.textContent = `
    .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 0.75rem;
        object-fit: cover;
    }
    
    .btn-icon {
        background: none;
        border: none;
        color: var(--gray-500);
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
    }
    
    .btn-icon:hover {
        background: var(--gray-200);
        color: var(--dark-color);
    }
    
    .sidebar-toggle {
        display: none;
        background: none;
        border: none;
        color: var(--dark-color);
        font-size: 1.25rem;
        cursor: pointer;
        margin-right: 1rem;
    }
    
    @media (max-width: 992px) {
        .sidebar-toggle {
            display: block;
        }
    }
`;
document.head.appendChild(style);
