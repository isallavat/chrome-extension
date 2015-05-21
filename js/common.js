var app = angular.module('app', []),
    manifest = chrome.runtime.getManifest();

app.run(function($rootScope) {
    $rootScope.options = localStorage.options ? JSON.parse(localStorage.options) : {};

    /**
     * Локализация
     */
    $rootScope.i18n = function (name) {
        return chrome.i18n.getMessage(name);
    };
});
