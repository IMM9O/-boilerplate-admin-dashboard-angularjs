function apiHttpServices ($http) {
    var url = 'api/';
    return {

        set : function(apiRescources){
              url += apiRescources+'/';
        },
        // get page resource
        page: function(id) {
           return $http.get(url+'?page='+id);
        },
        

        // get one resource
        get : function(id) {
            return $http.get(url+id);
        },

        // save resource
        save : function(commentData) {
            return $http({
                method: 'POST',
                url: url,
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: commentData
            });
        },

        // destroy resource
        destroy : function(id) {
            return $http.delete(url + id);
        }
    }

};


ANGULARJS_APP.factory('apiHttpServices', ['$http' , apiHttpServices]);