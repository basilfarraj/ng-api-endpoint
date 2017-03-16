((): void => {
    'use strict';

    angular
        .module('app.Common.ApiEndpointModule')
        .config(config);

    config.$inject = ['app.Common.ApiEndpointModule.ApiEndpointProvider'];
    function config(apiEndpointProvider: app.Common.ApiEndpointModule.IApiEndpointProvider): void {
        apiEndpointProvider.configure('/api/',"session_id");
    }
})();