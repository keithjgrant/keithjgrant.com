import loadInteractions from './webmentions';
import prism from './prism';

export function initFirstPage() {
  loadInteractions();
  prism.highlightAll();
}

export function initCurrentPage() {
  loadInteractions();
  prism.highlightAll();
  reportAnalyticsPageview();
}

export function cleanupPage(content) {
  // remove 'comments' ID so new content w/ comments can be added to page
  const comments = content.querySelector('#comments');
  if (comments) {
    comments.id = '';
  }
}

function reportAnalyticsPageview() {
  if (typeof ga !== 'undefined') {
    ga('set', 'page', document.location.pathname);
    ga('send', 'pageview');
  }
}
