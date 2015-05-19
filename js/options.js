var app = angular.module('app', []);

app.controller('Options', function ($scope, $http) {
    // Получение настройки расширения
    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};


    /**
     * Загрузка файла настроек
     *
     * @param {object} event
     */
    $scope.loadOptions = function (event) {
        $http.get(event.target.value).success(function(data) {
            console.log(data);
        });
        /*var file = event.target.files[0],
            reader = new FileReader();

        console.log(reader.readAsText(file));*/
    };


    /**
     * Добавление формы
     */
    $scope.addForm = function () {
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
    };


    angular.element(document.querySelector('[type="file"]')).on('change', $scope.loadOptions);
});
