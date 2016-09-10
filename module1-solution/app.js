(function () {
  'use strict';

  angular.module('LunchCheck' , [])
  .controller('LunchCheckController' , LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.lunchMenu = "";

    $scope.checkLunch = function () {
      var numOfFoods = getNumOfFoods($scope.lunchMenu);
      var lunchResponse = getLunchResponse(numOfFoods);
      $scope.lunchResponse = lunchResponse;
    };

    function getNumOfFoods (foodsString) {
      var numOfFoodsFound = 0;

      var foodsArray = foodsString.split(",");

      for (var i in foodsArray) {
        //a food can't be empty or spaces only
        var food = foodsArray[i].trim();
        if (food.length != 0) {
          numOfFoodsFound++;
        }
      }

      return numOfFoodsFound;
    };

    function getLunchResponse (numOfFoodsFound) {
      if(numOfFoodsFound == 0) {
        return "Please enter data first";
      } else if (numOfFoodsFound <= 3) {
        return "Enjoy!";
      } else {
        return "Too much!";
      }
    }
  };

})();
