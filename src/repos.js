angular.module('github-directives', [])
    .directive('repos', function ($http) {
        return {
            restrict: 'A',
            template: '<ul>' +
                    '<li ng-repeat="repo in repos"><a href="{{ repo.html_url }}" target="_blank">{{ repo.name }}</a></li>' +
                '</ul>',
            link: function (scope, elem, attrs) {
                scope.repos = [];

                $http({method: 'GET', url: 'https://api.github.com/users/' + attrs.user + '/repos'})
                    .success(function (data, status, headers, config) {
                        scope.repos = data;
                    });
            }
        };
    });

