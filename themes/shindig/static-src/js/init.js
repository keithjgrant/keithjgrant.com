import loadInteractions from './webmentions';
import prism from './prism';

export function initFirstPage() {
  loadInteractions();
  prism.highlightAll();
  loadGSAP();
}

export function initCurrentPage() {
  loadInteractions();
  prism.highlightAll();
  reportAnalyticsPageview();
}

export function cleanupPage(content) {
  const ids = [
    'comments',
    'comments-loader',
    'like-count',
    'likes',
    'share-count',
    'shares',
    'reply-count',
    'replies',
  ];
  ids.forEach(stripId);

  function stripId(id) {
    const element = content.querySelector('#' + id);
    if (element) {
      element.id = '';
    }
  }
}

function reportAnalyticsPageview() {
  if (typeof ga !== 'undefined') {
    ga('set', 'page', document.location.pathname);
    ga('send', 'pageview');
  }
}

function loadGSAP() {
  const script = document.createElement('script');
  script.src = '/js/timelinemax.bundle.js';
  script.async = true;
  document.head.appendChild(script);
}
