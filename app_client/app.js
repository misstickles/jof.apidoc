(function() {
	angular.module('jofApp', ['ngRoute']);

	function config($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/apidoc/doc.view.html',
				controller: 'docController',
				controllerAs: 'vm'
			}).otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode(true);
	}

	angular
		.module('jofApp')
		.config(['$routeProvider', '$locationProvider', config]);
})();