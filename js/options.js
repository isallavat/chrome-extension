var app = angular.module('app', []);


app.controller('Options', function ($scope, $timeout) {
    // Получение настройки расширения
    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};


    /**
     * Загрузка файла настроек
     *
     * @param {object} event
     */
    $scope.loadOptions = function (event) {
        var file = event.target.files[0],
            fr = new FileReader();

        fr.onload = function () {
            try {
                $scope.options = JSON.parse(fr.result);
                $scope.$apply();
            }
            catch (e) {
                alert('Содержимое файла не соответсвует стандарту JSON');
            }
        };

        fr.readAsText(file);
    };


    /**
     * Добавление формы
     */
    $scope.addForm = function () {
        $scope.options.forms = $scope.options.forms || [];
        $scope.options.forms.unshift({title: '', sites: '', items: []});
    };


    /**
     * Удаление формы
     *
     * @param {number} index
     */
    $scope.removeForm = function (index) {
        $scope.options.forms.splice(index, 1);
    };


    /**
     * Добавление элемента формы
     *
     * @param {object} form
     */
    $scope.addFormItem = function (form) {
        form.items.push({name: '', value: ''});
    };


    /**
     * Удаление элемента формы
     *
     * @param {object} form
     * @param {number} index
     */
    $scope.removeFormItem = function (form, index) {
        form.items.splice(index, 1);
    };


    /**
     * Сохранение настроек
     */
    $scope.save = function () {
        localStorage.options = JSON.stringify($scope.options);
        
        $scope.msg = {
            type: 'success',
            text: 'Сохранено'
        }

        $timeout(function () {
            $scope.msg = null;
        }, 2000);
    };


    angular.element(document.querySelector('[type="file"]')).on('change', $scope.loadOptions);
});
