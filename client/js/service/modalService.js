'use strict';

app.factory('ModalService', ['$uibModal', function($uibModal) {

    return {

        default: function (templateUrl, controller, size, resolve) {
            return $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: templateUrl,
                controller: controller,
                size: size,
                resolve: resolve,
                windowClass: 'modal-window'
            })
        },

        loading: function () {
            return $uibModal.open({
                animation: true,
                templateUrl: 'partials/modal/modalLoading.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.cancel = function() { $uibModalInstance.dismiss('cancel'); };
                },
                resolve: {}
            });
        },

        message: function (message) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'partials/modal/modalMessage.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.message = message;        
                    $scope.cancel = function () { $uibModalInstance.dismiss('cancel'); };
                },
                resolve: {}
            })
        },

        confirmar: function (title, message) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'partials/modal/modalConfirmar.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.title = title;
                    $scope.message = message;        
                    $scope.ok = function() { $uibModalInstance.close(); };
                    $scope.cancel = function () { $uibModalInstance.dismiss('cancel'); };
                },
                resolve: {}
            })
        },

        excluir: function (title, message) {
            return $uibModal.open({
                animation: true,
                templateUrl: 'partials/modal/modalExcluir.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.title = title;
                    $scope.message = message;        
                    $scope.ok = function() { $uibModalInstance.close(); };
                    $scope.cancel = function () { $uibModalInstance.dismiss('cancel'); };
                },
                resolve: {}
            })
        },

        help: function () {
            return $uibModal.open({
                animation: true,
                templateUrl: 'partials/modal/modalHelp.html',
                controller: 'modalHelpController',
                size: 'lg',
                resolve: {}
            })
        }

    }

}]);