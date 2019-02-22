angular.module('angular-app', [])

.component('app', {
    templateUrl: 'client/templates/app.html',
    controller: function($http) {
        let $ctrl = this;
    }
});