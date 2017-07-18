(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
.directive('foundItems',FoundItems);

function FoundItems(){
  var ddo = {
    templateUrl : 'items.html',
    scope: {
      items: '<',
      onRemove: '&'
    }
  };
  return ddo;
}

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService){

  var narrow = this;
  narrow.found = [];

  narrow.getMatchedMenuItems = function (){
    narrow.found = [];
    if(narrow.searchTerm){
      var promise = MenuSearchService.getMatchedMenuItems(narrow.searchTerm);
      promise.then(function(response){
        narrow.found = response;
      })
      .catch(function(error){
        console.log("Something went terribly wrong");
      })
    }
  }
  narrow.removeItem = function(myIndex){
    narrow.found.splice(myIndex,1);
    if(narrow.found.length==0){
      menu.error = "Nothing found";
    }
  }

};
//
//   var promise = MenuSearchService.getMatchedMenuItems();
//
//   promise.then(function (response){
//     narrow.found = response;
//   })
//   .catch(function(error){
//     console.log("Something went terribly wrong.");
//   });
// };

MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){
      var items = result.data.menu_items;
      var foundItems = [];
      for( var i=0;i<items.length;i++){
        if(items[i].description.indexOf(searchTerm)!=-1){
          foundItems.push(items[i]);
        }
      }
      return foundItems;
    });
  };
};


  // service.getMenuForCategory = function (name){
  //   var response = $http ({
  //     method: "GET",
  //     url : (ApiBasePath + "/menu_items.json"),
  //     params: {
  //       category:name
  //     }
  //   });
  //   return response;
  // };



})();
