(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  /** controls list of items to buy **/
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var showToBuy = this;

    //get inital itemsToBuy
    showToBuy.itemsToBuy = ShoppingListCheckOffService.getToBuyItems();

    //removes moves item from itemsToBuy to alreadyBoughtItems
    showToBuy.checkOffItem = function(itemIndex) {
      ShoppingListCheckOffService.checkOffItem(itemIndex);
    }

  };

  /** controls list of items already bought **/
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var showAlreadyBought = this;

    showAlreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    //init toBuyItems & alreadyBoughtItems
    var toBuyItems = [];
    var alreadyBoughtItems = [];

    //add some initial content to toBuyItems
    toBuyItems.push({ name: "cookies", quantity: 10 });
    toBuyItems.push({ name: "pizzas", quantity: 3 });
    toBuyItems.push({ name: "cokes", quantity: 2 });
    toBuyItems.push({ name: "pisco", quantity: 1 });
    toBuyItems.push({ name: "napkins", quantity: 6 });


    service.getToBuyItems = function() {
      return toBuyItems;
    };

    service.getAlreadyBoughtItems = function() {
      return alreadyBoughtItems;
    };

    //moves item from toBuyItems to alreadyBoughtItems
    service.checkOffItem = function(itemIndex) {
      var checkedOffItem = toBuyItems.splice(itemIndex, 1)[0];
      alreadyBoughtItems.push(checkedOffItem);
    };



  };

})();
