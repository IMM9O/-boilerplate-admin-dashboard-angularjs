
function ItemController ($uibModal , apiHttpServices){
 

var self = this ;

  var modalInstance ;

  apiHttpServices.set('item');

  self.data = [];
  self.totalItems = 0;


  self.pageChanged = function(newPage) {
    readPage(newPage);
  };

  readPage(1);

  // read page by page
  function readPage(pageNumber) {

        apiHttpServices.page(pageNumber).then(function(serverData) {
          self.data       = serverData.data.data;
          self.totalItems = serverData.data.total;
        });
  }

  // 	Create new object 
  self.createItem = function(){

    var mlha_object_empty ={'mlha_name': '', 'mlha_desc':'' };
    opnModal(mlha_object_empty , 'createModal.tpl.html');


    if(modalInstance != undefined) {

          modalInstance.result.then(function (items) {
            console.log(items);
            apiHttpServices.store(items).then(function(serverData) {
               console.log(serverData);
            });

          }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
          });
    }
    
  }

  // update object funcsion 
  self.updateItem = function(id){

      apiHttpServices.show(id).then(function(serverData) {

          opnModal(serverData.data, 'updateModal.tpl.html');

          if(modalInstance != undefined) {

              modalInstance.result.then(function (items) {
                console.log(items);
                apiHttpServices.update(items , id).then(function(serverData) {
                  console.log(serverData);
                });


              }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
              });
          }

      });

  }


  // Delete object function 
  self.deleteItem = function(item,index){
    var result = confirm("Are you sure delete this item?");
   	if (result) {

        console.log(item.id);
        apiHttpServices.destroy(item.id)
                 .success(function(serverData) {
                        console.log(serverData);
                        //location.reload();
                         self.data.splice(index,1);
                }).error(function(serverError) {
                        console.log(serverError);
                        alert('Unable to delete');
                });


    }
  }

  function opnModal(data , modalName) {

      modalInstance  = $uibModal.open({
            animation: true,
            templateUrl: modalName,
            controller: 'ModalInstanceCtrl',
            controllerAs: 'modalCtrl',
            size: 'lg',
            resolve: {
              items: function () {
                return data;
              }
            }
        });
        
  } 

   
};


ANGULARJS_APP.controller('ItemController', [ '$uibModal' , 'apiHttpServices' , ItemController]);

