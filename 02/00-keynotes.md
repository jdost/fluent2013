# Javascript is Legal
## Brendan Eich

### ECMAScript Harmony (ES6/7)

* Better for applications, libraries, code generators (Coffee, Clojurescript, etc)
* Now engine prototypes implementing proposals
* [Kangax's ES6 table][http://kangax.github.io/es5-compat-table/es6/]

Arrow functions (ES6)
```
let adder = (a, b) -> {
   return a + b;
}
```

### Classes (ES6)

* Easy to write prototypal inheritance patterns
* Does the same thing as current, just new syntax

### Modules (ES6)

* Export/internals of a module
* Matches AMD/RequireJS (NPM) system

### Other bits

* Default Params
  `function foo(a = 1, b = 2)`
* Rest Params (catching trailing arguments)
  `function bar(a, b, c...)`
* Iterators & Generators
* Maps (true type keys, not `.toString`)
  `someMap[true] !== someMap["true"]`

### Optimizations

* Making a version of JS that is type verifiable
  done by forcing type `myInt = myInt|0`
* ASM.JS uses an optimized subset of JS for speed


# ABC of Data Visualization
## Irene Ros
[Slides][https://speakerdeck.com/iros/architecting-better-charts-fluentconf-2013-keynote]

> D3 is for charting like what jQuery is for the web

* Make Reusable charts!
* Repeatable, configurable, extensible, composable

[D3 Charts][https://github.com/misoproject/d3.chart] (new library from bocoup)


# Javascript Authoring Tools
## Paul Irish
[Slides][https://dl.dropboxusercontent.com/u/39519/talks/fluent-2013/index.html]

### Workspaces

* Edit entire folder (C++, PHP, Markdown)
* Styles pane changes persist
* Edit anywhere

### DevTools support for Sass

* Full traceability of selectors, properties, bariables
* Contributed V3 sourcemap support in Sass core
* Automatic reoad of stylesheet

* Bower integration?
