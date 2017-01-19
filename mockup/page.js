(function () {

  function each(els, fn) {
    Array.prototype.forEach.call(els, fn);
  }

  var tabButtons = document.querySelectorAll('.tabs > button');
  var tabPanes = document.querySelectorAll('.tab-pane');

  function clearActive() {
    each(tabButtons, function (b) {
      b.classList.remove('is-active');
    });
    each(tabPanes, function (p) {
      p.classList.remove('is-active');
    });
  }

  each(tabButtons, function(button) {
    button.addEventListener('click', function (e) {
      clearActive();
      e.target.classList.add('is-active');
      var paneId = e.target.getAttribute('aria-controls');
      var pane = document.getElementById(paneId);
      pane.classList.add('is-active');
    });
  });

}());
