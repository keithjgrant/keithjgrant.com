(function () {

  function each(els, fn) {
    Array.prototype.forEach.call(els, fn);
  }

  var tabButtons = document.querySelectorAll('.tabs > button');
  var tabPanes = document.querySelectorAll('.tab-pane');

  function clearActiveTab() {
    each(tabButtons, function (b) {
      b.classList.remove('is-active');
    });
    each(tabPanes, function (p) {
      p.classList.remove('is-active');
    });
  }

  each(tabButtons, function(button) {
    button.addEventListener('click', function (e) {
      var paneId = e.target.getAttribute('aria-controls');
      if (!paneId) { return; }
      clearActiveTab();
      e.target.classList.add('is-active');
      var pane = document.getElementById(paneId);
      pane.classList.add('is-active');
    });
  });

  // fake loading
  setTimeout(function () {
    document.getElementById('comments-loader').classList.add('is-hidden');
    document.getElementById('comments-pane').classList.remove('is-hidden');
  }, 1000);

  // webmention form
  var submit = document.getElementById('webmention-submit');
  submit.addEventListener('click', function (e) {
    if (!self.fetch || !FormData) {
      // allow form to POST itself
      return;
    }
    e.preventDefault();
    var form = document.getElementById('webmention-form');
    var data = new FormData(form);
    fetch(form.action, {
      method: "POST",
      body: data
    }).then(function (response) {
      return response.blob();
    }).then(function () {
      var inputs = form.querySelectorAll('.inline-form__inputs')[0];
      var alert = form.querySelectorAll('.form-alert')[0];
      alert.innerHTML = 'Thanks! Your reply should be added shortly.';
      inputs.classList.add('is-hidden');
      alert.classList.remove('is-hidden');
    }).catch(function (err) {
      var alert = form.querySelectorAll('.form-alert')[0];
      alert.innerHTML = 'There seems to be a problem sending. Please try again later.';
      alert.classList.remove('is-hidden');
    });
  });

}());
