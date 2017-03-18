module app.Common.ApiEndpointModule {
    export interface IApiEndpointService {
        useSecuredGet(serviceUrl: string, data: Object): ng.IPromise<any>;
        useGet(serviceUrl: string, data: Object): ng.IPromise<any>;
        usePost(serviceUrl: string, data: Object): ng.IPromise<any>;
        useSecuredPost(serviceUrl: string, data: Object): ng.IPromise<any>;
    }
    export class ApiEndpointService implements IApiEndpointService {
        static $inject = ["$http", "app.Common.ApiEndpointModule.ApiEndpoint"];
        constructor(public $http: ng.IHttpService, public apiEndpoint: app.Common.ApiEndpointModule.IApiEndpointConfig) {
        }

        /**Secured GET Method using "Authorization" header key**/
        useSecuredGet(serviceUrl: string, data: Object): ng.IPromise<any> {
            var serviceFullUrl = this.apiEndpoint.apiBaseUrl + serviceUrl;
            if (data && data != '') {
                serviceFullUrl = serviceFullUrl + "?" + this.ObjecttoParams(data);
            }
            try {
                var cookie_token = this.readCookie(this.apiEndpoint.securedCookieName);
                this.$http.defaults.headers.common["Authorization"] = cookie_token;
            }
            catch (e) {
                console.log(e);
            }
            return this.$http.get(serviceFullUrl).then((response) => {
                if (response.data)
                    return response.data
                else {
                    console.log("response.data is empty: " + response);
                    return null;
                }
            });

        }
        /** Simple GET Method**/
        useGet(serviceUrl: string, data: Object): ng.IPromise<any> {
            var serviceFullUrl = this.apiEndpoint.apiBaseUrl + serviceUrl;
            if (data && data != '') {
                serviceFullUrl = serviceFullUrl + "?" + this.ObjecttoParams(data);
            }
            return this.$http.get(serviceFullUrl).then((response) => {
                if (response.data)
                    return response.data
                else {
                    console.log("response.data is empty: " + response);
                    return null;
                }
            });
        }
        /** Simple POST Method**/
        usePost(serviceUrl: string, data: Object): ng.IPromise<any> {
            var serviceFullUrl = this.apiEndpoint.apiBaseUrl + serviceUrl;
            return this.$http.post(serviceFullUrl, data,
                {
                    headers: { "content-type": 'application/json; charset=UTF-8' }
                });
        }

        /**Secured POST Method using "Authorization" header key**/
        useSecuredPost(serviceUrl: string, data: Object): ng.IPromise<any> {
            var serviceFullUrl = this.apiEndpoint.apiBaseUrl + serviceUrl;
            try {
                var cookie_token = this.readCookie(this.apiEndpoint.securedCookieName);
                this.$http.defaults.headers.common["Authorization"] = cookie_token;
            }
            catch (e) {
                console.log(e)
            }
            return this.$http.post(serviceFullUrl, data,
                {
                    headers: { "Content-Type": 'application/json; charset=UTF-8' }
                });
        }

        readCookie(cookie_name: string): any {
            var b = document.cookie.match('(^|;)\\s*' + cookie_name + '\\s*=\\s*([^;]+)');
            return b ? b.pop() : '';
        }
        /** This function converts any object to a querystring **/
        ObjecttoParams = (obj: any): string => {
            var str = "";
            for (var key in obj) {
                if (str != "") {
                    str += "&";
                }
                str += key + "=" + encodeURIComponent(obj[key]);
            }
            return str;
        }

    }
    factory.$inject = ["$http", "app.Common.ApiEndpointModule.ApiEndpoint"];
    function factory($http: ng.IHttpService,
        apiEndpoint: app.Common.ApiEndpointModule.IApiEndpointConfig): IApiEndpointService {
        return new ApiEndpointService($http, apiEndpoint);
    }
    angular.module('app.Common.ApiEndpointModule')
        .factory('app.Common.ApiEndpointModule.ApiEndpointService',
            factory);
}
