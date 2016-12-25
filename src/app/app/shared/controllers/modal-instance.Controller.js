/***
 * this controller like handover methods get the items set the items for modal 
 * and then return the item back to the modalInstance so you can use it to send update in restfaul api 
 * 
 */

(function () {
    'use strict';

    angular
        .module('app')
        .controller('ModalInstanceController', ModalInstanceController);

    ModalInstanceController.$inject = [
        '$uibModalInstance',
        'items',
        'id',
        'type',
        'url',
        'crudServices'
    ];
    function ModalInstanceController($uibModalInstance, items, id, type, url, crudServices) {
        var vm = this;
        var formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'yyyy-MM-dd', 'shortDate'];

        vm.items = items;
        vm.formErrors = {};
        vm.format = formats[2];
        vm.altInputFormats = formats[2];
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        vm.popup1 = { opened: false };
        vm.popup2 = { opened: false };

        vm.open1 = openPopup1;
        vm.open2 = openPopup2;
        vm.ok = saveModal;
        vm.cancel = cancelModal;

        //////////////////////////////////////////

        function openPopup1() {
            vm.popup1.opened = true;
        }

        function openPopup2() {
            vm.popup2.opened = true;
        }


        function saveModal() {
            if (type === 'store') {
                crudServices.createItem(items, function (data) {
                    $uibModalInstance.close(data);
                }, function (error) {
                    vm.formErrors = error;
                });
            }
            else if (type === 'update') {
                crudServices.updateItem(items, id, function (data) {
                    $uibModalInstance.close(data);
                }, function (error) {
                    vm.formErrors = error;
                });

            }

        }

        function cancelModal() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();




