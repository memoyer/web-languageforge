angular.module('palaso.ui.dc.entry', ['palaso.ui.dc.fieldrepeat', 'palaso.ui.dc.sense',
  'ngAnimate', 'lexicon.services', 'bellows.services'])

  // Palaso UI Dictionary Control: Entry
  .directive('dcEntry', ['lexUtils', 'modalService', function (utils, modal) {
    return {
      restrict: 'E',
      templateUrl: '/angular-app/languageforge/lexicon/directive/dc-entry.html',
      scope: {
        config: '=',
        model: '=',
        control: '='
      },
      controller: ['$scope', '$state', function ($scope, $state) {
        $scope.$state = $state;
        $scope.addSense = function ($position) {
          var newSense = {};
          $scope.control.makeValidModelRecursive($scope.config.fields.senses, newSense, 'examples');
          if ($position == 0) {
            $scope.model.senses.unshift(newSense);
          } else {
            $scope.model.senses.push(newSense);
          }
        };

        $scope.deleteSense = function (index) {
          var deletemsg = "Are you sure you want to delete the meaning <b>' " +
            utils.getMeaning($scope.config.fields.senses, $scope.model.senses[index])  + " '</b>";
          modal.showModalSimple('Delete Meaning', deletemsg, 'Cancel', 'Delete Meaning')
            .then(function () {
              $scope.model.senses.splice(index, 1);
              $scope.control.saveCurrentEntry();
            });
        };

      }],

      link: function (scope, element, attrs, controller) {
      }
    };
  }])

;
