(function () {

    angular
        .module('app')
        .service('apiHttpServices', apiHttpServices);

    apiHttpServices.$inject = ['$http', '$httpParamSerializerJQLike'];
    function apiHttpServices($http, $httpParamSerializerJQLike) {

        this.create = create;
        this.destroy = destroy;
        this.page = page;
        this.set = set;
        this.show = show;
        this.store = store;
        this.update = update;

        ////////////////
        function set(apiRescources) {
            this.url = 'api/' + apiRescources + '/';
        }
        function page(id) {
            return $http.get(this.url + '?page=' + id);
        }
        function create() {
            return $http.get(this.url + 'create/');
        }
        function store(postData) {
            return $http({
                method: 'POST',
                url: this.url,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $httpParamSerializerJQLike(postData)
            });
        }
        function show(id) {
            return $http.get(this.url + id);
        }
        function update(postData, id) {
            return $http({
                method: 'PUT',
                url: this.url + '' + id + '/',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: $httpParamSerializerJQLike(postData)
            });
        }
        function destroy(id) {
            return $http.delete(this.url + id);
        }
    }
})();