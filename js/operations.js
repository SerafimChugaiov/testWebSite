document.addEventListener('DOMContentLoaded', function () {

    const vendorSelect = document.querySelectorAll('.vendor-select'); // Все элементы с классом 'vendor-select'
    const taxDestinationSelect = document.querySelectorAll('.tax-destination-select'); // Все элементы с классом 'tax-destination-select'
    const projectsSelect = document.querySelectorAll('.projects-select'); // Все элементы с классом 'projects-select'
    const walletSelects = document.querySelectorAll('.wallet-select'); // Все элементы с классом 'wallet-select'
    const debitTypeSelects = document.querySelectorAll('.debit-type-select'); // Все элементы с классом 'debit-type-select'

    const form1 = document.getElementById('business-debit-form'); // Форма для дебетовой бизнес-транзакции (Block 2)
    const submitButton1 = form1.querySelector('button[type="submit"]'); // Кнопка отправки (Block 2)
    const responseMessage1 = document.getElementById('message-debit'); // Сообщение о результате (Block 2)

    const form2 = document.getElementById('transfer-form'); // Форма для перевода (Block 2)
    const submitButton2 = form2.querySelector('button[type="submit"]'); // Кнопка отправки (Block 2)
    const responseMessage2 = document.getElementById('message-transfer'); // Сообщение о результате (Block 2)

    const form3 = document.getElementById('exchange-form'); // Форма для обмена (Block 3)
    const submitButton3 = form3.querySelector('button[type="submit"]'); // Кнопка отправки (Block 3)
    const responseMessage3 = document.getElementById('message-exchange'); // Сообщение о результате (Block 3)

    const form4 = document.getElementById('credit-form'); // Форма для кредитной транзакции (Block 4)
    const submitButton4 = form3.querySelector('button[type="submit"]'); // Кнопка отправки (Block 4)
    const responseMessage4 = document.getElementById('message-credit');


    const loadingIndicator = document.createElement('div');
    loadingIndicator.innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    loadingIndicator.style.marginLeft = '10px';

    // Инициализация Bootstrap вкладок
    new bootstrap.Tab(document.querySelector('#tab1')).show();

    // Функция-обертка для fetch, добавляющая токен в заголовки
    function authenticatedFetch(url, options = {}) {
        const token = apiToken; // Ваша переменная с токеном

        // Убедимся, что есть объект options
        options = options || {};

        // Добавляем или создаём объект headers
        options.headers = {
            ...options.headers,
            "Authorization": `Bearer ${token}`, // Добавляем токен в заголовок
            "Content-Type": "application/json" // Указываем тип содержимого (если нужно)
        };

        return fetch(url, options);
    }

//////////////////////////////

    //!!!!wallets!!!!!

    // Глобальная переменная для хранения списка wallet
    let wallets = [];

    // Функция для загрузки списка wallets и заполнения выпадающих списков
    function fetchWallet() {
        authenticatedFetch(baseUrl + '/api/v1/business/wallet') // Запрос на сервер для получения списка wallet
            .then(response => response.json()) // Обработка ответа как JSON
            .then(data => {
                wallets = data.wallets; // Сохраняем список wallet в глобальную переменную
                populateWalletDropdowns(); // Заполняем все выпадающие списки
            })
            .catch(error => {
                console.error('Error fetching wallets:', error);
                alert('Failed to load wallets'); // Если произошла ошибка при загрузке, показываем alert
            });
    }

    // Функция для добавления wallets в выпадающий список
    function populateWalletDropdowns() {
        walletSelects.forEach(walletSelect => {
            walletSelect.innerHTML = '<option value="">---</option>'; // Очистить предыдущие элементы

            // Добавляем wallets в выпадающий список
            wallets.forEach(wallet => {
                const option = document.createElement('option');
                option.value = wallet.walletId;  // Значение - это ID клиента
                option.textContent = wallet.walletName;  // Текст - имя клиента
                walletSelect.appendChild(option); // <-- вот тут должно быть walletSelect
            });
        });

    }

    fetchWallet();


    //!!!!Business-Debit-Type!!!!!

    // Глобальная переменная для хранения списка debit type
    let businessDebitType = [];

    // Функция для загрузки списка businessDebitType и заполнения выпадающих списков
    function fetchPersonalDebitType() {
        authenticatedFetch(baseUrl + '/api/v1/business/debit/type') // Запрос на сервер для получения списка businessDebitType
            .then(response => response.json()) // Обработка ответа как JSON
            .then(data => {
                businessDebitType = data.debitTypes; // Сохраняем список businessDebitType в глобальную переменную
                populatePersonalDebitTypeDropdowns(); // Заполняем все выпадающие списки
            })
            .catch(error => {
                console.error('Error fetching wallets:', error);
                alert('Failed to load wallets'); // Если произошла ошибка при загрузке, показываем alert
            });
    }

    // Функция для добавления businessDebitType в выпадающий список
    function populatePersonalDebitTypeDropdowns() {
        debitTypeSelects.forEach(debitType => {
            debitType.innerHTML = '<option value="">---</option>'; // Очистить предыдущие элементы

            // Добавляем клиентов в выпадающий список
            businessDebitType.forEach(type => {
                const option = document.createElement('option');
                option.value = type.debitTypeId;  // Значение - это ID businessDebitType
                option.textContent = type.debitTypeCode;  // Текст - имя businessDebitType
                debitType.appendChild(option); // <-- вот тут должно быть businessDebitType
            });
        });

    }

    fetchPersonalDebitType();


    //!!!!projects!!!!!

    // Глобальная переменная для хранения списка клиентов
    let projects = [];

    // Функция для загрузки списка projects и заполнения выпадающих списков
    function fetchProjects() {
        authenticatedFetch(baseUrl + '/api/v1/business/project') // Запрос на сервер для получения списка projects
            .then(response => response.json()) // Обработка ответа как JSON
            .then(data => {
                projects = data.projects; // Сохраняем список projects в глобальную переменную
                populateProjectsDropdowns(); // Заполняем все выпадающие списки
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                alert('Failed to load projects'); // Если произошла ошибка при загрузке, показываем alert
            });
    }

    // Функция для добавления projects в выпадающий список
    function populateProjectsDropdowns() {
        projectsSelect.forEach(projectsSelect => {
            projectsSelect.innerHTML = '<option value="">---</option>'; // Очистить предыдущие элементы

            // Добавляем projects в выпадающий список
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.projectId;  // Значение - это ID projects
                option.textContent = project.projectCode;  // Текст - имя клиента
                projectsSelect.appendChild(option);
            });
        });
    }

    fetchProjects();

    //!!!!vendors!!!!!

    // Глобальная переменная для хранения списка vendors
    let vendors = [];

    // Функция для загрузки списка vendors и заполнения выпадающих списков
    function fetchVendors() {
        authenticatedFetch(baseUrl + '/api/v1/business/vendor') // Запрос на сервер для получения списка vendors
            .then(response => response.json()) // Обработка ответа как JSON
            .then(data => {
                vendors = data.vendors; // Сохраняем список vendors в глобальную переменную
                populateVendorsDropdowns(); // Заполняем все выпадающие списки
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
                alert('Failed to load clients'); // Если произошла ошибка при загрузке, показываем alert
            });
    }

    // Функция для добавления vendors в выпадающий список
    function populateVendorsDropdowns() {
        vendorSelect.forEach(vendorSelect => {
            vendorSelect.innerHTML = '<option value="">---</option>'; // Очистить предыдущие элементы

            // Добавляем vendors в выпадающий список
            vendors.forEach(client => {
                const option = document.createElement('option');
                option.value = client.vendorsId;  // Значение - это ID клиента
                option.textContent = client.vendorsCode;  // Текст - имя клиента
                vendorSelect.appendChild(option);
            });
        });
    }

    fetchVendors();


    //!!!!taxDestinations!!!!!

    // Глобальная переменная для хранения списка taxDestinations
    let taxDestinations = [];

    // Функция для загрузки списка taxDestinations и заполнения выпадающих списков
    function fetchTaxDestinations() {
        authenticatedFetch(baseUrl + '/api/v1/business/tax') // Запрос на сервер для получения списка taxDestinations
            .then(response => response.json()) // Обработка ответа как JSON
            .then(data => {
                taxDestinations = data.taxDestinations; // Сохраняем список клиентов в глобальную переменную
                populateTaxDestinations(); // Заполняем все выпадающие списки
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
                alert('Failed to load clients'); // Если произошла ошибка при загрузке, показываем alert
            });
    }

    // Функция для добавления taxDestinations в выпадающий список
    function populateTaxDestinations() {
        taxDestinationSelect.forEach(taxDestinationSelect => {
            taxDestinationSelect.innerHTML = '<option value="">---</option>'; // Очистить предыдущие элементы

            // Добавляем клиентов в выпадающий список
            taxDestinations.forEach(taxDestinations => {
                const option = document.createElement('option');
                option.value = taxDestinations.taxDestinationId;  // Значение - это ID taxDestinations
                option.textContent = taxDestinations.taxDestinationCode;  // Текст - имя клиента
                taxDestinationSelect.appendChild(option);
            });
        });
    }

    fetchTaxDestinations();

