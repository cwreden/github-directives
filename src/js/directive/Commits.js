'use strict'

angular.module('github-directives')
    .directive('ghCommits', function () {
        return {
            restrict: 'E',
            scope: {
                'user': '@',
                'repo': '@',
                'hideAvatar': '=',
                'hideDate': '=',
                'hideAuthor': '=',
                'limit': '='
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">{{ user }} / {{ repo }} / Commits</div>' +
                    '<div class="list-group">' +
                        '<a href="{{ commit.html_url }}" target="_blank" ng-repeat="commit in commits" class="list-group-item">' +
                            '<img src="{{ createGravatarUrl(commit.author.gravatar_id) }}" class="gravatar" ng-hide="hideAvatar">' +
                            '<span>{{ commit.commit.message }}</span>' +
                            '<span class="badge" ng-hide="hideAuthor">By: {{ commit.commit.author.name }}</span>' +
                            '<span class="badge" ng-hide="hideDate">{{ commit.commit.author.date | date:mediumDate }}</span>' +
                        '</a>' +
                    '</div>' +
                '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.createGravatarUrl = function (id) {// TODO extract as service
                    var size = 36;

                    if (id == null) {
                        id = '';
                    }

                    return 'http://gravatar.com/avatar/' + id + '?s=' + size;
                };

                $scope.commits = [];

                $scope.$watch('repo', function () {
                    if ($scope.user == undefined || $scope.repo == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/repos/' + $scope.user + '/' + $scope.repo + '/commits'})
                        .success(function (data) {
                            if ($scope.limit == undefined) {
                                $scope.commits = data;
                            } else {
                                $scope.commits = data.splice(0,$scope.limit);
                            }
                        });
                });
            }]
        };
    });

