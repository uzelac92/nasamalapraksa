app.service('loginService',['$location','$firebaseAuth', function ($location,$firebaseAuth) {

    var user = '';
    var auth = $firebaseAuth;
    return {
        getuser: function() {
            if(user == "") {
                user = localStorage.getItem('userEmail');
            }
            return user;
        },
        setuser: function() {
            localStorage.setItem('userEmail',value);
            user = value;
        }
    }
}]);