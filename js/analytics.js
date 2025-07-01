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

// Global variables to store current data and sorting state
let currentData = {
    vendors: null,
    projects: null,
    clients: null
};

let sortState = {
    vendors: { column: null, direction: 'asc' },
    projects: { column: null, direction: 'asc' },
    clients: { column: null, direction: 'asc' }
};

// Тестовые данные для демо
// Тестовые данные для демо
const DEMO_DATA = {
    vendors: {
        data: {
            vendorItems: [
                {
                    vendorName: "Tech Solutions Ltd",
                    vendorType: "External",
                    credit: 125000,
                    debitAsAssociated: 15000,
                    debitToVendor: 85000,
                    totalDebit: 100000,
                    profitAmount: 25000,
                    profitPercentage: 20.0
                },
                {
                    vendorName: "Digital Services Inc",
                    vendorType: "Internal",
                    credit: 95000,
                    debitAsAssociated: 12000,
                    debitToVendor: 62000,
                    totalDebit: 74000,
                    profitAmount: 21000,
                    profitPercentage: 22.11
                },
                {
                    vendorName: "Creative Studio Pro",
                    vendorType: "External",
                    credit: 78000,
                    debitAsAssociated: 8500,
                    debitToVendor: 52000,
                    totalDebit: 60500,
                    profitAmount: 17500,
                    profitPercentage: 22.44
                },
                {
                    vendorName: "DataFlow Systems",
                    vendorType: "Internal",
                    credit: 156000,
                    debitAsAssociated: 18000,
                    debitToVendor: 98000,
                    totalDebit: 116000,
                    profitAmount: 40000,
                    profitPercentage: 25.64
                },
                {
                    vendorName: "Marketing Hub Agency",
                    vendorType: "External",
                    credit: 67000,
                    debitAsAssociated: 7200,
                    debitToVendor: 43000,
                    totalDebit: 50200,
                    profitAmount: 16800,
                    profitPercentage: 25.07
                },
                {
                    vendorName: "Security Systems Co",
                    vendorType: "Internal",
                    credit: 89000,
                    debitAsAssociated: 9800,
                    debitToVendor: 58000,
                    totalDebit: 67800,
                    profitAmount: 21200,
                    profitPercentage: 23.82
                },
                {
                    vendorName: "Cloud Infrastructure Ltd",
                    vendorType: "External",
                    credit: 234000,
                    debitAsAssociated: 28000,
                    debitToVendor: 165000,
                    totalDebit: 193000,
                    profitAmount: 41000,
                    profitPercentage: 17.52
                },
                {
                    vendorName: "Mobile Dev Studio",
                    vendorType: "Internal",
                    credit: 112000,
                    debitAsAssociated: 14500,
                    debitToVendor: 72000,
                    totalDebit: 86500,
                    profitAmount: 25500,
                    profitPercentage: 22.77
                }
            ]
        }
    },
    projects: {
        data: {
            projectItems: [
                {
                    projectName: "E-commerce Platform Rebuild",
                    projectCategory: "Web Development",
                    credit: 185000,
                    debitToExternalVendors: 65000,
                    debitToInternalVendors: 45000,
                    totalDebit: 110000,
                    profitAmount: 75000,
                    profitPercentage: 40.54
                },
                {
                    projectName: "Mobile Banking App",
                    projectCategory: "Mobile Development",
                    credit: 275000,
                    debitToExternalVendors: 85000,
                    debitToInternalVendors: 95000,
                    totalDebit: 180000,
                    profitAmount: 95000,
                    profitPercentage: 34.55
                },
                {
                    projectName: "Data Analytics Dashboard",
                    projectCategory: "Analytics",
                    credit: 145000,
                    debitToExternalVendors: 42000,
                    debitToInternalVendors: 58000,
                    totalDebit: 100000,
                    profitAmount: 45000,
                    profitPercentage: 31.03
                },
                {
                    projectName: "Corporate Website Redesign",
                    projectCategory: "Web Development",
                    credit: 95000,
                    debitToExternalVendors: 28000,
                    debitToInternalVendors: 35000,
                    totalDebit: 63000,
                    profitAmount: 32000,
                    profitPercentage: 33.68
                },
                {
                    projectName: "CRM System Integration",
                    projectCategory: "System Integration",
                    credit: 320000,
                    debitToExternalVendors: 125000,
                    debitToInternalVendors: 85000,
                    totalDebit: 210000,
                    profitAmount: 110000,
                    profitPercentage: 34.38
                },
                {
                    projectName: "Marketing Automation Tool",
                    projectCategory: "Marketing Technology",
                    credit: 125000,
                    debitToExternalVendors: 45000,
                    debitToInternalVendors: 42000,
                    totalDebit: 87000,
                    profitAmount: 38000,
                    profitPercentage: 30.4
                },
                {
                    projectName: "Cloud Migration Project",
                    projectCategory: "Cloud Services",
                    credit: 425000,
                    debitToExternalVendors: 185000,
                    debitToInternalVendors: 95000,
                    totalDebit: 280000,
                    profitAmount: 145000,
                    profitPercentage: 34.12
                },
                {
                    projectName: "AI Chatbot Development",
                    projectCategory: "AI/ML",
                    credit: 165000,
                    debitToExternalVendors: 58000,
                    debitToInternalVendors: 62000,
                    totalDebit: 120000,
                    profitAmount: 45000,
                    profitPercentage: 27.27
                },
                {
                    projectName: "Security Audit & Compliance",
                    projectCategory: "Security",
                    credit: 85000,
                    debitToExternalVendors: 32000,
                    debitToInternalVendors: 28000,
                    totalDebit: 60000,
                    profitAmount: 25000,
                    profitPercentage: 29.41
                }
            ]
        }
    },
    clients: {
        data: {
            clientItems: [
                {
                    clientName: "Global Tech Corporation",
                    clientType: "Enterprise",
                    credit: 485000,
                    debitToExternalVendors: 165000,
                    debitToInternalVendors: 125000,
                    totalDebit: 290000,
                    profitAmount: 195000,
                    profitPercentage: 40.21
                },
                {
                    clientName: "RetailMax Inc",
                    clientType: "Mid-Market",
                    credit: 285000,
                    debitToExternalVendors: 95000,
                    debitToInternalVendors: 85000,
                    totalDebit: 180000,
                    profitAmount: 105000,
                    profitPercentage: 36.84
                },
                {
                    clientName: "FinanceFlow Solutions",
                    clientType: "Enterprise",
                    credit: 625000,
                    debitToExternalVendors: 225000,
                    debitToInternalVendors: 165000,
                    totalDebit: 390000,
                    profitAmount: 235000,
                    profitPercentage: 37.6
                },
                {
                    clientName: "StartupHub Ventures",
                    clientType: "Small Business",
                    credit: 125000,
                    debitToExternalVendors: 45000,
                    debitToInternalVendors: 38000,
                    totalDebit: 83000,
                    profitAmount: 42000,
                    profitPercentage: 33.6
                },
                {
                    clientName: "HealthTech Innovations",
                    clientType: "Mid-Market",
                    credit: 345000,
                    debitToExternalVendors: 125000,
                    debitToInternalVendors: 95000,
                    totalDebit: 220000,
                    profitAmount: 125000,
                    profitPercentage: 36.23
                },
                {
                    clientName: "EduSoft Academy",
                    clientType: "Small Business",
                    credit: 165000,
                    debitToExternalVendors: 58000,
                    debitToInternalVendors: 52000,
                    totalDebit: 110000,
                    profitAmount: 55000,
                    profitPercentage: 33.33
                },
                {
                    clientName: "Manufacturing Elite Ltd",
                    clientType: "Enterprise",
                    credit: 785000,
                    debitToExternalVendors: 285000,
                    debitToInternalVendors: 195000,
                    totalDebit: 480000,
                    profitAmount: 305000,
                    profitPercentage: 38.85
                },
                {
                    clientName: "Digital Marketing Pro",
                    clientType: "Mid-Market",
                    credit: 225000,
                    debitToExternalVendors: 82000,
                    debitToInternalVendors: 68000,
                    totalDebit: 150000,
                    profitAmount: 75000,
                    profitPercentage: 33.33
                },
                {
                    clientName: "Green Energy Systems",
                    clientType: "Enterprise",
                    credit: 545000,
                    debitToExternalVendors: 195000,
                    debitToInternalVendors: 145000,
                    totalDebit: 340000,
                    profitAmount: 205000,
                    profitPercentage: 37.61
                },
                {
                    clientName: "LocalBiz Solutions",
                    clientType: "Small Business",
                    credit: 95000,
                    debitToExternalVendors: 35000,
                    debitToInternalVendors: 28000,
                    totalDebit: 63000,
                    profitAmount: 32000,
                    profitPercentage: 33.68
                }
            ]
        }
    }
};

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
        currentPeriod.textContent = `Analytics for: ${periodText}`;
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
        currentPeriod.textContent = `Analytic for: ${dateFrom} to ${dateTo}`;
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

