# ng-api-endpoint
API Endpoint module using AngularJS and Typescript

This is just a simple implementation of a generic API calls module.
The module will give you the ability to make simple GET and POST requests, as well as secured GET/POST requests using the "Authorization" header key. 

You have to configure your provider first with the base URL of your api, and your authorization cookie name:

apiEndpointProvider.configure('/api/',"session_id");
