// Demo test data
const DEMO_DATA = {
    vendors: {
        data: {
            vendorItems: [
                {
                    vendorName: "TechCorp Solutions",
                    vendorType: "External",
                    credit: 125000.50,
                    debitAsAssociated: 15000.00,
                    debitToVendor: 95000.25,
                    totalDebit: 110000.25,
                    profitAmount: 15000.25,
                    profitPercentage: 12.5
                },
                {
                    vendorName: "Digital Dynamics",
                    vendorType: "Internal",
                    credit: 85000.00,
                    debitAsAssociated: 8500.00,
                    debitToVendor: 65000.00,
                    totalDebit: 73500.00,
                    profitAmount: 11500.00,
                    profitPercentage: 15.6
                },
                {
                    vendorName: "Creative Agency Pro",
                    vendorType: "External",
                    credit: 45000.75,
                    debitAsAssociated: 5000.00,
                    debitToVendor: 35000.50,
                    totalDebit: 40000.50,
                    profitAmount: 5000.25,
                    profitPercentage: 11.1
                },
                {
                    vendorName: "InnovateIT",
                    vendorType: "Internal",
                    credit: 92000.00,
                    debitAsAssociated: 12000.00,
                    debitToVendor: 68000.00,
                    totalDebit: 80000.00,
                    profitAmount: 12000.00,
                    profitPercentage: 13.0
                },
                {
                    vendorName: "MarketMaster",
                    vendorType: "External",
                    credit: 67500.25,
                    debitAsAssociated: 7500.00,
                    debitToVendor: 52000.00,
                    totalDebit: 59500.00,
                    profitAmount: 8000.25,
                    profitPercentage: 11.9
                }
            ]
        }
    },
    projects: {
        data: {
            projectItems: [
                {
                    projectName: "E-commerce Platform",
                    projectCategory: "Web Development",
                    credit: 180000.00,
                    debitToExternalVendors: 95000.00,
                    debitToInternalVendors: 45000.00,
                    totalDebit: 140000.00,
                    profitAmount: 40000.00,
                    profitPercentage: 22.2
                },
                {
                    projectName: "Mobile Banking App",
                    projectCategory: "Mobile Development",
                    credit: 250000.50,
                    debitToExternalVendors: 125000.00,
                    debitToInternalVendors: 75000.25,
                    totalDebit: 200000.25,
                    profitAmount: 50000.25,
                    profitPercentage: 20.0
                },
                {
                    projectName: "CRM System",
                    projectCategory: "Enterprise Software",
                    credit: 120000.00,
                    debitToExternalVendors: 65000.00,
                    debitToInternalVendors: 35000.00,
                    totalDebit: 100000.00,
                    profitAmount: 20000.00,
                    profitPercentage: 16.7
                },
                {
                    projectName: "Marketing Campaign",
                    projectCategory: "Digital Marketing",
                    credit: 75000.75,
                    debitToExternalVendors: 45000.00,
                    debitToInternalVendors: 15000.00,
                    totalDebit: 60000.00,
                    profitAmount: 15000.75,
                    profitPercentage: 20.0
                },
                {
                    projectName: "Data Analytics Platform",
                    projectCategory: "Data Science",
                    credit: 195000.00,
                    debitToExternalVendors: 110000.00,
                    debitToInternalVendors: 55000.00,
                    totalDebit: 165000.00,
                    profitAmount: 30000.00,
                    profitPercentage: 15.4
                }
            ]
        }
    },
    clients: {
        data: {
            clientItems: [
                {
                    clientName: "GlobalTech Industries",
                    clientType: "Enterprise",
                    credit: 320000.00,
                    debitToExternalVendors: 180000.00,
                    debitToInternalVendors: 95000.00,
                    totalDebit: 275000.00,
                    profitAmount: 45000.00,
                    profitPercentage: 14.1
                },
                {
                    clientName: "StartupXYZ",
                    clientType: "Startup",
                    credit: 85000.50,
                    debitToExternalVendors: 45000.00,
                    debitToInternalVendors: 25000.00,
                    totalDebit: 70000.00,
                    profitAmount: 15000.50,
                    profitPercentage: 18.2
                },
                {
                    clientName: "RetailChain Plus",
                    clientType: "Retail",
                    credit: 150000.25,
                    debitToExternalVendors: 85000.00,
                    debitToInternalVendors: 40000.00,
                    totalDebit: 125000.00,
                    profitAmount: 25000.25,
                    profitPercentage: 16.7
                },
                {
                    clientName: "FinanceCorpABC",
                    clientType: "Financial",
                    credit: 280000.75,
                    debitToExternalVendors: 165000.00,
                    debitToInternalVendors: 75000.00,
                    totalDebit: 240000.00,
                    profitAmount: 40000.75,
                    profitPercentage: 14.3
                },
                {
                    clientName: "HealthcarePlus",
                    clientType: "Healthcare",
                    credit: 190000.00,
                    debitToExternalVendors: 105000.00,
                    debitToInternalVendors: 55000.00,
                    totalDebit: 160000.00,
                    profitAmount: 30000.00,
                    profitPercentage: 15.8
                }
            ]
        }
    }
};

