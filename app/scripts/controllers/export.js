'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, settings, symptomService, $window, $http, $resource, $timeout, Analytics, $location, supplementary_content, custom_config) {
    var Email = $resource(settings.apiRoot + '/email');
    var SMS = $resource(settings.apiRoot + '/sms');
    $scope.selections = symptomService.selections;
    $scope.settings = settings;
    $scope.showMailer = false;
    $scope.smsEnabled = custom_config.sms;
    $scope.showSMS = false;
    $scope.app_domain = custom_config.app_domain;
    $scope.supplementary = _.filter(supplementary_content, function(s){ return s.answer;});

    $scope.prepareMail = function(){
      $scope.showMailer = !$scope.showMailer;
      $scope.email = new Email({
        recipient: '',
        symptoms: _.chain(symptomService.exportSymptoms()).pluck('title').value(),
        supplementary: $scope.supplementary,
        permalink: $scope.permalink()
      });
    };

    $scope.sendEmail = function(){
      $scope.email.state = 'sending';
      $scope.email.$save(function(){
        $scope.email.state = 'sent';
        // close the send dialog after showing the sent state for a while
        $timeout(function(){ $scope.showMailer = false; }, 1000);
      });
    };

    $scope.getpdf = function(){
      var data = {
          surgery: settings.surgery,
          supplementary: $scope.supplementary,
          symptoms: _.chain(symptomService.exportSymptoms()).pluck('title').value()
        };
      var checklistPdfLink = settings.apiRoot + '/pdf?data=' + encodeURIComponent(JSON.stringify(data));
      var checklistDownloadLink = document.getElementById('checklistDownloadLink');
      checklistDownloadLink.target = '_blank';
      checklistDownloadLink.href = checklistPdfLink;
      console.log(checklistDownloadLink.href);
      checklistDownloadLink.click();
    };

    $scope.prepareSMS = function(){
      $scope.showSMS = !$scope.showSMS;
      $scope.sms = new SMS({
        recipient: '',
        symptoms: _.chain(symptomService.exportSymptoms()).pluck('title').value(),
        supplementary: $scope.supplementary
      });
    };

    $scope.sendSMS = function(){
      $scope.sms.state = 'sending';
      $scope.sms.$save(function(){
        $scope.sms.state = 'sent';
        // close the send dialog after showing the sent state for a while
        $timeout(function(){ $scope.showSMS = false; }, 1000);
      });
    };

    $scope.permalink = function(){
      var persist = JSON.stringify({
        symptoms: symptomService.exportSymptoms()
      });
      return '/#/checklist?load=' + encodeURIComponent(persist);
    };

    $scope.print = function(){
      $window.print();
    };

    $scope.track = function(type){
      Analytics.trackPage($location.path() + '/' + type);
    };

  });
