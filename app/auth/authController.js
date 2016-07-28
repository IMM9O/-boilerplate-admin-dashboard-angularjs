(function() {

'use strict';

    function AuthController($auth, $state) {
         console.log('object');
        var vm = this;
            
        vm.login = function() {

            var credentials = {
                email: vm.email,
                password: vm.password
            }

            console.log(credentials);
            
            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {

                // If login is successful, redirect to the users state
                $state.go('dash.index');
            });
        }

    };

    ANGULARJS_APP.controller('AuthController', ['$auth' , '$state' ,AuthController]);


})();