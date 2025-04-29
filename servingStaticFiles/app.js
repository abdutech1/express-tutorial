// ExpressJS for handling routes and serving static files

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Why is fileURLToPath needed?

// In older CommonJS syntax (require), the special variable __filename directly held the absolute path to the current file, and __dirname held the absolute path to the directory containing the current file.

// However, with the introduction of ES Modules (import), these variables (__filename and __dirname) are not directly available at the top level of a module. This is due to the different way ES Modules are handled and their focus on URLs for module identification.

// To get the equivalent of __filename and __dirname in an ES Module, you need to:

// Get the file: URL of the current module: import.meta.url provides a file: URL representing the current module's location.
// Convert the file: URL to a file path: This is where fileURLToPath(import.meta.url) comes in. It takes the URL and converts it into a standard file system path string.
// 3. const __filename = fileURLToPath(import.meta.url);

// import.meta.url: This is a special property available in ES Modules that contains a file: URL representing the absolute path to the current module file.
// fileURLToPath(...): As explained above, this function converts the file: URL into a regular file system path string.
// const __filename = ...: This line declares a constant named __filename and assigns it the resulting file path. Now, __filename in your ES Module holds the absolute path to the current JavaScript file, just like it did in CommonJS.
// 4. const __dirname = path.dirname(__filename);

// path.dirname(__filename): Here, you're using the dirname() function from the path module.
// __filename: This is the file path you obtained in the previous step.
// path.dirname(): This function takes a file path as input and returns the directory name (the parent directory) of that path.
// const __dirname = ...: This line declares a constant named __dirname and assigns it the directory path. Now, __dirname in your ES Module holds the absolute path to the directory containing the current JavaScript file, just like it did in CommonJS.


const __filename = fileURLToPath(import.meta.url);
//import.meta.url is a fundamental feature of ES Modules that allows a module to programmatically determine its own URL, enabling dynamic loading of related resources and providing crucial context about the module's location within the execution environment
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const staticDir = path.join(__dirname, 'static');

// Serve static files from the 'static' directory
// This middleware handles requests for files like index.html, about.html, style.css, etc.
// If a file exists in the 'static' directory that matches the requested URL,
// Express will automatically serve it with the correct Content-Type header.
app.use(express.static(staticDir));

// Handle the root route ('/')
// When a user navigates to http://localhost:3000/, Express will look for 'index.html'
// in the 'static' directory due to the `express.static` middleware.
// If 'index.html' exists, it will be served.

// If a requested static file is not found, Express's default behavior is to
// move on to the next matching route or middleware. In this setup, if a file
// isn't in the 'static' directory, we haven't defined specific handlers for
// other routes, so it would result in a 404 (Not Found) error handled by Express.

// To explicitly handle a 404 for HTML pages not found in 'static', you could add a
// middleware at the very end (after all other routes and middleware):
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(staticDir, '404.html'));
});

// Start the server and listen for incoming connections.
app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

// Explanation for your students:

// This Express.js code achieves the same functionality as the previous Node.js example
// but with significantly less code and more built-in features.

// 1. Importing necessary modules:
//    - `express` is the core Express.js library.
//    - `path` is a Node.js module for working with file paths.
//    - `url` and `mime-types` (while imported in the Node.js example) are largely handled
//      automatically by Express.js when serving static files.

// 2. Creating an Express application:
//    - `const app = express();` initializes an instance of the Express application.

// 3. Defining the static directory:
//    - `const staticDir = path.join(__dirname, 'static');` creates an absolute path to your 'static' directory,
//      where you will store your HTML files, CSS, images, etc.

// 4. Serving static files with `express.static()`:
//    - `app.use(express.static(staticDir));` is the key to serving static content in Express.
//    - This line mounts the `express.static` middleware at the root path ('/').
//    - It tells Express to look for requested files within the `staticDir`.
//    - When a browser requests a resource (e.g., 'http://localhost:3000/index.html' or
//      'http://localhost:3000/style.css'), Express will check if a corresponding file exists
//      in the 'static' directory.
//    - If the file is found, Express will automatically serve it with the correct
//      `Content-Type` header (using a library similar to `mime-types` internally).

// 5. Handling the root route ('/'):
//    - Because `express.static` is mounted at the root, when a user navigates to '/',
//      Express will look for a file named 'index.html' inside the 'static' directory and serve it.
//    - We don't need an explicit `app.get('/')` handler for this common case when serving
//      an 'index.html' file from the static directory.

// 6. Handling 404 (Not Found):
//    - The `app.use((req, res, next) => { ... });` defines a catch-all middleware function.
//    - It's placed after the `express.static` middleware. If a request reaches this middleware,
//      it means no previous route or middleware handled it (e.g., the requested static file
//      was not found).
//    - Inside this middleware, we set the HTTP status code to 404 and send the '404.html' file
//      from the 'static' directory as the response.
//    - This provides a user-friendly "Not Found" page.

// Key advantages of using Express.js for serving static files:
// - Simplicity: `express.static()` handles most of the logic for serving files and setting headers automatically.
// - Conciseness: Less code is required compared to the manual Node.js approach.
// - Built-in features: Express provides robust handling of static files.

// To run this example:
// 1. Make sure you have Node.js and npm (or yarn) installed.
// 2. Create a project directory and navigate into it in your terminal.
// 3. Initialize a Node.js project: `npm init -y` (or `yarn init -y`).
// 4. Install Express: `npm install express` (or `yarn add express`).
// 5. Create a 'static' directory in your project.
// 6. Inside the 'static' directory, create 'index.html', 'about.html' (or any other HTML files you want to serve),
//    and a '404.html' file. You can also add subdirectories for CSS, images, etc.
// 7. Save the Express.js code above as a `.js` file (e.g., 'server.js') in your project root.
// 8. Run the server: `node server.js` (or `nodemon server.js`).
// 9. Open your browser and navigate to http://localhost:3000/, http://localhost:3000/your-other-page.html,
//    and try requesting a file that doesn't exist (e.g., http://localhost:3000/nonexistent.html) to see the 404 page.