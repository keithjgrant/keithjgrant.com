import loadInteractions from './webmentions';
import prism from './prism';

export function initCurrentPage() {
  loadInteractions();
  prism.highlightAll();
}

export function cleanupPage(content) {
  // remove 'comments' ID so new content w/ comments can be added to page
  const comments = content.querySelector('#comments');
  if (comments) {
    comments.id = '';
  }
}
