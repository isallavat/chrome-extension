app.controller('Options', function ($scope, $rootScope, $timeout) {
    /**
     * Загрузка файла настроек
     *
     * @param {object} event
     */
    $scope.uploadOptions = function (event) {
        var file = event.target.files[0],
            fr = new FileReader();

        fr.onload = function () {
            try {
                $rootScope.options = JSON.parse(fr.result);
                $rootScope.$apply();
                $scope.save();
            }
            catch (e) {
                alert(chrome.i18n.getMessage('fileIsNotJSON'));
            }
        };

        fr.readAsText(file);
    };


    /**
     * Добавление формы
     */
    $scope.addForm = function () {
        $rootScope.options.forms = $rootScope.options.forms || [];
        $rootScope.options.forms.unshift({title: '', sites: '', items: []});
    };


    /**
     * Удаление формы
     *
     * @param {number} index
     */
    $scope.removeForm = function (index) {
        $rootScope.options.forms.splice(index, 1);
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
        localStorage.options = JSON.stringify($rootScope.options);
        
        $scope.msg = {
            type: 'success',
            text: chrome.i18n.getMessage('saved')
        };

        $timeout(function () {
            $scope.msg = null;
        }, 2000);
    };


    angular.element(document.querySelector('[type="file"]')).on('change', $scope.uploadOptions);
});
