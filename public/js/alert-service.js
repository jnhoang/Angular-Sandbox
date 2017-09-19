app
.module('AlertModule', [])
.factory('AlertService', [
  function($sce) {
    var alerts = [];
    
    return {
      addAlerts     : addAlerts,
      clearAlerts   : clearAlerts,
      getAlerts     : getAlerts
    };

    function getAlerts() {
      return alerts;
    }
    function addAlerts(message, type) {
      alerts.push({ message: message, type: type });
    }
    function clearAlerts() {
      alerts = [];
    }
  }
])