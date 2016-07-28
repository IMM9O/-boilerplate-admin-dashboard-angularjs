/***
 * this controller like handover methods get the items set the items for modal 
 * and then return the item back to the modalInstance so you can use it to send update in restfaul api 
 * 
 */

function ModalInstanceCtrl( $uibModalInstance, items) {
        var self = this ;
        self.items = items;

        self.ok = function () {
            $uibModalInstance.close(self.items);
        };

        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
};


ANGULARJS_APP.controller('ModalInstanceCtrl', [ '$uibModalInstance', 'items' ,ModalInstanceCtrl]);
    
    
    
    