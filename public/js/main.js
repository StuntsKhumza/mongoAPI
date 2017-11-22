angular.module('app', []).
controller('contr', ($scope, $http) => {
    $scope.users = {
        username: '',
        password: ''
    }

    $scope.submit = () => {

        $http.post('/login', $scope.users)
            .then((response) => {
                console.log($scope.users);
                if (response.data.status == 200){

                    console.log("success");

                }
                else {
                    console.log(response);
                }
                

            },
           (response) => {
                console.log(response);


            })


    }
})