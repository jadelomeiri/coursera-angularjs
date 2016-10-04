(function () {
  'user strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItems)
  .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

  function FoundItems() {
    var ddo = {
      templateUrl: 'foundItems.html'
    };

    return ddo;

  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowItDown = this;

    narrowItDown.searchTerm = "";

    narrowItDown.getMatchedMenuItems = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function(response) {
         var foundItems = [];

         if(searchTerm !== "") {
           for (var i = 0; i < response.data.menu_items.length; i++) {
             if (response.data.menu_items[i].description.toLowerCase().includes(searchTerm.toLowerCase())) {
               foundItems.push(response.data.menu_items[i]);
             }
           }
         }

         narrowItDown.itemsFound = foundItems;
      })
      .catch(function(error) {
        console.log("something went wrong!");
      });
    };


    narrowItDown.remove = function(index) {
      narrowItDown.itemsFound.splice(index, 1);
    }
  };

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function() {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      });

      return response;


      //get menu items with $http

      //loop through memu items & check if contains searchTerm

      //return those found
    };
  };

})();
