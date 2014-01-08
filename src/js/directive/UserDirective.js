'use strict'

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
                'showLocation': '=',
                'showGists': '=',
                'showJoinDate': '=',
                'showUpdateDate': '=',
                'hideRepositories': '=',
                'hideFollowers': '=',
                'hideFollowing': '='
            },
            template:
                '<div class="panel panel-default">' +
                    '<div class="panel-heading">{{ user.name || user.login }}</div>' +
                    '<div class="panel-body">' +
                        '<div ng-show="showAvatar">' +
                            '<a target="_blank" href="{{ user.html_url }}"><img src="{{ avatarUrl }}"></a>' +
                            '</div>' +
                            '<div ng-show="showCompany">Company: {{ user.company }}</div>' +
                            '<div ng-show="showLocation">Location: {{ user.location }}</div>' +
                            '<div ng-hide="hideRepositories">Repositories: <a target="_blank" href="https://github.com/{{ name }}?tab=repositories">{{ user.public_repos }}</a></div>' +
                            '<div ng-show="showGists">Gists: {{ user.public_gists }}</div>' +
                            '<div ng-hide="hideFollowers">Followers: <a target="_blank" href="https://github.com/{{ name }}/followers">{{ user.followers}}</a></div>' +
                            '<div ng-hide="hideFollowing">Following: <a target="_blank" href="https://github.com/{{ name }}/following">{{ user.following}}</a></div>' +
                            '<a ng-show="showBlog && user.blog" href="{{ user.blog }}" target="_blank">Blog</a>' +
                            '<div ng-show="showJoinDate">Joined on {{ user.joinedOn }}</div>' +
                            '<div ng-show="showUpdateDate">Updated on {{ user.updatedOn }}</div>' +
                        '</div>' +
                    '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                function createGravatarUrl() {
                    var id = '';
                    var size = 100;

                    if ($scope.avatarSize) {
                        size = $scope.avatarSize;
                    }
                    if ($scope.user.gravatar_id) {
                        id = $scope.user.gravatar_id;
                    }

                    return 'http://gravatar.com/avatar/' + id + '?s=' + size;
                }

                $scope.user = {};
                $scope.avatarSize = $scope.avatarSize || '100';
                $scope.avatarUrl = '';


                $scope.$watch('name', function () {
                    if ($scope.name == undefined) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/users/' + $scope.name})
                        .success(function (data) {
                            $scope.user = data;
                            $scope.user.joinedOn = (new Date(data.created_at)).toLocaleDateString();
                            $scope.user.updatedOn = (new Date(data.updated_at)).toLocaleDateString();
                            $scope.avatarUrl = createGravatarUrl();
                        })
                        .error(function (data, status) {
                            if (status == 403) {
                                console.warn('Loading failed.');
                                // TODO Request Limit beachten und dementsprechend reagieren.
                            }
                        });
                });
            }]
        };
    });

