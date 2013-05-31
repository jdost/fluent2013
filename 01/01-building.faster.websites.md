# Building Faster Websites: Crash Course on Web Performance
## Ilya Grigorik (Google)
[Slides](http://cdn.oreillystatic.com/en/assets/1/event/93/Building%20Faster%20Websites_%20Crash%20Course%20on%20Web%20Performance%20Presentation.pdf)

### Network

* Latency
* Bandwidth (3G/4G/...)

### Impact of slow sites

* "2000ms delay reduced per user revenue by 4.3%"
* Strong negative impacts
* Roughly linear changes with increasing delay
* Web search downgrades based on speed

* Simple user-input must be acknowledged within ~100 ms
* To keep the user engaged, the task must completed within 1000 ms

### Network Performance

* Single digit % perf improvement after 5 Mbps
* Latency is where improvement lies

* Easy to improve bandwidth
* Hard to improve latency (impossible)

### Mobile Network

* Mobile networks are slow (3G is real slow, lots of steps communicating location)

* Mobile (800-4100 ms for 3G / 400-1900 ms for 4G) for 20 KB file (250ms for PC)
* 3G (HSPA+) will be dominant network for next decade
* North America is ahead of the curve (way ahead)

* Radio usage (meaning long reaching requests/traffic) is big battery hog
* No matter the size of packet, turns on the radio for 10s, so send as much as you
  can

### Life of a web request

* DNS lookup - Socket connect - HTTP request - Content download

### Latency is the bottleneck for web performance

* Lots of small transfers
* New TCP connections are expensive

[Draft of book on networking](http://bit.ly/fluent-hpbn)

HTTP 2.0 is changing how HTTP works on the network (not headers, status codes, etc).
Uses 'binary framing' which is basically a live TCP connection with requests 
multiplexed through.  Server push, resource pushing with ability to cancel stream
and data gets cached.  (Eliminates request round trip)

### SPDY (HTTP 2 'Draft')

* nginx module!
* Apache, Jetty, Netty, node-spdy

Optimizations:
* CWND = 10
* heck 
* TLS resume, terminate SSL connections closer to user
* Disable TCP slow start on idle

W3C Web Performance Working Group - Navigation Timing
Push can preemptively push resources to a server (images, common data packets, etc)

### Page Rendering

* HTML is parsed incrementally
* Rendering is **blocked on CSS**
* Stream HTML response to client, flush, flush, flush!
* CSS is paramount to rendering, get it to the client **Fast**
* JS fetching/executing can block DOM construction
* CSS fetch at the top (will block rendering until loaded)
* JS fetch at bottom (will render page while loading JS)

* Async scripts:
``` html
<script type="text/javascript" src="some.js"></script>
<!-- VS -->
<script>
   (function () {
      var script = document.createElement("script");
      script.setAttribute('src', ...);
      document.body.appendChild(script);
   }());
</script>
```
* `async` attribute: `&lt;script src="some.js" async&gt;&lt;/script&gt;`

* JS can query CSSOM (CSS Object Model), block, and modify (same for DOM)
* Avoid doc.write in JS (removes render interuption)

### 1000ms barrier

* Majority of time is in network overhead
* Must allocate time for browser parsing/rendering
   * Reserve at least 100ms
* Inline just the required resources (no room for extra requests)
   * Identify and inline critical CSS
   * Eliminate Javascript from critical rendering path
* Defer the rest until after the required parts have loaded

* Identify critical CSS via an Audit
   * DevTools > Audits > Web Page Performance
   * [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights)

### Frames (framerate)

* 16 ms per "frame" (60 f/s @ 1000ms/s = 16ms/f)
* application code, garbage collection, layout, paint
* not much time to do per frame
* if misses 16ms barrier, waits for next frame (browsers have static 60fps timeline)
* drops frame (so if every frame takes more than 16ms, drops frames (30fps)
* due to overhead of GC, layout, and paint, app code should take < 10 ms
* Split long running functions, allow for breaks to let frames get drawn
* Aggregate events and defer them, process on next `requestAnimationFrame` callback

### JS Profiling

* Sampling: DevTools > Profiles > Collection JavaScript CPU Profile
* Structural (instrumenting/markers/inline): chrome://tracing

* Annotate code for structural profiling:
``` javascript
console.time("A");
//...
console.endTime("A");
```

### Garbage Collection tracking

* DevTools > Timeline > Memory
* Look for memory leaks
   * Grab snapshot profiles: DevTools > Profiles > Take Heap Snapshot
   * Will highlight (summarize) created, deleted, and change in items
   * (Use to find abandoned DOM elements, i.e. leaks)
   [Video][http://goo.gl/dtRi8]

### Layout

* Diagnose performance: DevTools > Timeline
   * Hover over layout, gives effected nodes, duration, and JS that triggered
   * Look for the warning sign to identify forced layout calculations
* Defer layout modification until everything is collected
   * Caused by referring to existing style attributes that have changed in the same
     call (meaning a layout reflow is triggered)

### Paint

* Minimise the amount of area being repainted
* Applied effects have costs, some are more expensive than others
* Tools to show rendering rectangles
   * In Elements tab, hit "h" to hide the element (no need to paint it)

### Chrome Tips

* Save/Load timeline data (good for bug reports)
* Annotated timeline (`console.timeStampe('Annotation');`)
* Connect USB Android
   Canary: chrome://inspect 
   Phone: Settings > Developer Tools > Enable USB Debugging

### Hardware Acceleration

* GPU has limitations
* CPU needs to handle repaints, GPU handles compositing
* Repaints == Texture uploads, so changing a texture is costly, but compositing 
  them is not
* CSS3 animations == "free lunch", CSS Transforms are all GPU specific actions 
  (offloads from CPU)


* GZIP your (text) assets
* Optimize images, pick optimal format
* Add an Expires and ETags header (better caching)
* Stream HTML to client
* Inline critical styles and JS
* Defer additional CSS and JS
* Eliminate jank (lost frames) and memory leaks
* Aim for 60 fps
* Profile and optimize code
* Eliminate memory leaks (DOM and JS)


- - -
PROTIP: `_gaq.push(['_setSiteSpeedSampleRate', 100])` increases sample rate
SELF: Checkout speed numbers on GA
Setup {daily, weekly, ...} reports on network perception, GA advanced segments
NOTE: SPDY only needs to sit on the edge server, all requests from nginx are HTTP(1)
SELF: Grab canary