// Main function to load analytics
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

    // Reset sort state when loading new data
    sortState[tabType] = { column: null, direction: 'asc' };

    // Send request to server
    sendRequest(tabType, startDate, endDate);
}

// Send request to server
// Send request to server (DEMO VERSION)
function sendRequest(tabType, startDate, endDate) {
    console.log(`Demo mode: Loading ${tabType} analytics from ${startDate} to ${endDate}`);

    // Имитация задержки сервера
    setTimeout(() => {
        const data = DEMO_DATA[tabType];

        if (data) {
            console.log(`Demo data for ${tabType}:`, data);
            currentData[tabType] = data;
            renderTable(tabType, data);
        } else {
            showError(tabType, `No demo data available for ${tabType}`);
        }
    }, 500); // 500ms задержка для имитации загрузки
}

// Show loading indicator
function showLoading(tabType) {
    const container = document.getElementById(`table-container-${tabType}`);
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <i class="fa fa-spinner"></i><br>
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
    return { class: '', text: value.toString() };
}

// IMPROVED SORTING FUNCTIONS
function parseNumericValue(value) {
    // Handle null/undefined
    if (value == null) return 0;

    // If it's already a number, return it
    if (typeof value === 'number') return value;

    // Convert to string and clean up
    let str = String(value).trim();

    // Remove any non-numeric characters except decimal point and minus sign
    str = str.replace(/[^\d.,-]/g, '');

    // Replace comma with dot for decimal separator
    str = str.replace(',', '.');

    // Parse as float
    const parsed = parseFloat(str);

    // Return 0 if parsing failed
    return isNaN(parsed) ? 0 : parsed;
}

