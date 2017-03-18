
module app.Common.ApiEndpointModule.Constant {
  
    export class ApiEndpointConstant  {
        static get getConstant() {
            return new ApiEndpointConstant();
        }
        TEST_API: string;
        constructor() {
            this.TEST_API = 'Home/test';
        }
    }
    angular.module('app.Common.ApiEndpointModule').constant('ApiEndpointConstant', ApiEndpointConstant.getConstant);
}