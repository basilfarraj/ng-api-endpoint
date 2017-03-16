
/// <reference path="../scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../scripts/typings/angularjs/angular-mocks.d.ts" />
/// <reference path="app.module.ts" />
/// <reference path="app.variables.ts" />
/// <reference path="apiendpoint.config.ts" />
/// <reference path="apiendpoint.provider.ts" />
/// <reference path="apiendpoint.service.ts" />
/// <reference path="apiendpoint.controller.ts" />


module app.Common.ApiEndpointModule {
    describe("Endpoint Test Controller", function () {
        var controller: app.Common.ApiEndpointModule.ExampleController;
        var service: app.Common.ApiEndpointModule.ApiEndpointService;

        beforeEach(function () {
            angular.mock.module("app.Common.ApiEndpointModule");
        });

        beforeEach(inject(function (
            _service_: app.Common.ApiEndpointModule.ApiEndpointService) {
            service = _service_;
        }));


        it("should create controller", () => {
            service.useGet(app.Common.ApiEndpointModule.Variables.URL.Test, { param: "param" });

            controller = new app.Common.ApiEndpointModule.ExampleController(service);
            expect(controller).not.toBeNull();

            var result = controller.useGet;
            expect(result.length).toBe(4);
        });
    });
}