function sortData(tabType, column, items) {
    const currentSort = sortState[tabType];

    // Determine sort direction with three states: asc -> desc -> none
    if (currentSort.column === column) {
        // Same column - cycle through states
        if (currentSort.direction === 'asc') {
            currentSort.direction = 'desc';
        } else if (currentSort.direction === 'desc') {
            // Third click - disable sorting (return to original order)
            currentSort.direction = 'none';
            currentSort.column = null;
        }
    } else {
        // New column - default to ascending
        currentSort.column = column;
        currentSort.direction = 'asc';
    }

    // If sorting is disabled, return original order
    if (currentSort.direction === 'none') {
        return [...items]; // Return original order
    }

    // Clone items array to avoid mutating original data
    const sortedItems = [...items];

    // Define which columns are numeric for each table type
    const numericColumns = {
        vendors: ['credit', 'debitAsAssociated', 'debitToVendor', 'totalDebit', 'profitAmount', 'profitPercentage'],
        projects: ['credit', 'debitToExternalVendors', 'debitToInternalVendors', 'totalDebit', 'profitAmount', 'profitPercentage'],
        clients: ['credit', 'debitToExternalVendors', 'debitToInternalVendors', 'totalDebit', 'profitAmount', 'profitPercentage']
    };

    const isNumericColumn = numericColumns[tabType] && numericColumns[tabType].includes(column);

    sortedItems.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];

        if (isNumericColumn) {
            // Parse as numbers for numeric columns
            valueA = parseNumericValue(valueA);
            valueB = parseNumericValue(valueB);
        } else {
            // String comparison for text columns
            valueA = String(valueA || '').toLowerCase().trim();
            valueB = String(valueB || '').toLowerCase().trim();
        }

        let comparison = 0;
        if (valueA > valueB) {
            comparison = 1;
        } else if (valueA < valueB) {
            comparison = -1;
        }

        return currentSort.direction === 'desc' ? -comparison : comparison;
    });

    return sortedItems;
}

