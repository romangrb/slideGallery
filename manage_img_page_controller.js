(function(){
  
  "use strict";
  
  angular
    .module('galleryApp')  
      .controller('manageImgController', ['$scope', 'SlView', 'slViewModel', 'constant', function ($scope, SlView, slViewModel, constant) {
      
      $scope.pageClass = 'page-manage';

      }]);
    
})();