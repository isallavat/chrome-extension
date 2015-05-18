var app = angular.module('app', []);


app.controller('Options', function ($scope) {
    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};
    $scope.options.forms = $scope.options.forms || [];

    $scope.addFormField = function () {
        $scope.options.forms.push({name: '', value: ''});
    };

    $scope.removeFormField = function (index) {
        $scope.options.forms.splice(index, 1);
    };

    $scope.save = function () {
        localStorage.options = JSON.stringify($scope.options);
    };
});


app.controller('Popup', function ($scope) {
    var $ = jQuery,
        $html;

    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};

    $scope.fillForm = function () {
        chrome.tabs.executeScript({code: "document.getElementsByTagName('html')[0].innerHTML;"},
            function (html) {
                alert($(html).find('body').attr('class'));
            }
        );
        /*angular.forEach($scope.options.forms, function(item) {
            console.log(jQuery('[name="' + item.name + '"]').length);
            //jQuery('[name="' + item.name + '"]').val(item.value);
        });*/
    };

    $scope.getOptions = function () {
        chrome.tabs.create({ url: chrome.extension.getURL('options.html') });
    };
});
