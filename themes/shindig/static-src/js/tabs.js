export default function bindListeners() {
  document.body.addEventListener('click', function(e) {
    if (!e.target.matches('.js-tab, .js-tab *')) {
      return;
    }
    e.preventDefault();
    clearActiveTabs();
    const button = findButton(e.target);
    activateTab(button);
    return false;
  });
}

function findButton(el) {
  if (el.classList.contains('js-tab')) {
    return el;
  } else {
    return findButton(el.parentNode);
  }
}

function clearActiveTabs() {
  const tabs = document.querySelectorAll('.tabs > button.is-active');
  const panes = document.querySelectorAll('.tab-pane.is-active');
  clearActiveClasses(tabs);
  clearActiveClasses(panes);
}

function clearActiveClasses(els) {
  if (!els.length) {
    return;
  }
  Array.prototype.forEach.call(els, function(el) {
    el.classList.remove('is-active');
  });
}

function activateTab(button) {
  button.classList.add('is-active');
  const pane = getTabPane(button);
  if (pane) {
    pane.classList.add('is-active');
  }
}

function getTabPane(button) {
  const aria = button.attributes['aria-controls'];
  if (!aria) {
    return null;
  }
  return document.getElementById(aria.nodeValue);
}
