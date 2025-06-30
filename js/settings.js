document.addEventListener("DOMContentLoaded", () => {
    // Получаем ссылки на элементы страницы
    const walletNameSelect = document.getElementById("walletName");
    const parseButton = document.getElementById("parseButton");
    const saveButton = document.getElementById("saveButton");
    const successMessage = document.getElementById("successMessage");
    const transactionsTableBody = document.getElementById("transactionsTable").querySelector("tbody");
    const transactionsDataTextarea = document.getElementById("transactionsData");

    // Функция-обертка для fetch с авторизационными заголовками
    function authenticatedFetch(url, options = {}) {
        const token = apiToken;
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        };
        return fetch(url, options);
    }

    // Функция для загрузки кошельков с сервера и заполнения выпадающего списка
    const walletMap = {}; // глобально

    async function loadWallets() {
        try {
            const url = baseUrl + '/api/v1/individual/wallet';
            const response = await authenticatedFetch(url);
            if (response.ok) {
                const data = await response.json();
                walletNameSelect.innerHTML = '<option value="" selected disabled>Select...</option>';
                data.wallets.forEach(wallet => {
                    walletMap[wallet.walletId] = wallet.walletName; // сохраняем соответствие
                    const option = document.createElement('option');
                    option.value = wallet.walletId;
                    option.textContent = wallet.walletName.replace(/_/g, " "); // <-- вот тут
                    walletNameSelect.appendChild(option);
                });
            } else {
                console.error('Ошибка запроса кошельков:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при загрузке кошельков:', error);
        }
    }


    const debitTypeMap = {};
    async function loadDebitTypes() {
        try {
            const url = baseUrl + '/api/v1/individual/transaction/debit/type';
            const response = await authenticatedFetch(url);
            if (response.ok) {
                const data = await response.json();
                data.informationDebitTypes.forEach(type => {
                    debitTypeMap[type.debitTypeId] = type.debitTypeCode;
                });
            } else {
                console.error('Ошибка загрузки типов расходов:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при получении типов расходов:', error);
        }
    }
    loadDebitTypes();





    // Функция для отправки данных на сервер (парсинг транзакций)
    async function sendData() {
        console.log("Sending data...");

        const walletId = walletNameSelect.value; // получаем идентификатор кошелька
        const transactionsData = transactionsDataTextarea.value;

        // Проверка заполненности полей
        if (!walletId || !transactionsData) {
            alert("Please select a wallet and enter transaction data.");
            return;
        }

        try {
            // Отправляем данные на сервер с walletId в query-параметре
            const response = await authenticatedFetch(baseUrl + `/api/v1/individual/transaction/debit/batch/parse?walletId=${walletId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',  // Отправляем данные в виде plain text
                },
                body: transactionsData
            });

            if (response.ok) {
                const data = await response.json();

                // Очистка таблицы транзакций
                transactionsTableBody.innerHTML = '';

                // Заполнение таблицы новыми данными
                data.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.id}</td>
                        <td>${transaction.transactionDate}</td>
                        <td>${walletMap[transaction.walletId] || transaction.walletId}</td>
                        <td>${transaction.amount}</td>
                        <td>${debitTypeMap[transaction.personalDebitTypeId] || transaction.personalDebitTypeId}</td>
                        <td>${transaction.description}</td>
                    `;
                    transactionsTableBody.appendChild(row);
                });

                // Отображаем кнопку сохранения
                saveButton.style.display = 'inline-block';
            } else {
                console.error('Error sending data:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // Функция для сохранения данных в базу
    async function saveData() {
        console.log("Saving data...");

        const walletId = walletNameSelect.value; // используем ID кошелька
        const transactionsData = transactionsDataTextarea.value;

        if (!walletId || !transactionsData) {
            alert("Please select a wallet and enter transaction data.");
            return;
        }

        try {
            // Отправляем данные для сохранения с параметром walletId
            const response = await authenticatedFetch(baseUrl + `/api/v1/individual/transaction/debit/batch/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: transactionsData
            });

            if (response.ok) {
                // Показываем сообщение об успешном сохранении
                successMessage.style.display = 'block';
                // Скрываем кнопку сохранения
                saveButton.style.display = 'none';
            } else {
                console.error('Error saving data:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    // Загрузка кошельков сразу после загрузки страницы
    loadWallets();

    // Привязка обработчиков событий к кнопкам
    parseButton.addEventListener("click", sendData);
    saveButton.addEventListener("click", saveData);
});
