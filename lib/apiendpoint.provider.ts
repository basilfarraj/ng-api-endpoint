module app.Common.ApiEndpointModule {
    'use strict';

    export interface IApiEndpointConfig {
        apiBaseUrl: string;
        securedCookieName: string;
    }

    export interface IApiEndpointProvider {
        configure(apiBaseUrl: string,securedCookieName:string): void;
    }

    class ApiEndpointProvider implements ng.IServiceProvider, IApiEndpointProvider {
        config: IApiEndpointConfig;
        configure(apiBaseUrl: string, securedCookieName: string): void {
          
            this.config = {
                apiBaseUrl: apiBaseUrl,
                securedCookieName: securedCookieName
            };
        }
        $get(): IApiEndpointConfig {
            return this.config;
        }
    }
    angular
        .module('app.Common.ApiEndpointModule')
        .provider('app.Common.ApiEndpointModule.ApiEndpoint', ApiEndpointProvider);
}