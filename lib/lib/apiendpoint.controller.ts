module app.Common.ApiEndpointModule {
    'use strict';

    var ApiConstants = new app.Common.ApiEndpointModule.Constant.ApiEndpointConstant();
    export class ExampleController {
        static $inject = ["app.Common.ApiEndpointModule.ApiEndpointService"];
        param: string;
        constructor(public $service: app.Common.ApiEndpointModule.ApiEndpointService) {
            this.param = "myParam";
            this.setAuthorizationCookie();
            this.useGet();
            this.useSecuredGet();
        }
        useGet = (): any=> {
            this.$service.useGet(ApiConstants.TEST_API, { param: this.param });
        }
        useSecuredGet = (): any=> {
            this.$service.useSecuredGet(ApiConstants.TEST_API, { param: this.param });
        }
        setAuthorizationCookie = (): void=> {
            var cookieString = this.$service.apiEndpoint.securedCookieName+"=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1a3J9.eyJ1bmlxdWVfbmFtZSI6ImMzYzAzMjIxLWFhZTMtNDY1Zi04YmU4LWY1N2FhOTdjZGQ1NyIsImVtYWlsIjoiYmFzaWwuZmFycmFqQGdtYWlsLmNvbSIsImlzcyI6Imh0dHA6Ly9mcmVlc2lzdC5jb20iLCJhdWQiOiJodHRwOi8vZnJlZXNpc3QuY29tIiwiZXhwIjoxNDkxODQ0MjAwfQ.zMLyCM2IeGSSAkSqy_QCgR-iG_CglxzITZHT3K5hByE";
            document.cookie = cookieString;
        }
    }

    angular
        .module('app.Common.ApiEndpointModule').controller('app.Common.ApiEndpointModule.Controller', ExampleController);
}
