(function(){
'use strict';

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService){

  var found = [];

  var narrow = this;
  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response){
    narrow.categories = response.data;
  })
  .catch(function(error){
    console.log("Something wend terribly wrong.");
  });
  // menu.logMenuItems = function (name){
  //   var promise = NarrowItDownService.getMenuForCategory(name);
  //
  //   promise.then(function(response){
  //     console.log(response.data);
  //   })
  //   .catch(function(error){
  //     connsole.log(error);
  //   })
  // }
};

MenuSearchService.$inject = ['$http','ApiBasePath'];
function MenuSearchService($http,ApiBasePath){
  var service = this;

  var foundList = [];

  service.getMatchedMenuItems = function(searchTerm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });
    response.then(function(response){
       console.log(response.data);
    })
    var length = Object.keys(response).length;
    console.log(length);
    // var key,count = 0;
    // for(key in response){
    //   if(response.hasOwnProperty(key)){
    //     count++;
    //   }
    // }
    // console.log(count);
    // for(var i=0;i<length;i++){
    //   if(response.name.indexOf('searchTerm')){
    //     foundList.push(response.name);
    //   };
    // }
    return response;

  }

  service.removeItem = function(itemIndex){

  }


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
}


})();
