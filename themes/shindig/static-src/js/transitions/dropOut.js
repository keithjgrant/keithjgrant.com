import {removeNode} from '../util/dom';

export default function dropOut(oldEl, newEl) {
  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
      TweenLite.set(newEl, {clearProps: 'all'});
    },
  });
  tl.set(oldEl, {
    position: 'absolute',
    left: 0,
    right: 0,
    transformOrigin: '50% 0%',
  });
  tl.set(newEl, {
    position: 'relative',
    zIndex: -1,
  });
  tl.set(oldEl.parentNode, {
    perspective: 500,
  });
  tl.call(() => {
    oldEl.parentNode.insertBefore(newEl, oldEl.nextSibling);
  });
  tl.to(oldEl, 0.3, {
    y: 1000,
    z: -1100,
    opacity: 0,
    ease: Power4.easeIn,
  });
  tl.addLabel('ready');
  tl.play();
  return tl;
}