// Switch between tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to selected button and panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            // Apply active filter for new tab
            applyActiveFilterToTab(targetTab);
        });
    });

    // Setup filter handlers for all tabs
    initializeFilterHandlers();

    // Load data for current month when page loads
    loadAnalytics('vendors', 'current-month');
});

// Function to apply active filter to selected tab
function applyActiveFilterToTab(tabType) {
    // Find active filter button for current tab
    const activeFilterButton = document.querySelector(`[data-tab-type="${tabType}"].filter-btn.active`);

    if (activeFilterButton) {
        const filterType = activeFilterButton.getAttribute('data-filter');
        handleFilterSelection(tabType, filterType);
    } else {
        // If no active filter, set default "current-month"
        const defaultFilterButton = document.querySelector(`[data-tab-type="${tabType}"][data-filter="current-month"]`);
        if (defaultFilterButton) {
            // Remove active class from all buttons of this tab
            document.querySelectorAll(`[data-tab-type="${tabType}"]`)
                .forEach(btn => btn.classList.remove('active'));

            // Add active class to default button
            defaultFilterButton.classList.add('active');

            // Apply filter
            handleFilterSelection(tabType, 'current-month');
        }
    }
}

// Setup handlers for filter buttons
function initializeFilterHandlers() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab-type');
            const filterType = this.getAttribute('data-filter');

            // Remove active class from all buttons of this tab
            document.querySelectorAll(`[data-tab-type="${tabType}"]`)
                .forEach(btn => btn.classList.remove('active'));

            // Add active class to selected button
            this.classList.add('active');

            // Handle filter selection
            handleFilterSelection(tabType, filterType);
        });
    });
}

// Handle filter selection
function handleFilterSelection(tabType, filterType) {
    const periodInput = document.getElementById(`period-${tabType}`);
    const currentPeriod = document.getElementById(`current-period-${tabType}`);

    // Hide period selection field
    if (periodInput) {
        periodInput.classList.remove('show');
    }

    let periodText = '';

    switch(filterType) {
        case 'current-month':
            periodText = 'Current Month';
            loadAnalytics(tabType, 'current-month');
            break;
        case 'current-quarter':
            const quarterDates = calculateDates('current-quarter');
            periodText = `Current Quarter (${quarterDates.startDate.split(' ')[0]} to ${quarterDates.endDate.split(' ')[0]})`;
            loadAnalytics(tabType, 'current-quarter');
            break;
        case 'all-time':
            periodText = 'All Time';
            loadAnalytics(tabType, 'all-time');
            break;
        case 'period':
            periodText = 'Custom Period';
            if (periodInput) {
                periodInput.classList.add('show');
            }
            break;
    }

    if (currentPeriod) {
        currentPeriod.textContent = `analytics for: ${periodText}`;
    }
}

// Apply custom period
function applyCustomPeriod(tabType) {
    const dateFrom = document.getElementById(`date-from-${tabType}`).value;
    const dateTo = document.getElementById(`date-to-${tabType}`).value;

    if (!dateFrom || !dateTo) {
        alert('Пожалуйста, выберите обе даты');
        return;
    }

    if (dateFrom > dateTo) {
        alert('Дата начала не может быть позже даты окончания');
        return;
    }

    const currentPeriod = document.getElementById(`current-period-${tabType}`);
    if (currentPeriod) {
        currentPeriod.textContent = `analytic for: ${dateFrom} to ${dateTo}`;
    }

    // Convert dates to needed format and load analytics
    const startDateTime = dateFrom + ' 00:00:00';
    const endDateTime = dateTo + ' 23:59:59';

    loadAnalytics(tabType, 'custom', startDateTime, endDateTime);
}

