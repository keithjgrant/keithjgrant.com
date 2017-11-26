import {scrollDownTo, scrollRightTo, zoomIn, dropOut} from './transitions';

export default function navigation() {
  document.body.addEventListener('click', function(e) {
    if (!e.target.matches('a')) {
      return;
    }
    if (e.target.origin !== location.origin) {
      return;
    }
    e.preventDefault();
    const url = e.target.href;
    advanceToUrl(url, e.target);
  });
  window.onpopstate = event => {
    backToUrl(document.location.href);
  };
}

async function advanceToUrl(url, clickedEl) {
  try {
    const newContent = await fetchPageContent(url);
    const currentContent = document.querySelector('.js-main');
    currentContent.parentNode.insertBefore(
      newContent,
      currentContent.nextSibling
    );

    history.pushState({}, '', url);
    const effect = getEffect(url);
    effect(currentContent, newContent, clickedEl);
  } catch (e) {
    document.location = url;
  }
}

function getEffect(toUrl) {
  const fromUrl = document.location.href;
  console.log(fromUrl, toUrl);
  return zoomIn;
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