/////////////////////////////////////////////


    // !!!!!Обработчик отправки формы для Block 1!!!!!
    form1.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение формы

        const formData = new FormData(form1); // Получаем данные формы
        const transactionData = {
            transactionDate: formatDate(formData.get('transactionDate-business-debit')),
            walletId: formData.get('walletId-business-debit'),
            amount: formData.get('amount-business-debit'),
            debitTypeId: formData.get('debitType-business-debit'),
            projectId: formData.get('projectId-business-debit'),
            vendorId: formData.get('vendorId-business-debit'),
            associatedVendor: formData.get('associatedVendor-business-debit'),
            taxDestinationId: formData.get('taxDestination-business-debit'),
            description: formData.get('description-business-debit'), // Описание (Block 1)
        };

        // Отправляем данные формы в API для дебетовой личной транзакции
        handleTransactionSubmission(transactionData, baseUrl + '/api/v1/business/transaction/debit', submitButton1, responseMessage1);
    });


    // !!!!!Обработчик отправки формы для Block 2!!!!!
    form2.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение формы

        const formData = new FormData(form2); // Получаем данные формы
        const transactionData = {
            transactionDate: formatDate(formData.get('transactionDate-transfer')),
            fromWalletName: formData.get('fromWalletId-transfer'),
            toWalletName: formData.get('toWalletId-transfer'),
            amount: formData.get('amount-transfer'),
            description: formData.get('description-transfer')
        };

        // Отправляем данные формы в API для перевода
        handleTransactionSubmission(transactionData, baseUrl + '/api/v1/business/transaction/transfer', submitButton2, responseMessage2);
    });

    // !!!!!Обработчик отправки формы для Block 3!!!!
    form3.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение формы

        const formData = new FormData(form3); // Получаем данные формы
        const transactionData = {
            transactionDate: formatDate(formData.get('transactionDate-exchange')), // Дата операции (Block 5)
            fromWalletId: formData.get('fromWalletName-exchange'), // Название кошелька (Block 5)
            toWalletId: formData.get('toWalletName-exchange'), // Название кошелька получателя (Block 5)
            amount: formData.get('amount-exchange'), // Сумма отправляемая (Block 5)
            toAmount: formData.get('toAmount-exchange'), // Сумма получаемая (Block 5)
            exchangeRate: formData.get('exchangeRate-exchange'), // Курс обмена (Block 5)
            description: formData.get('description-exchange') // Описание (Block 5)
        };

        // Отправляем данные формы в API для обмена валюты
        handleTransactionSubmission(transactionData, baseUrl + '/api/v1/business/transaction/exchange', submitButton3, responseMessage3);
    });

    // !!!!!!Функция для отправки данных транзакции на сервер!!!!!
    function handleTransactionSubmission(data, endpoint, button, responseElement) {
        button.disabled = true;
        responseElement.textContent = 'Submitting transaction...';
        responseElement.appendChild(loadingIndicator);

        const fetchOptions = {
            method: 'POST',
            body: JSON.stringify(data), // <-- отправляем как JSON
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json' // <-- меняем тип на JSON
            }
        };

        fetch(endpoint, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                responseElement.textContent = `Transaction successfully added! Amount: ${result.amount}, Description: ${result.description}`;
            })
            .catch(error => {
                responseElement.textContent = `An error occurred: ${error.message}`;
            })
            .finally(() => {
                button.disabled = false;
                loadingIndicator.remove();
            });
    }

    // !!!!!Обработчик отправки формы для Block 4!!!!!
    form4.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвратить стандартное поведение формы

        const formData = new FormData(form4); // Получаем данные формы
        const transactionData = {
            amount: formData.get('amount-business-credit'),
            description: formData.get('description-business-credit'), // Описание (Block 1)
            projectId: formData.get('projectId-business-credit'),
            transactionDate: formatDate(formData.get('transactionDate-business-credit')),
            vendorId: formData.get('vendorId-business-credit'),
            walletId: formData.get('walletId-business-credit'),
        };


        // Отправляем данные формы в API для дебетовой личной транзакции
        handleTransactionSubmission(transactionData, baseUrl + '/api/v1/business/transaction/credit', submitButton4, responseMessage4);
    });


    // Функция для форматирования даты в нужный формат
    function formatDate(dateString) {
        if (!dateString) return ''; // Если дата не задана, возвращаем пустую строку
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`; // Форматируем дату как YYYY-MM-DD
    }
});