// Calculate dates for filters
function calculateDates(filterType) {
    const now = new Date();
    let startDate, endDate;

    switch(filterType) {
        case 'current-month':
            // Start of current month
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            // Today
            endDate = new Date();
            break;

        case 'current-quarter':
            // Find current quarter
            const currentMonth = now.getMonth();
            let quarterStartMonth;

            if (currentMonth >= 0 && currentMonth <= 2) { // January-March
                quarterStartMonth = 0;
            } else if (currentMonth >= 3 && currentMonth <= 5) { // April-June
                quarterStartMonth = 3;
            } else if (currentMonth >= 6 && currentMonth <= 8) { // July-September
                quarterStartMonth = 6;
            } else { // October-December
                quarterStartMonth = 9;
            }

            startDate = new Date(now.getFullYear(), quarterStartMonth, 1);
            endDate = new Date();
            break;

        case 'all-time':
            // Fixed dates
            startDate = new Date('2015-04-28T14:42:00');
            endDate = new Date('2026-04-28T14:42:00');
            break;
    }

    // Format dates to required format yyyy-MM-dd HH:mm:ss
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    return {
        startDate: formatDate(startDate),
        endDate: formatDate(endDate)
    };
}

// Main function to load analytics (modified for demo)
function loadAnalytics(tabType, filterType, customStartDate = null, customEndDate = null) {
    let startDate, endDate;

    if (filterType === 'custom' && customStartDate && customEndDate) {
        startDate = customStartDate;
        endDate = customEndDate;
    } else {
        const dates = calculateDates(filterType);
        startDate = dates.startDate;
        endDate = dates.endDate;
    }

    console.log(`Loading ${tabType} analytics from ${startDate} to ${endDate}`);

    // Show loading indicator
    showLoading(tabType);

    // Simulate API delay and load demo data
    setTimeout(() => {
        const demoData = DEMO_DATA[tabType];
        if (demoData) {
            console.log(`Demo data loaded for ${tabType}:`, demoData);
            renderTable(tabType, demoData);
        } else {
            showError(tabType, 'Demo data not found');
        }
    }, 800); // 800ms delay to simulate API call
}

// Send request to server (disabled for demo)
function sendRequest(tabType, startDate, endDate) {
    // This function is disabled in demo mode
    console.log('Demo mode: API requests are disabled');
}

// Show loading indicator
function showLoading(tabType) {
    const container = document.getElementById(`table-container-${tabType}`);
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <i class="fa fa-spinner fa-spin"></i><br>
                Loading ${tabType} analytics...
            </div>
        `;
    }
}

// Show error message
function showError(tabType, errorMessage) {
    const container = document.getElementById(`table-container-${tabType}`);
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fa fa-exclamation-triangle"></i>
                Error loading ${tabType} analytics: ${errorMessage}
            </div>
        `;
    }
}

// Show empty state
function showEmptyState(tabType) {
    const container = document.getElementById(`table-container-${tabType}`);
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fa fa-inbox"></i><br>
                No ${tabType} data found for the selected period
            </div>
        `;
    }
}

// Format numbers for display
function formatNumber(value) {
    if (value === 0) return { class: 'zero-number', text: '0.00' };
    if (value > 0) return { class: 'positive-number', text: '+' + value.toFixed(2) };
    if (value < 0) return { class: 'negative-number', text: value.toFixed(2) };
    return { class: '', text: value.toString() };
}

// Main function to render table
function renderTable(tabType, data) {
    switch(tabType) {
        case 'vendors':
            renderVendorsTable(data);
            break;
        case 'projects':
            renderProjectsTable(data);
            break;
        case 'clients':
            renderClientsTable(data);
            break;
    }
}

// Render table for Vendors
function renderVendorsTable(data) {
    const container = document.getElementById('table-container-vendors');
    const items = data.data.vendorItems;

    if (!items || items.length === 0) {
        showEmptyState('vendors');
        return;
    }

    let tableHTML = `
            <div class="analytics-table">
                <table>
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
                            <th>Type</th>
                            <th>Credit</th>
                            <th>Debit as Associated</th>
                            <th>Debit to Vendor</th>
                            <th>Total Debit</th>
                            <th>Profit Amount</th>
                            <th>Profit %</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

    items.forEach(item => {
        const credit = formatNumber(item.credit);
        const debitAsAssociated = formatNumber(item.debitAsAssociated);
        const debitToVendor = formatNumber(item.debitToVendor);
        const totalDebit = formatNumber(item.totalDebit);
        const profitAmount = formatNumber(item.profitAmount);
        const profitPercentage = formatNumber(item.profitPercentage);

        tableHTML += `
                <tr>
                    <td>${item.vendorName}</td>
                    <td>${item.vendorType}</td>
                    <td class="number-cell ${credit.class}">${credit.text}</td>
                    <td class="number-cell ${debitAsAssociated.class}">${debitAsAssociated.text}</td>
                    <td class="number-cell ${debitToVendor.class}">${debitToVendor.text}</td>
                    <td class="number-cell ${totalDebit.class}">${totalDebit.text}</td>
                    <td class="number-cell ${profitAmount.class}">${profitAmount.text}</td>
                    <td class="number-cell ${profitPercentage.class}">${profitPercentage.text}%</td>
                </tr>
            `;
    });

    tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

    container.innerHTML = tableHTML;
}

