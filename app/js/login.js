'use strict';

/*
 * Pretty simple controller for the login screen.
 * Not much else to say about this one!
 */

angular.module('login', ['peerhandler'])

.controller('LoginCtrl', function($scope, $state, $localStorage, $ionicHistory, peerFactory) {
        // Disable back button so we can't back to login!
        $ionicHistory.nextViewOptions({
            disableBack: true
        });

        // Hack so we're disconnected for sure!
        peerFactory.disconnectFromPeerJS();

        if ($localStorage.user) {
            $scope.user = $localStorage.user;
        }

        $scope.login = function(user) {
            if (typeof user !== 'undefined' && user.phone) {
                // Should probably do some back-end log in related stuff in here?

                if (!peerFactory.isConnected()) {
                    console.log('not connected! connecting');
                    $localStorage.user = user;
                    peerFactory.connectToPeerJS(user.phone).then(function() {
                        $state.go('tabs.contacts');
                    });
                } else {
                    $state.go('tabs.contacts');
                }
            }
        };
});

