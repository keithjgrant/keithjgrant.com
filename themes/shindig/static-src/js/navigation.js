import selectTransition from './selectTransition';
import {dropOut} from './transitions';

// TODO
let isNavigating = false;

export default function navigation() {
  document.body.addEventListener('click', function(e) {
    if (!e.target.matches('a')) {
      return;
    }
    if (e.target.origin !== location.origin) {
      return;
    }
    e.preventDefault();
    const url = e.target.pathname;
    advanceToUrl(url, e.target);
  });
  window.onpopstate = event => {
    backToUrl(document.location.pathname);
  };
}

async function advanceToUrl(url, clickedEl) {
  // try {
  const newContent = await fetchPageContent(url);
  const currentContent = document.querySelector('.js-main');
  currentContent.parentNode.insertBefore(
    newContent,
    currentContent.nextSibling
  );

  const effect = selectTransition(url);
  history.pushState({}, '', url);
  if (effect) {
    effect(currentContent, newContent, clickedEl);
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
  currentContent.parentNode.insertBefore(
    newContent,
    currentContent.nextSibling
  );
  dropOut(currentContent, newContent);
}

async function fetchPageContent(url) {
  const response = await fetch(url);
  const html = await response.text();
  const content = document.createElement('html');
  content.innerHTML = html;
  return content.querySelector('.js-main');
}
