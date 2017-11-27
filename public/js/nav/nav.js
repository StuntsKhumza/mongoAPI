angular.module('nav-app', ['ngCookies'])
    .directive('navigationNav', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/nav/nav.html',
            controllerAs: 'navCtr',
            scope: {
                username: '=',
                linksObj: '=',
                roles: '=',
                bttsetting: '='
            }
            ,
            controller: function ($state, $http, $cookies, serviceSession) {

                var self = this;
                self.userName = "";
                self.spinner = true;

                loadUsername();

                function loadUsername() {
                   
                    $http.get('/getSession')

                        .then(function (response) {

                            if (!_.isEmpty(response.data)) {
                                
                                self.userName = response.data.userdata.NAME;

                            } else {
                                 $state.go('login');
                            }

                            self.spinner = false;
                        })

                }

                self.goHome = function () {
                    $state.go('profiles');
                }


                self.linksObj = {
                    brand: {
                        title: "Dr's Co",
                        img: 'img/1477676379_icon-57.png'

                    },
                    links: [
                        { title: 'Home', link_state: '1', state_name: 'profiles' },
                        { title: 'New', link_state: '0' }]
                }

                self.logOff = function () {

                    $cookies.remove('m_userid');
                    $http.get('php/service.php?q=logOff');

                    $state.go('login');
                }

                self.addPatient = function () {
                    $state.go('adduserprofile');
                }


                self.openBookings = function () {

                    window.open("/mathebula/viewBookings", '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');

                }


            }
        }
    })