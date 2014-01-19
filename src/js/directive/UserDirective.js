'use strict'

angular.module('github-directives')
    .directive('ghUser', function () {
        return {
            restrict: 'E',
            scope: {
                'name': '@',
                'hideAvatar': '=',
                'avatarSize': '@',
                'hideGists': '=',
                'hideRepos': '=',
                'hideStarred': '=',
                'hideFollowers': '=',
                'hideFollowing': '=',
                'showBlog': '='
            },
            template:
                '<div class="githubUser">'+
                    '<div ng-hide="hideAvatar">' +
                        '<a target="_blank" href="{{ user.html_url }}"><img class="gravatar" src="{{ avatarUrl }}"></a>' +
                    '</div>' +
                    '<h2>{{ user.name }}<br />' +
                    '<small>{{ user.login }}</small></h2>' +
                    '<hr />' +
                    '<ul>' +
                        '<li ng-hide="!user.company ">{{ user.company }}</li>' +
                        //'<li ng-show="user.location">Location: {{ user.location }</li>' + //TODO get the location info
                        '<li ng-show="showBlog && user.blog"><a href="{{ user.blog }}" target="_blank">{{ user.blog }}</a></li>' +
                        '<li>{{ user.joinedOn }}</li>' +
                    '</ul>' +
                    '<hr />' +
                    '<div class="vcard-stats">'+
                        '<a ng-hide="hideFollowers" href="https://github.com/{{ name }}/followers" class="vcardStat"><strong class="vcardStatCount">{{ user.followers}}</strong>followers</a>'+
                        //'<a ng-hide="hideStarred" href="#" class="vcardStat"><strong class="vcardStatCount">{{ user.starred || 0}}</strong>starred</a>'+ //TODO get starred
                        '<a ng-hide="hideFollowing" href="https://github.com/{{ name }}/following" class="vcardStat"><strong class="vcardStatCount">{{ user.following}}</strong>following</a>'+
                        '<a ng-hide="hideRepos" href="https://github.com/{{ name }}?tab=repositories" class="vcardStat"><strong class="vcardStatCount">{{ user.public_repos }}</strong> repositories</a>'+
                        '<a ng-hide="hideGists" href="https://gist.github.com/{{ name }}" class="vcardStat"><strong class="vcardStatCount">{{ user.public_gists }}</strong>  Gists</a>'+
                    '</div>'+
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

