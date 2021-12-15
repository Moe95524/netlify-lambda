# adding some dynamic functionality to 11ty static site

I was building a static site using 11ty eleventy static site generator with my teammate [Zain](https://github.com/zain667) and uploaded it to netlify to use their CMS with our website that idea came from [Kevin Powell](https://www.youtube.com/watch?v=4wD00RT6d-g), it turns out that I need to create some backend functions for our subscribers.

[Netlify Serverless functions](https://docs.netlify.com/functions/overview/) was the solution (server-side code without having to run a dedicated server).

[AWS Lambda functions](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) are a great way to run on-demand server-side code, Use your Terminal in your project directory to install [netlify-lambda](https://www.npmjs.com/package/netlify-lambda) `npm i netlify-lambda` a tool for developing and building lambda functions compatible with Netlify.

The first thing you need to do is set up the configuration for your functions used to configure Netlify, by creating `netlify.toml` with the following code inside:
Here we'll add a number of key/value pairs to describe the configuration.

```
[build]
  Functions = ".test-netlify"
  Command = "npm run build"
```
`Functions = "test-netlify"` This is where the complied Netlify Lambda code will be generated and `Command = "npm run build"` to tell Netlify to run our build command when deploying, which is script command inside `package.json`.
in my case:

```
"scripts": {
    "start": "eleventy --serve",
    "build": "npm run build:eleventy; npm run build:lambda;",
    "build:eleventy": "eleventy",
    "start:lambda": "netlify-lambda serve .functions",
    "build:lambda": "netlify-lambda build .functions"
  }
```
Now with this in place, we can start to write a function. First, we need a place to write our code. We'll choose `.functions` or anything you would like. Our file name will be our published function without the .js extension. Therefore `.functions/say-hello.js` will be visible as `/.netlify/functions/say-hello`  on your Netlify site, `functions` here not from our file name it's from Netlify.

To start write any fucntion Netlify expects a [specific handler function format](https://docs.netlify.com/functions/overview/).hello.js will be our first lambda function.  

```
exports.handler = (event, context, callback) => {
  // Function code goes here
};
```
The `event` object contains useful information from the client like the `headers` and `body` of the request. The `context` object contains information from Netlify which could include things like `user` information if you’re using their Identity API.

The `callback` is a function that tells Netlify how to respond to the request. Let’s fill in our handler with a callback.

```
exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    body: 'Hello there!',
  });
};
```
Why is the first argument `null` in the callback? Because Netlify uses that argument to determine if there was an error with the function.

Finally, we can test our function locally. Remember those npm scripts we set up earlier? It’s time to run the first one.
in your terminal run:
```
> npm run start:lambda
```

You can now go to http://localhost:9000/hello. You should see “Hello there!” displayed.

Note that the path `/hello` is derived from the filename `hello.js`. Any files you place in the .functions directory will be built and served on their own path based on the filename, and remember when you want to call any function on your Netlify site the path will be `/.netlify/functions/function-name`