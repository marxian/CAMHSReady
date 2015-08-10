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

    function opener(){
      if ($scope.item || $scope.topic) {
        $timeout(function(){
          var t = $scope.item || $scope.topic;
          var st = $('[data-slug='+t.slug+']').offset().top - $('header').height();
          $('html,body').animate({
            scrollTop: st
          }, 'fast');
        }, 500);
      }
    }

    opener();

    $scope.setItem = function(slug) {
      $location.search('item', slug);
    };

    $scope.setTopic = function(slug) {
      $location.search('topic', slug);
    };

    $scope.track = function(type){
      Analytics.trackPage($location.path() + '/' + type);
    };

    $scope.$on('$locationChangeSuccess', function(){
      // Hurried hackin to make links work internally on the advice scetion. God what a mess
      var st = _.pick($location.search(), 'topic', 'item');
      var internal = false;
      if (!_.isEmpty(st)) {
        _.each(st, function(v,k){
          var data_item = _.findWhere(adviceService[k+'s'], {slug: v});
          if ($scope[k] !== data_item) {
            $scope[k] = data_item;
            internal = true;
          }
        });
        if (internal) {
          opener();
        }
      }
    });

  });


