var app = angular.module('app', []);

/*chrome.contextMenus.create({
    title: 'Title', onclick: function () {
        alert('clicked');
    }
});*/


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

    chrome.tabs.executeScript({
        code: "document.getElementsByTagName('html')[0].innerHTML;"},
        function (html) {
            $html = $('<div/>').append(html);
        }
    );

    $scope.options = localStorage.options ? JSON.parse(localStorage.options) : {};

    $scope.fillForm = function () {
        angular.forEach($scope.options.forms, function(item) {
            alert($html.find('[name="' + item.name + '"]').attr('id'));
            $html.find('[name="' + item.name + '"]').val(item.value);
        });
        //window.close();
    };

    $scope.getOptions = function () {
        chrome.tabs.create({ url: chrome.extension.getURL('options.html') });
    };
});
