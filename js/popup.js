var app = angular.module('app', []);

chrome.tabs.executeScript({file: '/js/jquery.js'});


app.controller('Popup', function ($scope, $http) {
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
    $scope.generateText = function (value) {
        var xhr = new XMLHttpRequest(),
            _value = value.split(':'),
            host = 'https://montanaflynn-lorem-text-generator.p.mashape.com/',
            response;

        xhr.open('GET', host + _value[0] + '?count=' + _value[1], false);
        xhr.setRequestHeader('X-Mashape-Key', 'M9cAROt2eNmshJMy3feYN5u2V1YSp1Qa5iMjsnLV0ZYQSfB9rC');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send();

        response = JSON.parse(xhr.responseText);

        return response.join(' ');
    };
});
