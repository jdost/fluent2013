(function (bespoke) {
  bespoke.plugins.state = function (deck) {
    function updateClass (method, evt) {
      if (!evt.slide.getAttribute('data-bespoke-class')) { return; }
      var newClasses = evt.slide.getAttribute('data-bespoke-class').split(' ');
      newClasses.forEach(function (newClass) {
        if (newClass)
          deck.parent.classList[method](newClass);
      });
    }

    deck.on('activate', updateClass.bind(null, 'add'));
    deck.on('deactivate', updateClass.bind(null, 'remove'));
  };

  bespoke.plugins.blackout = function () {
    var BLACK_KEY = 66, WHITE_KEY = 87;
    var overlay, shown = false;

    overlay = document.createElement('div');
    overlay.id = 'overlay';

    document.body.appendChild(overlay);

    function blackout (type) {
      if (shown !== type && type.length)
        overlay.className = type === 'b' ? 'black' : 'white';
      else
        overlay.className = '';

      shown = type;
    }

    window.addEventListener('keydown', function (evt) {
      if ([BLACK_KEY, WHITE_KEY].indexOf(evt.which) >= 0)
        blackout(evt.which === BLACK_KEY ? 'b' : 'w');
      if ([13, 27].indexOf(evt.which) >= 0)
        blackout('');
    });
  };

  bespoke.plugins.progress = function (deck) {
    var PROGRESS_KEY = 80;

    var progress = document.createElement('div');
    progress.id = "progress";
    document.body.appendChild(progress);

    deck.on('activate', function (evt) {
      progress.style.width = (evt.index * 100) / (deck.slides.length - 1) + "%";
    });

    var shown = false;
    window.addEventListener('keydown', function (evt) {
      if (evt.which == PROGRESS_KEY) {
        shown = !shown;
        progress.style.display = shown ? 'block' : 'none';
      }
    });
  };

  bespoke.plugins.wait = function (deck) {
    var waitLevel = 0;
    function updateWaits (evt) {
      var waits = evt.slide.querySelectorAll("[data-bespoke-wait]");
      if (!waits || waits.length === waitLevel) {
        return true;
      }

      waitLevel++;
      var currentWait = evt.slide.querySelector("[data-bespoke-wait=\"" + waitLevel + "\"]");

      while (currentWait) {
        var bespoke_wait = currentWait.getAttribute("data-bespoke-wait");
        if (bespoke_wait && bespoke_wait != waitLevel)
          break;
        currentWait.classList.remove("wait");
        currentWait.classList.add("ready");
        currentWait = currentWait.nextElementSibling;
      }

      return false;
    }

    function hideWaits (evt) {
      waitLevel = 0;

      var wait = evt.slide.querySelector("[data-bespoke-wait]");
      while (wait) {
        wait.classList.add("wait");
        wait.classList.remove("ready");
        wait = wait.nextElementSibling;
      }
    }

    deck.on('next', updateWaits);
    deck.on('activate', hideWaits);
  };

  bespoke.plugins.hash = function(deck) {
    var activeIndex;

    function parseHash() {
      var hash = window.location.hash.slice(1),
      slideNumberOrName = parseInt(hash, 10);

      if (hash) {
        if (slideNumberOrName) {
          activateSlide(slideNumberOrName - 1);
        } else {
          deck.slides.forEach(function(slide, i) {
            slide.getAttribute('data-bespoke-hash') === hash && activateSlide(i);
          });
        }
      }
    }

    function activateSlide(index) {
      if (index !== activeIndex) {
        deck.slide(index);
      }
    }

    setTimeout(function() {
      parseHash();

      deck.on('activate', function(e) {
        var slideName = e.slide.getAttribute('data-bespoke-hash');
        window.location.hash = slideName || e.index + 1;
        activeIndex = e.index;
      });

      window.addEventListener('hashchange', parseHash);
    }, 0);
  };
}(window.bespoke));