// Render table for Projects
function renderProjectsTable(data) {
    const container = document.getElementById('table-container-projects');
    const items = data.data.projectItems;

    if (!items || items.length === 0) {
        showEmptyState('projects');
        return;
    }

    let tableHTML = `
            <div class="analytics-table">
                <table>
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Category</th>
                            <th>Credit</th>
                            <th>Debit to External</th>
                            <th>Debit to Internal</th>
                            <th>Total Debit</th>
                            <th>Profit Amount</th>
                            <th>Profit %</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

    items.forEach(item => {
        const credit = formatNumber(item.credit);
        const debitToExternal = formatNumber(item.debitToExternalVendors);
        const debitToInternal = formatNumber(item.debitToInternalVendors);
        const totalDebit = formatNumber(item.totalDebit);
        const profitAmount = formatNumber(item.profitAmount);
        const profitPercentage = formatNumber(item.profitPercentage);

        tableHTML += `
                <tr>
                    <td>${item.projectName}</td>
                    <td>${item.projectCategory}</td>
                    <td class="number-cell ${credit.class}">${credit.text}</td>
                    <td class="number-cell ${debitToExternal.class}">${debitToExternal.text}</td>
                    <td class="number-cell ${debitToInternal.class}">${debitToInternal.text}</td>
                    <td class="number-cell ${totalDebit.class}">${totalDebit.text}</td>
                    <td class="number-cell ${profitAmount.class}">${profitAmount.text}</td>
                    <td class="number-cell ${profitPercentage.class}">${profitPercentage.text}%</td>
                </tr>
            `;
    });

    tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

    container.innerHTML = tableHTML;
}

// Render table for Clients
function renderClientsTable(data) {
    const container = document.getElementById('table-container-clients');
    const items = data.data.clientItems;

    if (!items || items.length === 0) {
        showEmptyState('clients');
        return;
    }

    let tableHTML = `
            <div class="analytics-table">
                <table>
                    <thead>
                        <tr>
                            <th>Client Name</th>
                            <th>Type</th>
                            <th>Credit</th>
                            <th>Debit to External</th>
                            <th>Debit to Internal</th>
                            <th>Total Debit</th>
                            <th>Profit Amount</th>
                            <th>Profit %</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

    items.forEach(item => {
        const credit = formatNumber(item.credit);
        const debitToExternal = formatNumber(item.debitToExternalVendors);
        const debitToInternal = formatNumber(item.debitToInternalVendors);
        const totalDebit = formatNumber(item.totalDebit);
        const profitAmount = formatNumber(item.profitAmount);
        const profitPercentage = formatNumber(item.profitPercentage);

        tableHTML += `
                <tr>
                    <td>${item.clientName}</td>
                    <td>${item.clientType}</td>
                    <td class="number-cell ${credit.class}">${credit.text}</td>
                    <td class="number-cell ${debitToExternal.class}">${debitToExternal.text}</td>
                    <td class="number-cell ${debitToInternal.class}">${debitToInternal.text}</td>
                    <td class="number-cell ${totalDebit.class}">${totalDebit.text}</td>
                    <td class="number-cell ${profitAmount.class}">${profitAmount.text}</td>
                    <td class="number-cell ${profitPercentage.class}">${profitPercentage.text}%</td>
                </tr>
            `;
    });

    tableHTML += `
                    </tbody>
                </table>
            </div>
        `;

    container.innerHTML = tableHTML;
}