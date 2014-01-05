'use strict'
var bla;
angular.module('github-directives')
    .directive('ghUser', function () {
        return {
            restrict: 'E',
            scope: {
                'name': '@',
                'showAvatar': '=',
                'avatarSize': '@',
                'showBlog': '=',
                'showCompany': '=',
                'showGists': '=',
                'hideRepositories': '=',
                'hideFollowers': '=',
                'hideFollowing': '='
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">{{ user.name }}</div>' +
                    '<div class="panel-body">' +
                        '<div ng-show="showAvatar">' +
                            '<a target="_blank" href="{{ user.html_url }}"><img src="{{ user.avatar_url }}" style="width: {{ avatarSize }}; height: {{ avatarSize }};"></a>' +
                            '</div>' +
                            '<div ng-show="showCompany">Company: {{ user.company }}</div>' +
                            '<div ng-hide="hideRepositories">Repositories: <a target="_blank" href="https://github.com/{{ name }}?tab=repositories">{{ user.public_repos }}</a></div>' +
                            '<div ng-show="showGists">Gists: {{ user.public_gists }}</div>' +
                            '<div ng-hide="hideFollowers">Followers: <a target="_blank" href="https://github.com/{{ name }}/followers">{{ user.followers}}</a></div>' +
                            '<div ng-hide="hideFollowing">Following: <a target="_blank" href="https://github.com/{{ name }}/following">{{ user.following}}</a></div>' +
                            '<a ng-show="showBlog && user.blog" href="{{ user.blog }}" target="_blank">Blog</a>' +
                        '</div>' +
                    '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.user = {};

                $scope.avatarSize = $scope.avatarSize || '100px';

                $scope.$watch('name', function () {
                    if ($scope.name == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.name})
                        .success(function (data) {
                            console.log($scope)
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

