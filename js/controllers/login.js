app.controller('loginCtrl', function($scope, $firebaseAuth,$location){

  $scope.logID = '';

  $scope.signIn = function() {
      var username = $scope.user.email;
      var password = $scope.user.password;
      var auth = $firebaseAuth();
      auth.$signInWithEmailAndPassword(username,password)
      .then(function(user){
          $scope.logID = user.user.uid;
          toastr.success('You have logged in successfully ', 'Success');
          localStorage.setItem('userID', $scope.logID);
          $scope.cancel();
          window.location.reload();
      }).catch(function() {
          toastr.error('There is no user record corresponding to this identifier. The user may have been deleted.', 'Error: User not found');
          $scope.cancel();
          window.location.reload();
      });
  }
});