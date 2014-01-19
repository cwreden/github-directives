'use strict'

angular.module('github-directives')
    .directive('ghRepo', function () {
        return {
            restrict: 'E',
            scope: {
                'name': '@',
                'repo': '@'
            },
            template:
                '<div class="githubRepo">'+
                    '<h4><a href="{{ repoData.owner.html_url }}">{{ repoData.owner.login }}</a> / <a href="{{ repoData.html_url }}">{{ repo }}</a>' +
                    '<small ng-show="repoData.fork">  <br />forked from <a href="{{ repoData.parent.html_url }}"> {{repoData.parent.full_name}} </a></small></h4>' +
                    '<span class="desc"> {{ repoData.description }} </span>' +
                    '<hr />' +
                    '<ul>' +
                        '<li ng-show="repoData.homepage">{{ repoData.homepage }}</li>' +
                        '<li>Created on: {{ repoData.createdOn  }}</li>' +
                        '<li>Pushed on: {{ repoData.pushedOn }}</li>' +
                        '<li>Updated on: {{ repoData.updatedOn }}</li>' +
                    '</ul>' +
                    '<hr />' +
                    '<div class="vcard-stats">'+
                        '<a ng-hide="hideFollowers" href="https://github.com/{{ name }}/{{ repo }}/network" class="vcardStat"><strong class="vcardStatCount">{{ repoData.forks}}</strong>forks</a>'+
                        '<a ng-show="has_issues" href="https://github.com/{{ name }}/{{ repo }}/issues?state=open" class="vcardStat"><strong class="vcardStatCount">{{ repoData.open_issues}}</strong>issues</a>'+
                        '<a ng-hide="hideFollowers" href="https://github.com/{{ name }}/{{ repo }}/issues?state=open" class="vcardStat"><strong class="vcardStatCount">{{ repoData.watchers}}</strong>watchers</a>'+
                    '</div>'+
                '</div>',
            controller: ['$scope', '$http', 'apiUrl', function($scope, $http, apiUrl) {
                $scope.$watch('name', function () {
                    if ($scope.name == undefined || $scope.repo == undefined ) {
                        return;
                    }
                    $http({method: 'GET', url: apiUrl + '/repos/' + $scope.name + '/' +$scope.repo })
                        .success(function (data) {
                            $scope.repoData = data;
                            $scope.repoData.updatedOn = (new Date(data.updated_at)).toLocaleDateString();
                            $scope.repoData.createdOn = (new Date(data.created_at)).toLocaleDateString();
                            $scope.repoData.pushedOn = (new Date(data.pushed_at)).toLocaleDateString();
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

