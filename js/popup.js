chrome.tabs.query({active: true}, function (tab) {
    window.activeTab = tab[0];
    chrome.tabs.executeScript(window.activeTab.id, {file: '/js/jquery.js'});
});


app.controller('Popup', function ($scope, $rootScope) {
    /**
     * Выполнение скриптов для активной вкладки
     *
     * @param {string} action
     * @param {object} param
     */
    $scope.exec = function (action, param) {
        chrome.tabs.executeScript(window.activeTab.id, {
            code: 'var action = "' + action + '", params = ' + JSON.stringify(param)
        }, function () {
            chrome.tabs.executeScript(window.activeTab.id, {file: '/js/exec.js'});
            window.close();
        });
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
        /*var xhr = new XMLHttpRequest(),
            _value = value.split(':'),
            url = 'http://referats.yandex.ru/referats/?t=marketing',
            response;

        xhr.open('GET', url, false);
        xhr.send();

        $scope.yaReferatsTextAsObject(xhr.responseText);*/

        return value;
    };


    $scope.yaReferatsTextAsObject = function (html) {
        var div = document.createElement('div'),
            text = {};

        div.innerHTML = html;
        //text.paragraphs = div.querySelectorAll('.referats__text p')
        alert(div.querySelector('.referats__text p').innerHTML);
    };
});
