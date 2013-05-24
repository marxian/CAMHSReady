'use strict';

angular.module('docready')
  .controller('ExportCtrl', function ($scope, settings, symptomService, $window, $resource, $timeout) {
    var Email = $resource(settings.apiRoot + '/email'),
      Pdf = $resource(settings.apiRoot + '/pdf');
    $scope.symptoms = symptomService.symptoms;

    function symptomList(){
      return _.chain($scope.symptoms).where({selected: true}).pluck('title').value();
    }

    $scope.prepareMail = function(){
      // Toggle our email object
      if ($scope.email) {
        $scope.email = null;
      } else {
        $scope.email = new Email({
          recipient: '',
          symptoms: symptomList()
        });
      }
    };

    $scope.sendEmail = function(){
      $scope.email.state = 'sending';
      $scope.email.$save(function(){
        $scope.email.state = 'sent';
        // close the send dialog after showing the sent state for a while
        $timeout(function(){ $scope.email = null; }, 1000);
      });
    };

    $scope.getPdf = function(){
      var pdf = new Pdf({
        symptoms: symptomList()
      });
      pdf.$save(function(res){
        $window.open(res.pdf);
      });
    };

    $scope.print = function(){
      $window.print();
    };
  });
