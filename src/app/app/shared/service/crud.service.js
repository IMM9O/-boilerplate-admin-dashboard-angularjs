(function () {

    angular
        .module('app')
        .service('crudServices', crudServices);

    crudServices.$inject = ['apiHttpServices', 'toaster'];
    function crudServices(apiHttpServices, toaster) {

        this.createItem = createItem;
        this.deleteItem = deleteItem;
        this.getDropDownList = getDropDownList;
        this.pageChanged = pageChanged;
        this.readItem = readItem;
        this.setApi = setApi;
        this.updateItem = updateItem;

        ////////////////

        function setApi(url) {
            apiHttpServices.set(url);
        }

        function pageChanged(pageNumber, callback) {
            apiHttpServices.page(pageNumber)
                .then(function (serverData) {
                    callback(serverData.data.data, serverData.data.total);
                }, function (error) {
                    toaster.error('تعذر الإتصال بالخادم', '', { timeOut: 5000 });
                    callback(false);
                });
        }

        function getDropDownList(callback) {
            apiHttpServices.create()
                .then(function (serverData) {
                    callback(serverData.data);
                }, function (error) {
                    callback(false);
                });
        }


        function createItem(items, successCallback, errorCallback) {
            apiHttpServices.store(items)
                .then(function (serverData) {
                    toaster.success('لقد تم حفظ البيانات بنجاح', '', { timeOut: 5000 });
                    successCallback(serverData.data);
                }, function (error) {
                    errorCallback(error.data);
                });
        }

        function readItem(id, callback) {
            apiHttpServices.show(id)
                .then(function (serverData) {
                    callback(serverData.data);
                }, function (error) {
                    toaster.error('تعذر الإتصال بالخادم', '', { timeOut: 5000 });
                    callback(false);
                });
        }

        function updateItem(items, id, successCallback, errorCallback) {
            apiHttpServices.update(items, id)
                .then(function (serverData) {
                    toaster.success('لقد تم حفظ البيانات بنجاح', '', { timeOut: 5000 });
                    successCallback(serverData.data);
                }, function (error) {
                    errorCallback(error.data);
                });
        }

        function deleteItem(item, callback) {
            var result = window.confirm('هل انت متاكد ؟');
            if (result) {
                apiHttpServices.destroy(item.id)
                    .then(function (serverData) {
                        callback(true);
                    }, function (error) {
                        toaster.error('تعذر الحذف', '', { timeOut: 5000 });
                        callback(false);
                    });
            }
        }

    }
})();
