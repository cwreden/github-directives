'use strict'

angular.module('github-directives')
    .directive('commits', function () {
        return {
            restrict: 'A',
            scope: {
                'ghUser': '@',
                'ghRepo': '@'
            },
            template:
                '<span>{{ ghUser }} - {{ ghRepo }}</span>' +
                    '<ul>' +
                    '<li ng-repeat="commit in commits">' +
                    '<a href="{{ commit.html_url }}" target="_blank">{{ commit.commit.message }}</a> ' +
                    '<span style="font-size: 11px;">By: {{ commit.commit.author.name }}</span>' +
                    '</li>' +
                    '</ul>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.commits = [];

                $scope.$watch('ghUser', function () {
                    if ($scope.ghUser == undefined || $scope.ghRepo == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/repos/' + $scope.ghUser + '/' + $scope.ghRepo + '/commits'})
                        .success(function (data) {
                            $scope.commits = data;
                        });
                });
            }]
        };
    });

