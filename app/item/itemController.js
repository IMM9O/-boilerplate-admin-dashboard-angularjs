
function ItemController ($uibModal , apiHttpServices){
 

  var self = this ;

  apiHttpServices.set('item');

  self.data = [];
  self.totalItems = 0;

  self.pageChanged = function(newPage) {
    getResultsPage(newPage);
  };

  getResultsPage(1);

  function getResultsPage(pageNumber) {

        apiHttpServices.page(pageNumber).then(function(data) {
          self.data = data.data.data;
          self.totalItems = data.data.total;
        });
  }

  self.saveAdd = function(){
   
  }


  self.edit = function(id){

      apiHttpServices.get(id).then(function(data) {
        self.opnModal(data.data);
      });

  }


  self.update = function(){
    // $http.get(URL + '/api/mlhat/'+self.form.id,'POST',{},self.form).then(function(data) {
    //   	$(".modal").modal("hide");
    //     self.data = apiModifyTable(self.data,data.id,data);
    // });
  }

  self.remove = function(item,index){
    var result = confirm("Are you sure delete this item?");
   	if (result) {

        console.log(item.id);
        apiHttpServices.destroy(item.id)
                 .success(function(data) {
                        console.log(data);
                        //location.reload();
                         self.data.splice(index,1);
                }).error(function(data) {
                        console.log(data);
                        alert('Unable to delete');
                });


    }
  }


  self.opnModal = function(data) {
      var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'editModal.tpl.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: 'modalCtrl',
          size: 'lg',
          resolve: {
            items: function () {
              return data;
            }
          }
      });

      modalInstance.result.then(function (items) {
        console.log(items);
      }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
      });
  }

   
};


ANGULARJS_APP.controller('ItemController', [ '$uibModal' , 'apiHttpServices' , ItemController]);

