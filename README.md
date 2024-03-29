# MEAN Stack

MEAN is a boilerplate that provides a nice starting point for [MongoDB](http://www.mongodb.org/),
[Node.js](http://www.nodejs.org/), [Express](http://expressjs.com/)
and [AngularJS](http://angularjs.org/) based applications.
It is designed to give you quick and organized way to start developing of MEAN based web apps
with useful modules like mongoose and passport pre-bundled and configured.
We mainly try to take care of the connection points between existing popular frameworks
and solve common integration problems.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manager, should be installed when you install node.js.
* Bower - Web package manager, installing [Bower](http://bower.io/) is simple when you have npm:

```
$ npm install -g bower
```

* Grunt - Download and Install [Grunt](http://gruntjs.com).

```
$ npm install -g grunt-cli
```


## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.

## Quick Install
  The quickest way to get started with MEAN is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  To start the server:

    $ grunt
    
  When not using grunt you can use:

    $ node server
    
  Then open a browser and go to:

    http://localhost:3000

## Development
All source files are located under `client_source` and when building are compiled, compressed and copied to `public`.


## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file and the [env](config/env/) files. Here you will need to specify your application name, database name, as well as hook up any social app keys if you want integration with Twitter, Facebook, GitHub or Google.

### Environmental Settings

There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:
* __db__ - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* __app.name__ - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.
* __Social OAuth Keys__ - Facebook, GitHub, Google, Twitter. You can specify your own social application keys here for each platform:
	* __clientID__
	* __clientSecret__
	* __callbackURL__

To run with a different environment, just specify NODE_ENV as you call grunt:

	$ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

	$ NODE_ENV=test node server

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## Getting Started
  We pre-included an article example, check it out:
  * [The Model](https://github.com/linnovate/mean/blob/master/app/models/article.js) - Where we define our object schema.
  * [The Controller](https://github.com/linnovate/mean/blob/master/app/controllers/articles.js) - Where we take care of our backend logic.
  * [NodeJS Routes](https://github.com/linnovate/mean/blob/master/config/routes.js) - Where we define our REST service routes.
  * [AngularJs Routes](https://github.com/linnovate/mean/blob/master/public/js/config.js) - Where we define our CRUD routes.
  * [The AngularJs Service](https://github.com/linnovate/mean/blob/master/public/js/services/articles.js) - Where we connect to our REST service.
  * [The AngularJs Controller](https://github.com/linnovate/mean/blob/master/public/js/controllers/articles.js) - Where we take care of  our frontend logic.
  * [The AngularJs Views Folder](https://github.com/linnovate/mean/blob/master/public/views/articles) - Where we keep our CRUD views.

## Heroku Quick Deployment
Before you start make sure you have <a href="https://toolbelt.heroku.com/">heroku toolbelt</a> installed and an accessible mongo db instance - you can try <a href="http://www.mongohq.com/">mongohq</a> which have an easy setup )

```bash
git init
git add .
git commit -m "initial version"
heroku apps:create
git push heroku master
```

## Mean License
(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
