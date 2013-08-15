(function () {
  window.addEventListener("load", function () {
    var marks = document.getElementsByTagName("mark");

    for (var i = 0, l = marks.length; i < l; i++) {
      var el = marks[i];
      var text = document.createElement("span");
      text.innerHTML = el.innerHTML;
      el.innerHTML = "";
      el.appendChild(text);
    }
  });
}());
