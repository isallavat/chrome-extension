var app = angular.module('app', []);

chrome.tabs.executeScript({file: '/js/jquery.js'});


app.controller('Popup', function ($scope) {
    chrome.tabs.executeScript({
        code: 'JSON.stringify(window.location)'
    }, function (location) {
        $scope.tabLocation = JSON.parse(location);
    });


    // Получение настройки расширения
    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};


    /**
     * Выполнение скриптов для активной вкладки
     *
     * @param {string} action
     * @param {object} param
     */
    $scope.exec = function (action, param) {
        chrome.tabs.executeScript({
            code: 'var action = "' + action + '", params = ' + JSON.stringify(param)
        }, function () {
            chrome.tabs.executeScript({file: '/js/exec.js'});
            window.close();
        });
    };


    /**
     * Открытие вкладки с настройками
     */
    $scope.getOptions = function () {
        chrome.runtime.openOptionsPage();
    };


    /**
     * Заполнение формы на активной вкладке
     *
     * @param {object} form
     */
    $scope.fillForm = function (form) {
        var _form = form;

        _form.items.map(function (item) {
            switch (item.type) {
                case 'email':
                    item.value = $scope.generateEmail(item.value);
                    break;
                case 'randomText':
                    item.value = $scope.generateText(item.value);
                    break;
            }
        });

        $scope.exec('fillForm', _form);
    };


    /**
     * Открытие/скрытие подменю
     *
     * @param {object} $event
     */
    $scope.toggleSubmenu = function ($event) {
        angular.element($event.target).parent().toggleClass('active');
    };


    /**
     * Генерация E-mail
     *
     * @param {string} email
     * @returns {string}
     */
    $scope.generateEmail = function (email) {
        email = email.split('@');
        return email[0] + '+' + Date.now() + '@' + email[1];
    };


    /**
     * Генерация текста
     *
     * @param {number} length
     * @returns {string}
     */
    $scope.generateText = function (length) {
        return 'text';
    };


    /**
     * Проверка соответсвия домена для формы
     *
     * @param {string} sites
     * @returns {boolean}
     */
    $scope.checkSite = function (sites) {
        var _sites = sites.replace(/\s*/g, '').split(','),
            res = false;

        _sites.forEach(function (item) {
            if ((new RegExp(item, 'ig')).test($scope.tabLocation.host)) {
                res = true;
            }
        });

        return res;
    };
});
