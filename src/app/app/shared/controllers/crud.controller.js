
(function () {
    'use strict';

    angular
        .module('app')
        .controller('CRUDController', CRUDController);

    CRUDController.$inject = ['vm', '$uibModal', 'crudServices', 'apiUrl', 'emptyObject'];
    function CRUDController(vm, $uibModal, crudServices, apiUrl, emptyObject) {

        vm.createItem = createItem;
        vm.data = [];
        vm.deleteItem = deleteItem;
        vm.modalInstance = undefined;
        vm.opnModal = opnModal;
        vm.pageChanged = pageChanged;
        vm.totalItems = 0;
        vm.updateItem = updateItem;

        ///////////////////////////////////////////////////
        function pageChanged(pageNumber) {
            crudServices.setApi(apiUrl);
            crudServices.pageChanged(pageNumber, function (data, total) {
                vm.data = data;
                vm.totalItems = total;
            });
        }

        function createItem() {
            console.log(emptyObject);
            crudServices.setApi(apiUrl);
            opnModal(emptyObject, null, 'store', apiUrl, 'createModal.tpl.html');
            if (vm.modalInstance !== undefined) {
                vm.modalInstance.result.then(function (items) {
                    vm.data.push(items);
                });
            }

        }

        function updateItem(id, index) {
            crudServices.setApi(apiUrl);
            crudServices.readItem(id, function (data) {
                opnModal(data, id, 'update', apiUrl, 'updateModal.tpl.html');
                if (vm.modalInstance !== undefined) {
                    vm.modalInstance.result.then(function (items) {
                        vm.data[index] = items;
                    });
                }

            });
        }

        function deleteItem(item, index) {
            crudServices.setApi(apiUrl);
            crudServices.deleteItem(item, function (result) {
                if (result) {
                    vm.data.splice(index, 1);
                }
            });
        }

        function opnModal(data, id, type, url, modalName) {

            vm.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: modalName,
                controller: 'ModalInstanceController',
                controllerAs: 'modalCtrl',
                size: 'lg',
                resolve: {
                    items: function () {
                        return data;
                    },
                    type: function () {
                        return type;
                    },
                    url: function () {
                        return url;
                    },
                    id: function () {
                        return id;
                    }

                }
            });

        }
    }
})();