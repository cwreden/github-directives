'use strict'

var ghDirectives = angular.module('github-directives', []);

ghDirectives.constant('apiUrl', 'https://api.github.com');
ghDirectives.value('apiUrl', 'https://api.github.com');