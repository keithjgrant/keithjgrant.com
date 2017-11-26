import {scrollDownTo, scrollRightTo} from './transitions';

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
}

async function advanceToUrl(url, clickedEl) {
  const newContent = await fetchPageContent(url);
  const currentContent = document.querySelector('.js-main');
  currentContent.parentNode.insertBefore(
    newContent,
    currentContent.nextSibling
  );

  scrollRightTo(currentContent, newContent);
}

async function fetchPageContent(url) {
  const response = await fetch(url);
  const html = await response.text();
  const content = document.createElement('html');
  content.innerHTML = html;
  return content.querySelector('.js-main');
}
