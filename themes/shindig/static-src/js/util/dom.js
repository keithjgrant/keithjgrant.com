export function removeNode(el) {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
}

export function cloneBackground(el) {
  const bg = document.createElement('div');
  bg.className = el.className.replace('js-main', 'js-bg');
  return bg;
}
