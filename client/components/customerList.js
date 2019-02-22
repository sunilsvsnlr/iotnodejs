angular.module('angular-app')

.component('customerList', {
    templateUrl: 'client/templates/customerList.html',
    controller: function($http, $filter, $interval) {
        let $ctrl = this;
        $ctrl.customers = [];
        $ctrl.customerthresholds = [];
        $ctrl.customerData = [];
        $http.get('/api/getCustomers').then(function(res) {
            res.data.forEach((obj) => {
                $ctrl.customers.push(obj);
            })
        });

        $ctrl.viewInfo = function(customer) {
            $ctrl.selectedCustomer = customer;
            $http.get('/api/getCustomerThreshold/' + customer.customer._).then(function(res) {
                $ctrl.customerthresholds = res.data;
            });

            getCustomerData(customer.customer._);

            $interval(getCustomerData, 30000);
        };

        function getCustomerData() {
            if ($ctrl.selectedCustomer) {
                $http.get('/api/getCustomerData/' + $ctrl.selectedCustomer.customer._).then(function(res) {
                    $ctrl.customerData = res.data;
                });
            }
            $ctrl.refreshedAt = new Date();
        }
    }
});