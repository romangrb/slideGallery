
(function(){
  
  "use strict";
  
  var galleryApp = angular.module("galleryApp", ['ngRoute', 'ngAnimate']);
  
    galleryApp.config(function($routeProvider) {
        $routeProvider
        	.when('/', {
        	  templateUrl: 'gallery_page.html',
            controller: 'slideViewController'
        	})
        	.when('/gallery', {
        		templateUrl: 'gallery_page.html',
            controller: 'slideViewController'
        	})
        	.when('/manage', {
        		templateUrl: 'img_manage_page.html',
            controller: 'manageImgController'
        	});
    });
    
  return galleryApp;
  
})();  