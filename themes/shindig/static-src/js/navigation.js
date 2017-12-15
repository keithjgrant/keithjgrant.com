import selectTransition from './selectTransition';
import dropOut from './transitions/dropOut';

// TODO
let isNavigating = false;

export default function navigation() {
  document.body.addEventListener('click', function(e) {
    // TODO: traverse up to [data-href]
    if (!e.target.matches('a') && !e.target.attributes['data-href']) {
      return;
    }
    if (e.target.origin && e.target.origin !== location.origin) {
      return;
    }
    e.preventDefault();
    const url = e.target.pathname || e.target.attributes['data-href'].value;
    advanceToUrl(url, e.target);
  });
  window.onpopstate = event => {
    backToUrl(document.location.pathname);
  };
}

async function advanceToUrl(url, clickedEl) {
  // try {
  // TODO loader?
  const newContent = await fetchPageContent(url);
  const mainContent = document.querySelectorAll('.js-main');
  const currentContent = mainContent[mainContent.length - 1];

  const effect = selectTransition(url);
  history.pushState({title: newContent.title}, '', url);
  document.title = newContent.title;
  if (effect) {
    effect(currentContent, newContent.container, clickedEl);
  } else {
    // document.location = url;
  }
  // } catch (e) {
  //   document.location = url;
  // }
}

async function backToUrl(url) {
  const newContent = await fetchPageContent(url);
  const currentContent = document.querySelector('.js-main');
  document.title = newContent.title;
  currentContent.parentNode.insertBefore(
    newContent.container,
    currentContent.nextSibling
  );
  dropOut(currentContent, newContent.container);
}

async function fetchPageContent(url) {
  const response = await fetch(url);
  const html = await response.text();
  const content = document.createElement('html');
  content.innerHTML = html;
  const title = content.querySelector('title');
  return {
    title: title ? title.innerHTML : 'Keith J. Grant',
    container: content.querySelector('.js-main'),
  };
}
