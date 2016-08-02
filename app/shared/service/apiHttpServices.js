function apiHttpServices ($http , $httpParamSerializerJQLike) {
    var url = 'api/';
    return {

        set : function(apiRescources){
              url += apiRescources+'/';
        },

        // get page resource
        page: function(id) {
           return $http.get(url+'?page='+id);
        },
        
        // store resource
        store : function(postData) {
            console.log(postData);
            return $http({
                method: 'POST',
                url: url,
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data:$httpParamSerializerJQLike(postData) 
            });
        },

        // get one resource
        show : function(id) {
            return $http.get(url+id);
        },
        
        // update one rwsource 
        update : function(postData , id){
            console.log(postData);
            return $http({
                method: 'PUT',
                url: url+''+id+'/',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data:$httpParamSerializerJQLike(postData) 
            });
        },

        // destroy resource
        destroy : function(id) {
            return $http.delete(url + id);
        }
    }

};


MLHAT_APP.factory('apiHttpServices', ['$http' ,'$httpParamSerializerJQLike' , apiHttpServices]);