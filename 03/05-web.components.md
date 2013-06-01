# Web Components
## Eric Bidelman
[Slides][http://www.webcomponentsshift.com/]

### Building Blocks

* Shadow DOM
* HTML template
* Custom elements
* HTML imports

### Declaring HTML templates

* Contains inert chunks of markup intended to be used later
   0. Working directly with DOM
   0. Parsed, not rendered (`&lt;script&gt;` not run, CSS not loaded)
   0. Hidden from document:w

### Shadown DOM

>  Shadow DOM gives us markup encapsulation style boundaries, and exposes (to web 
>  developers) the same mechanics browsers vendors have been using to implement 
>  their interal UI

*NOT IFRAMES*

### Style encapsulation for free!

* Styles defined in Shadow DOM are scoped by default
* Page's styles don't bleed across the shadow boundary (unless we let them)

### Styling the host

* @host at-rule selects the ShadowDOM's host element
* Allows reacting to different states

### Creating new HTML elements

* Element definition registers the new tag with the browser
* Until defined `&lt;x-foo&gt;` is an `HTMLElement` until registered
* Use `:unresolved` pseudo class to prevent FOUC
* Lifecycle callbacks (ready, inserted, removed) give insight into elements life

### Using a custom element

* After registration, use it like any standard DOM Element
* By declaring (HTML)
* By creating (`createElement`)
* By Instantiating (`new`)

### Registering elements in JS

* `document.register()` takes the tag name and description prototype
* Wrap markup in a `&lt;template&gt;` tag to make it inert, creates Shadow DOM from 
  content

*CAN EXTEND ELEMENTS! (i.e. add styles AND JS behaviors!)*

### HTML Imports

* Package, distribute, share, reuse
* HTML MODULES

*Polymer is the polyfill (35k gzipped!)*
