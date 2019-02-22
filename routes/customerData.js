const express = require('express');
const router = express.Router();
var dateFormat = require('dateformat');
var azure = require('azure-storage');

var tableSvc = azure.createTableService('joyaliotb2b1', '34yZmiAn9qMUc9MgadcH/8+fjT0Zd+zK4n7cGWIPi7Jm6Iwmgd4rVccrLpe4Hq/glQfNGxsiyAefvYm+LVS7VA==');

// Get All Customers
router.get('/getCustomers', function(req, res, next) {
    var customerDataQuery = new azure.TableQuery();
    tableSvc.queryEntities('customerdata', customerDataQuery, null, function(error, result, response) {
        if (!error) {
            var data = result.entries;
            res.json(data);
        }
    });
});

// Get Customer Thresholds
router.get('/getCustomerThreshold/:id', function(req, res, next) {
    var customerThresholdQuery = new azure.TableQuery().where('PartitionKey eq ?', req.params.id);
    tableSvc.queryEntities('thresholds', customerThresholdQuery, null, function(error, result, response) {
        if (!error) {
            var data = result.entries;
            res.json(data);
        }
    });
});

router.get('/getCustomerData/:id', function(req, res, next) {
    var now = new Date();
    var partitionKey = dateFormat(now, "yyyymmm");
    var utcTime = new Date(dateFormat(now, "isoUtcDateTime"));
    utcTime.setSeconds(utcTime.getSeconds() - 30);
    var customerDataQuery = new azure.TableQuery().where('PartitionKey eq ?', partitionKey).and('Timestamp >= ?', utcTime);
    tableSvc.queryEntities(req.params.id, customerDataQuery, null, function(error, result, response) {
        if (!error) {
            var data = result.entries;
            res.json(data);
        }
    });
});
module.exports = router;