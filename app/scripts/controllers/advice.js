'use strict';

angular.module('docready')
  .controller('AdviceCtrl', function ($scope, adviceService, $routeParams, $location, Analytics, $anchorScroll, $timeout) {
    // Process income advice item/topic data
    function initData(data, type) {
      if ($routeParams[type]) {
        // Set the active entry, if any
        $scope[type] = _.findWhere(data, {slug: $routeParams[type]});
      }
      return data;
    }

    $scope.topics = initData(adviceService.topics, 'topic');
    $scope.items = initData(adviceService.items, 'item');

    if ($scope.item || $scope.topic) {
      $timeout(function(){
        var t = $scope.item || $scope.topic;
        var st = $('[data-slug='+t.slug+']').offset().top - $('header').height();
        $('html,body').animate({
          scrollTop: st
        }, 'fast');
      }, 500);
    }

    $scope.setItem = function(slug) {
      $location.search('item', slug);
    };

    $scope.setTopic = function(slug) {
      $location.search('topic', slug);
    };

    $scope.track = function(type){
      Analytics.trackPage($location.path() + '/' + type);
    };

  });


