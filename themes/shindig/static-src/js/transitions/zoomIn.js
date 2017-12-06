import {removeNode} from '../util/dom';

export default function zoomIn(oldEl, newEl, link) {
  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
    },
  });

  const first = link.getBoundingClientRect();
  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.set(newEl, {transformOrigin: '0 0'});
  const last = newEl.getBoundingClientRect();
  const invert = {
    top: first.top - last.top,
    left: first.left - last.left,
    height: first.height / last.height,
    width: first.width / last.width,
  };
  tl.from(newEl, 1.5, {
    x: invert.left,
    y: invert.top,
    scaleX: invert.width,
    scaleY: invert.height,
    ease: Power4.easeOut,
  });
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.play();
}
