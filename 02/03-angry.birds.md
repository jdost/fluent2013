# Angry Birds of Modern JS
## Elijah Manor
[Slides][http://elijahmanor.github.io/talks/angry-birds-javascript/index.html]

### IIFE Pattern

* Liter global namespace
* Conflicting with your code, other libraries, browser plugins/environment
* Immediately Invoked Function Expression
* Revealing Module Pattern (capture return value of IIFE)
* Variant of RMP (above) use passed in argument as the `exports`

### Event and message scattering

* Cluttered mess of various callback functions
* Observer events: adding event handlers to elements
* Mediated events: using a third party object for the event bus
* If you have components, use observer, mediator is for cross components

### RequireJS & Modules

* RequireJS, async JS loading, manage dependencies, load in order
* Dictate dependencies and setup a ready callback
* r.js builds and minifies single file based on dependencies

### Enable code quality/style

* Feels unified
* Douglas Crockford, Rich Waldron, Google, jQuery
* `JSHint::maxcomplexity` (decreases maximum complexity)
* `JSHint::maxstatements` (number of statements, filesize)
* `JSHint::maxparams` (number of function arguments)
* `JSHint::maxdepth` (number of nested statements)
* `JSHint::maxlength` (line length limiting)

### Frontend vs. Backend

* Use mockjax to provide mock data during development
* Generates mocked JSON based on typed params (@TIME, @FIRST_NAME, etc)

### Templating engines

* [Underscore.js][http://underscorejs.org/#template] templating, based on jeresig's 
  micro templating
* Advantages: small, stick in arbitrary code
* [Handlebars.js][http://handlebarsjs.com/] templating, similar to underscore's
* Allows you to register functions and keep in safe execution(?)
* Can precompile on the backend
* No logic (logicless)

### Project manager [Grunt][http://gruntjs.com/]

* Dictate package dependencies (kind of like Makefile for JS projects)
* Lots of plugins

[Yeoman][http://yeoman.io/]
[Bower][http://bower.io/]
