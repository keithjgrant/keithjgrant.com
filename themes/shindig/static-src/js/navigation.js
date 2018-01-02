import selectTransition from './selectTransition';
import dropOut from './transitions/dropOut';
import {removeNode} from './util/dom';
import {cleanupPage, initCurrentPage} from './init';

let currentEffect = null;

export default function navigation() {
  document.body.addEventListener('click', function(e) {
    const targetData = getLocalUrl(e.target);
    if (!targetData) {
      return;
    }
    e.preventDefault();
    advanceToUrl(targetData.url, targetData.element);
  });
  window.onpopstate = event => {
    backToUrl(document.location.pathname);
  };
}

async function advanceToUrl(url, clickedEl) {
  clickedEl.classList.add('loading-indicator');
  if (currentEffect) {
    abortTransition(currentEffect);
    currentEffect = null;
  }
  try {
    const newContent = await fetchPageContent(url);
    clickedEl.classList.remove('loading-indicator');
    const mainContent = document.querySelectorAll('.js-main');
    const currentContent = mainContent[mainContent.length - 1];
    if (mainContent.length > 1) {
      for (let i = 0; i < mainContent.length - 1; i++) {
        removeNode(mainContent[i]);
      }
    }

    const effect = selectTransition(url);
    history.pushState({title: newContent.title}, '', url);
    document.title = newContent.title;
    if (effect === 'NONE') {
      return;
    }
    if (effect) {
      cleanupPage(currentContent);
      currentEffect = effect(currentContent, newContent.container, clickedEl);
      if (currentEffect) {
        currentEffect.call(initCurrentPage, null, null, 'ready');
        currentEffect.call(() => {
          currentEffect = null;
        });
      }
    } else {
      document.location = url;
    }
  } catch (e) {
    console.error(e);
    document.location = url;
  }
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

function abortTransition(tl) {
  tl.progress(1.0);
}

function getLocalUrl(target) {
  if (target.matches('a') && target.origin === location.origin) {
    return {
      url: target.pathname,
      element: target,
    };
  }
  const el = traverseUpToHref(target);
  if (el) {
    const href = el.attributes['data-href'].value;
    return {
      url: href.replace(window.location.origin, ''),
      element: el,
    };
  }
  return null;
}

function traverseUpToHref(element) {
  if (element.attributes['data-href']) {
    return element;
  }
  if (element.tagName === 'BODY') {
    return null;
  }
  return traverseUpToHref(element.parentNode);
}
