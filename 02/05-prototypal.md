## Classical Inheritance: Prototypal Inheritance -- *Eric Elliott*
[Slides (kind of)](https://github.com/dilvie/fluent-prototypal-oo)

### Lots of libraries emulate classes in JS

* None have become defacto standards (ala jQuery)

### Gorilla/Banana Problem

* Added a framework (backbone) to a simple application
* Began using extended classes
* Found an Nth child bug and had to climb the parent/child hierarchy (bug existed at
  the root class)

Favor object composition over class inheritance -- Gang of four

### What is a prototype?

* A working sample
* `Object.create` ala Crockford: pass in prototype object, generate new one
* Cloning/Concatenation, great for mixins and default states:
  `_.extend({}, proto, { name: 'name' })`

### Factory Functions

* Saves some of the various prototypal patterns
* Can use `.call` and `.apply` to add flexibility

Showed off [stampit](https://github.com/dilvie/stampit), a library he wrote to use 
for object composition, creating enclosed "prototypes" that can be composed together 
to create the ideal object.  Mostly an ordered and less chaotic idea of multiple 
inheritance (C++ nightmares ensue)