function handleColumnSort(tabType, column) {
    if (!currentData[tabType]) return;

    let items;
    switch(tabType) {
        case 'vendors':
            items = currentData[tabType].data.vendorItems;
            break;
        case 'projects':
            items = currentData[tabType].data.projectItems;
            break;
        case 'clients':
            items = currentData[tabType].data.clientItems;
            break;
    }

    if (!items || items.length === 0) return;

    const sortedItems = sortData(tabType, column, items);

    // Update current data with sorted items
    switch(tabType) {
        case 'vendors':
            currentData[tabType].data.vendorItems = sortedItems;
            break;
        case 'projects':
            currentData[tabType].data.projectItems = sortedItems;
            break;
        case 'clients':
            currentData[tabType].data.clientItems = sortedItems;
            break;
    }

    // Re-render table
    renderTable(tabType, currentData[tabType]);
}

function getSortIndicator(tabType, column) {
    const currentSort = sortState[tabType];
    if (currentSort.column !== column) {
        return '<i class="fa fa-sort sort-icon"></i>';
    }

    if (currentSort.direction === 'asc') {
        return '<i class="fa fa-sort-up sort-icon active"></i>';
    } else if (currentSort.direction === 'desc') {
        return '<i class="fa fa-sort-down sort-icon active"></i>';
    } else {
        // When sorting is disabled, show default sort icon
        return '<i class="fa fa-sort sort-icon"></i>';
    }
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

// Also need to update the CSS class logic in render functions
function renderVendorsTable(data) {
    const container = document.getElementById('table-container-vendors');
    const items = data.data.vendorItems;

    if (!items || items.length === 0) {
        showEmptyState('vendors');
        return;
    }

    // Add sorted class to table if currently sorted (but not when sorting is disabled)
    const sortedClass = (sortState.vendors.column && sortState.vendors.direction !== 'none') ?
        `sorted-by-column-${getColumnIndex('vendors', sortState.vendors.column)}` : '';

    let tableHTML = `
            <div class="analytics-table ${sortedClass}">
                <table>
                    <thead>
                        <tr>
                            <th class="sortable ${(sortState.vendors.column === 'vendorName' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'vendorName')">
                                Vendor Name ${getSortIndicator('vendors', 'vendorName')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'vendorType' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'vendorType')">
                                Type ${getSortIndicator('vendors', 'vendorType')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'credit' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'credit')">
                                Credit ${getSortIndicator('vendors', 'credit')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'debitAsAssociated' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'debitAsAssociated')">
                                Debit as Associated ${getSortIndicator('vendors', 'debitAsAssociated')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'debitToVendor' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'debitToVendor')">
                                Debit to Vendor ${getSortIndicator('vendors', 'debitToVendor')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'totalDebit' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'totalDebit')">
                                Total Debit ${getSortIndicator('vendors', 'totalDebit')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'profitAmount' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'profitAmount')">
                                Profit Amount ${getSortIndicator('vendors', 'profitAmount')}
                            </th>
                            <th class="sortable ${(sortState.vendors.column === 'profitPercentage' && sortState.vendors.direction !== 'none') ? 'sorted' : ''}" onclick="handleColumnSort('vendors', 'profitPercentage')">
                                Profit % ${getSortIndicator('vendors', 'profitPercentage')}
                            </th>
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
                    <td>${item.vendorName || ''}</td>
                    <td>${item.vendorType || ''}</td>
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

    const sortedClass = sortState.projects.column ? `sorted-by-column-${getColumnIndex('projects', sortState.projects.column)}` : '';

    let tableHTML = `
            <div class="analytics-table ${sortedClass}">
                <table>
                    <thead>
                        <tr>
                            <th class="sortable ${sortState.projects.column === 'projectName' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'projectName')">
                                Project Name ${getSortIndicator('projects', 'projectName')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'projectCategory' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'projectCategory')">
                                Category ${getSortIndicator('projects', 'projectCategory')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'credit' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'credit')">
                                Credit ${getSortIndicator('projects', 'credit')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'debitToExternalVendors' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'debitToExternalVendors')">
                                Debit to External ${getSortIndicator('projects', 'debitToExternalVendors')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'debitToInternalVendors' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'debitToInternalVendors')">
                                Debit to Internal ${getSortIndicator('projects', 'debitToInternalVendors')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'totalDebit' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'totalDebit')">
                                Total Debit ${getSortIndicator('projects', 'totalDebit')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'profitAmount' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'profitAmount')">
                                Profit Amount ${getSortIndicator('projects', 'profitAmount')}
                            </th>
                            <th class="sortable ${sortState.projects.column === 'profitPercentage' ? 'sorted' : ''}" onclick="handleColumnSort('projects', 'profitPercentage')">
                                Profit % ${getSortIndicator('projects', 'profitPercentage')}
                            </th>
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
                    <td>${item.projectName || ''}</td>
                    <td>${item.projectCategory || ''}</td>
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

    const sortedClass = sortState.clients.column ? `sorted-by-column-${getColumnIndex('clients', sortState.clients.column)}` : '';

    let tableHTML = `
            <div class="analytics-table ${sortedClass}">
                <table>
                    <thead>
                        <tr>
                            <th class="sortable ${sortState.clients.column === 'clientName' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'clientName')">
                                Client Name ${getSortIndicator('clients', 'clientName')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'clientType' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'clientType')">
                                Type ${getSortIndicator('clients', 'clientType')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'credit' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'credit')">
                                Credit ${getSortIndicator('clients', 'credit')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'debitToExternalVendors' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'debitToExternalVendors')">
                                Debit to External ${getSortIndicator('clients', 'debitToExternalVendors')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'debitToInternalVendors' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'debitToInternalVendors')">
                                Debit to Internal ${getSortIndicator('clients', 'debitToInternalVendors')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'totalDebit' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'totalDebit')">
                                Total Debit ${getSortIndicator('clients', 'totalDebit')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'profitAmount' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'profitAmount')">
                                Profit Amount ${getSortIndicator('clients', 'profitAmount')}
                            </th>
                            <th class="sortable ${sortState.clients.column === 'profitPercentage' ? 'sorted' : ''}" onclick="handleColumnSort('clients', 'profitPercentage')">
                                Profit % ${getSortIndicator('clients', 'profitPercentage')}
                            </th>
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
                    <td>${item.clientName || ''}</td>
                    <td>${item.clientType || ''}</td>
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

// Helper function to get column index for CSS styling
function getColumnIndex(tabType, column) {
    const columnMaps = {
        vendors: {
            'vendorName': 0,
            'vendorType': 1,
            'credit': 2,
            'debitAsAssociated': 3,
            'debitToVendor': 4,
            'totalDebit': 5,
            'profitAmount': 6,
            'profitPercentage': 7
        },
        projects: {
            'projectName': 0,
            'projectCategory': 1,
            'credit': 2,
            'debitToExternalVendors': 3,
            'debitToInternalVendors': 4,
            'totalDebit': 5,
            'profitAmount': 6,
            'profitPercentage': 7
        },
        clients: {
            'clientName': 0,
            'clientType': 1,
            'credit': 2,
            'debitToExternalVendors': 3,
            'debitToInternalVendors': 4,
            'totalDebit': 5,
            'profitAmount': 6,
            'profitPercentage': 7
        }
    };

    return columnMaps[tabType] && columnMaps[tabType][column] !== undefined ? columnMaps[tabType][column] : -1;
}