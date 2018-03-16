/**
 * Created by Veery Team on 6/1/2016.
 */

'use strict';

opConsoleApp.controller('loginCtrl', function ($rootScope, $scope, $state, $http,
                                               loginService,
                                               config, $base64, $auth, ngNotify) {


    var para = {
        userName: null,
        password: null,
        clientID: $base64.encode(config.client_Id_secret),
        console: 'OPERATOR_CONSOLE'
    };
    var showPNotifyMsg = function (title, type, content) {
        new PNotify({
            title: title,
            text: content,
            type: type,
            styling: 'bootstrap3',
            animate: {
                animate: true,
                in_class: "bounceIn",
                out_class: "bounceOut"
            }
        });
    };


    $scope.isLogin = false;
    $scope.onClickLogin = function () {
        $('#usersName').removeClass('shake');
        $('#pwd').removeClass('shake');
        para.userName = $scope.userNme;
        para.password = $scope.pwd;
        para.companyName = "facetoneowner";
        para.scope = ["all_all", "profile_veeryaccount", "write_ardsresource", "write_notification", "read_myUserProfile", "read_productivity", "profile_veeryaccount", "resourceid"];

        if (para.userName == null || para.userName.length == 0) {
            showPNotifyMsg('Error', 'error', 'Please check user name..');
            return;
        }
        if (para.password == null || para.password.length == 0) {
            showPNotifyMsg('Error', 'error', 'Please check login password..');
            return;
        }

        //parameter option
        //username
        //password
        //decode clientID
        $scope.isLogin = true;
        $scope.loginFrm.$invalid = true;

        /*

         loginService.Login(para, function (result) {
         if (result) {
         $state.go('console');
         } else {
         $('#usersName').addClass('shake');
         $('#pwd').addClass('shake');
         showPNotifyMsg('Error', 'error', 'Please check login details...');
         $scope.isLogin = false;
         $scope.loginFrm.$invalid = false;
         }
         });
         */

        $auth.login(para)
            .then(function () {
                $state.go('op-console');
            })
            .catch(function (error) {
                $scope.isLogin = false;
                $scope.loginFrm.$invalid = false;
                if (error.status == 449) {
                    ngNotify.set('Activate your account before login...', {
                        position: 'top',
                        sticky: true,
                        duration: 3000,
                        type: 'error'
                    });
                    return;
                }
                $('#usersName').addClass('shake');
                $('#pwd').addClass('shake');
                ngNotify.set('Please check login details...', {
                    position: 'top',
                    sticky: true,
                    duration: 3000,
                    type: 'error'
                });
            });

    };

    $scope.CheckLogin = function () {
        if ($auth.isAuthenticated()) {
            $state.go('op-console.monitor-server-performance');
        }
    };

    ///$scope.CheckLogin();


    //Recover email forget password
    $scope.ResetPassword = function () {
        loginService.forgetPassword($scope.recoverEmail, function (isSuccess) {
            if (isSuccess) {
                showPNotifyMsg('Success', 'success', "Please check email");
                $state.go('login');
            } else {
                showPNotifyMsg('Error', 'error', "Reset Failed");
            }
        })
    };


    $scope.BackToLogin = function () {
        $state.go('login');
    };

    $scope.goToRestEmail = function () {
        $state.go('reset-password-email');
    };

    $scope.goToRestToken = function () {
        $state.go('reset-password-token');
    };


}).directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.myEnter);
                });
                event.preventDefault();
            }
        });
    };
});