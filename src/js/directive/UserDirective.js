'use strict'

angular.module('github-directives')
    .directive('ghUser', function () {
        return {
            restrict: 'E',
            scope: {
                'name': '@',
                'showAvatar': '@',
                'showBlog': '@'
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">{{ user.name }}</div>' +
                    '<div class="panel-body">' +
                        '<div ng-show="showAvatar">' +
                            '<img src="{{ user.avatar_url }}">' +
                            '</div>' +
                            '<div>Repositories: <a target="_blank" href="https://github.com/{{ name }}?tab=repositories">{{ user.public_repos }}</a></div>' +
                            '<div>Gists: {{ user.public_gists }}</div>' +
                            '<div>Followers: <a target="_blank" href="https://github.com/{{ name }}/followers">{{ user.followers}}</a></div>' +
                            '<div>Following: <a target="_blank" href="https://github.com/{{ name }}/following">{{ user.following}}</a></div>' +
                            '<a ng-show="showBlog && user.blog" href="{{ user.blog }}" target="_blank">Blog</a>' +
                        '</div>' +
                    '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.user = {};

                $scope.$watch('name', function () {
                    if ($scope.name == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.name})
                        .success(function (data) {
                            $scope.user = data;
                        })
                        .error(function (data, status) {
                            if (status == 403) {
                                console.warn('Loading failed.')
                                // TODO Request Limit beachten und dementsprechend reagieren.
                            }
                        });
                });
            }]
        };
    });

