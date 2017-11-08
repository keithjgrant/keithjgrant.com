export default function bindListeners() {
  document.body.addEventListener('click', function(e) {
    if (!e.target.classList.contains('js-tab')) {
      return;
    }
    console.log('clicked', e.target);
    e.preventDefault();
    console.log(activateTab);
    activateTab(e.target);
    console.log('b');
    return false;
  });
}

function activateTab(button) {
  console.log('ACTIVATING');
  clearActiveTabs();
  activateTab(button);
}

function clearActiveTabs() {
  console.log('CLEARING');
  const tabs = document.querySelectorAll('.tabs > button.is-active');
  const panes = document.querySelectorAll('.tab-pane.is-active');
  clearActiveClasses(tabs);
  clearActiveClasses(panes);
}

function clearActiveClasses(els) {
  console.log('clearing', els);
  Array.prototype.forEach.apply(els, el => {
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
