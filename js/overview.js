document.addEventListener("DOMContentLoaded", function () {


    const wallets = []; // изначально пустой массив


    const walletsContainer = document.getElementById("wallets-container");
    const walletTitle = document.getElementById("wallet-title");
    const walletBalance = document.getElementById("wallet-balance");
    const filterButton = document.getElementById("filter-button");
    const filterModal = document.getElementById("filter-modal");
    const closeModalButton = document.getElementById("close-modal");
    const applyFilterButton = document.getElementById("apply-filter");
    const resetFilterButton = document.getElementById("reset-filter");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const showTableButton = document.getElementById("show-table-button");
    const tableModal = document.getElementById("table-modal");
    const closeTableModal = document.getElementById("close-table-modal");
    const tableBody = document.getElementById("table-body");

    let selectedWallet = null;
    let filterStartDate = null;
    let filterEndDate = null;
    let allDailyBalances = [];

    function authenticatedFetch(url, options = {}) {
        const token = apiToken;

        // Убедимся, что есть объект options
        options = options || {};

        // Добавляем или создаём объект headers
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        return fetch(url, options);
    }



    async function loadWalletList() {
        try {
            const url = baseUrl + '/api/v1/business/wallet/filtered';
            const response = await authenticatedFetch(url);
            if (response.ok) {
                const data = await response.json();
                wallets.length = 0;
                data.wallets.forEach(wallet => {
                    wallets.push({
                        id: wallet.walletId,
                        name: wallet.walletName,
                        currency: wallet.currency
                    });
                });

                console.log("Загруженные кошельки:", wallets);

                // Теперь рендерим список кошельков
                wallets.forEach(wallet => {
                    const li = document.createElement("li");
                    li.textContent = `${wallet.name.replace(/_/g, " ")}`;

                    li.addEventListener("click", function () {
                        document.querySelectorAll(".wallet-list ul li").forEach(item => item.classList.remove("active"));
                        li.classList.add("active");
                        selectedWallet = wallet.name;
                        fetchBalance(wallet);
                    });

                    walletsContainer.appendChild(li);
                });

            } else {
                console.error('Ошибка загрузки списка кошельков:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при запросе списка кошельков:', error);
        }
    }


    loadWalletList();


    // Функция для форматирования числа с разделением тысяч и максимум двумя знаками после запятой
    function formatNumber(value) {
        if (value % 1 === 0) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        } else {
            return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    }

    // Функция для получения общего баланса
    async function fetchTotalBalance() {
        try {
            const response = await authenticatedFetch(baseUrl + "/api/v1/business/wallet/balance/total");
            if (response.ok) {
                const data = await response.json();
                if (data.balance !== undefined && data.currency) {
                    const formattedBalance = `${data.currency} ${formatNumber(data.balance)}`;
                    document.querySelector(".total-balance-block h2").textContent = formattedBalance;
                }
            } else {
                console.error("Ошибка при получении общего баланса");
            }
        } catch (error) {
            console.error("Ошибка при загрузке общего баланса:", error);
        }
    }

    // Функция для получения балансов кошельков (USD, EUR, UAH)
    async function fetchWalletBalances() {
        try {
            const response = await authenticatedFetch(baseUrl + '/api/v1/business/wallet/balance/total/base-currency');
            if (response.ok) {
                const data = await response.json();

                data.currentBalanceInBaseCurrencyWebsiteList.forEach(item => {
                    const formattedBalance = formatNumber(item.balance);
                    switch (item.currency) {
                        case 'USD':
                            document.querySelector('.usd-card .card-balance').textContent = `$${formattedBalance}`;
                            break;
                        case 'EUR':
                            document.querySelector('.eur-card .card-balance').textContent = `€${formattedBalance}`;
                            break;
                        case 'UAH':
                            document.querySelector('.uah-card .card-balance').textContent = `₴${formattedBalance}`;
                            break;
                        default:
                            console.warn(`Неизвестная валюта: ${item.currency}`);
                    }
                });
            } else {
                console.error('Ошибка при получении балансов кошельков');
            }
        } catch (error) {
            console.error('Ошибка при загрузке балансов кошельков:', error);
        }
    }

    // Вызов функций при загрузке страницы
    fetchTotalBalance();
    fetchWalletBalances();


    // Функция получения баланса
    function fetchBalance(wallet) {
        const {id, name, currency } = wallet;
        let url = baseUrl + "/api/v1/business/wallet/balance/current?walletId=" + encodeURIComponent(id);
        authenticatedFetch(url)
            .then(response => response.json())
            .then(data => {
                // Обновляем заголовок с добавлением "Balance:" и переносом имени кошелька на новую строку
                walletTitle.innerHTML = `Balance: <br> ${wallet.name.replace(/_/g, " ")}`;

                // Обновляем баланс
                walletBalance.textContent = `${getCurrencySymbol(currency)} ${formatNumber(data.currentBalance)}`;
                fetchDailyBalances(id);
            })
            .catch(error => {
                console.error("Error:", error);
                walletBalance.textContent = "Error loading";
            });
    }



    // Функция для получения символа валюты
    function getCurrencySymbol(currency) {
        switch (currency) {
            case 'USD': return '$';
            case 'EUR': return '€';
            case 'UAH': return '₴';
            default: return '';
        }
    }

    // Функция получения ежедневных балансов
    function fetchDailyBalances(walletId) {
        let url = baseUrl + "/api/v1/business/wallet/balance/daily?walletId=" + encodeURIComponent(walletId);
        authenticatedFetch(url)
            .then(response => response.json())
            .then(data => {
                allDailyBalances = data.dailyBalances;
                filterAndUpdateChart();
            })
            .catch(error => {
                console.error("Error fetching daily balances:", error);
            });
    }


    // Фильтрация и обновление графика и таблицы
    function filterAndUpdateChart() {
        let filteredBalances = allDailyBalances;

        if (filterStartDate && filterEndDate) {
            const startDate = new Date(filterStartDate);
            const endDate = new Date(filterEndDate);
            filteredBalances = allDailyBalances.filter(item => {
                const itemDate = new Date(item.date);
                return itemDate >= startDate && itemDate <= endDate;
            });
        }

        console.log("Filtered Balances for Chart:", filteredBalances);
        updateChart(filteredBalances);
        updateTable(filteredBalances);
    }

    // Обновление графика
    function updateChart(dailyBalances) {
        const labels = dailyBalances.map(item => item.date);
        const balances = dailyBalances.map(item => item.startDayBalance);

        const ctx = document.getElementById("balanceChart").getContext("2d");

        if (window.myChart) {
            window.myChart.destroy();
        }

        window.myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Daily Balances",
                    data: balances,
                    borderColor: "blue",
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    }
                }
            }
        });
    }

    // Обновление таблицы
    function updateTable(data) {
        console.log("Updating Table with Data:", data);
        tableBody.innerHTML = "";
        if (data.length === 0) {
            const row = document.createElement("tr");
            row.innerHTML = `<td colspan="2" style="text-align: center;">No data to display</td>`;
            tableBody.appendChild(row);
            return;
        }

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${item.date}</td><td>${item.startDayBalance.toLocaleString()}</td>`;
            tableBody.appendChild(row);
        });
    }

    // Открытие и закрытие модального окна фильтрации
    filterButton.addEventListener("click", () => filterModal.style.display = "flex");
    closeModalButton.addEventListener("click", () => filterModal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === filterModal) filterModal.style.display = "none";
    });

    // Применение фильтров
    applyFilterButton.addEventListener("click", () => {
        filterStartDate = startDateInput.value;
        filterEndDate = endDateInput.value;
        filterModal.style.display = "none";
        if (selectedWallet) {
            filterAndUpdateChart();
        }
    });

    // Сброс фильтров
    resetFilterButton.addEventListener("click", () => {
        startDateInput.value = "";
        endDateInput.value = "";
        filterStartDate = null;
        filterEndDate = null;
        filterModal.style.display = "none";
        if (selectedWallet) {
            filterAndUpdateChart();
        }
    });

    // Открытие и закрытие модального окна таблицы
    showTableButton.addEventListener("click", () => {
        tableModal.style.display = "flex";
        updateTable(allDailyBalances);
    });

    closeTableModal.addEventListener("click", () => tableModal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === tableModal) tableModal.style.display = "none";
    });
});
