
// ExpressJS - Hello World!

// Import the Express.js module. This line makes the functionalities of the Express library available for use in this file.
// We are using ES Modules syntax (`import`) which is a more modern way to handle modules in JavaScript.
import express from 'express';

// Create an instance of the Express application.
// The `express()` function returns an object that represents our web application.
// This `app` object will be used to define routes, handle requests, and configure the server.
const app = express();

// Define a route handler for HTTP GET requests to the root path ('/').
// When a user's browser makes a GET request to the base URL of our server (e.g., http://localhost:5000/),
// this function will be executed.
app.get('/', (req, res) => {
  // Inside this callback function, we have access to two important objects:
  // `req` (request): This object contains information about the incoming HTTP request,
  // such as the headers, query parameters, and request body (if any).
  // `res` (response): This object is used to send a response back to the client that made the request.

  // `res.send()` is a method on the response object that sends data back to the client.
  // Here, we are sending an HTML heading "<h1>Hello World</h1>" as the response.
  // Express automatically sets the Content-Type header to 'text/html' in this case.
  res.send('<h1>Hello World</h1>');
});

// app.get(route, callback)
// This function defines what to do when a GET request at the given `route` is called.
// The `callback` function has two parameters:
// - `req` (request): Represents the incoming HTTP request and has properties for the request
//   query string (`req.query`), route parameters (`req.params`), request body (`req.body`),
//   HTTP headers (`req.headers`), and more.
// - `res` (response): Represents the HTTP response that the Express app will send back to the client.
//   It has methods like `res.send()`, `res.json()` (to send JSON), `res.status()` (to set the HTTP status code),
//   `res.sendFile()` (to send files), `res.redirect()` (to redirect to another URL), and many others.

// res.send()
// This function takes a single argument, which can be a string, an HTML string, an object, or an array.
// It sends this data as the body of the HTTP response to the requesting client.
// Express tries to automatically determine the correct Content-Type header based on the input.
// For example, if you pass a JavaScript object or array, it will usually set the Content-Type to 'application/json'.

// Start the server and listen for incoming connections on the specified port.
app.listen(5000, () => {
  // The second argument to `app.listen()` is an optional callback function that is executed
  // once the server has started listening.
  console.log('The server is running on port 5000');
});

// app.listen()
// This function binds and listens for connections on the specified host and port.
// - The first argument is the `port` number (here, 5000), which is the network port on which the server will listen for incoming requests.
//   This is a required parameter.
// - The second argument is optional and can be a `host` name or IP address. If omitted, the server will listen on all available network interfaces (typically '0.0.0.0').
// - The third argument is also optional and is the `callback` function that gets executed once the server starts successfully.

// In the context of the MERN stack, Express.js plays a crucial role as the backend framework.
// It handles routing (mapping URLs to specific functions), middleware (functions that can intercept and process requests),
// and interacting with the database (MongoDB in this case). This "Hello World" example is the simplest
// starting point to build more complex web applications and APIs with Express.js.

