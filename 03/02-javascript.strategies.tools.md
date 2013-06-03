## Javascript Tools & Strategies -- *Ariya Hidayat*
[Slides](https://speakerdeck.com/ariya/improving-javascript-code-quality-strategies-and-tools)

> How do you track code quality over time?

### Multi-variable defense

* Linter integration
* VCS Hooks
* Build Tests
* CI Server
* Pull Requests

Feedback is important, need to say it failed and why it failed

### Quality metrics

* TRACK! (best use is over time, not current)
* Set baseline and track progress towards/past over revisions
* Target is high maintainability and high performance
* Try to take care of the 'big rocks' first, let the smaller stuff follow

### Syntax Visualization

* See how the engine handles the source code
* Displays a syntax tree
* Execution visualization (metajs)

[Esprima](http://esprima.org/) for code validation

* Strict mode validator (`'use strict';`)
* Linter looks for suspicious patterns, validator just looks for bad stuff
  (Linter finds suspects, validator only finds criminals)

### Code complexity 
 
* [JS Complexity](http://jscomplexity.org/)
* Target most complex functions for refactoring
* [Plato](https://github.com/jsoverson/plato) for visualizing code complexity
* Identity highlighter, highlights same references within scope (requires 
  understanding scope)

[Scope coloring](https://github.com/mazurov/eslevels-demo)
[JS refactoring tool](https://github.com/ariya/esrefactor)

[Istanbul: code Coverage tool](https://github.com/gotwarlost/istanbul)

* Detect traps with branch coverage (inline ifs or conditional returns)
* Set thresholds on code coverage, nested branches/statements and function limits

### Code Consistency

* Automate conversion of somethings (tabs, quotes)
* [JS Formatter](https://github.com/millermedeiros/esformatter)
* Discover boolean traps (arguments which are not explained... `Slider(true)` (wtf?))

[Empirical runtime complexity](http://esprima.org/demo/functiontrace.html)
