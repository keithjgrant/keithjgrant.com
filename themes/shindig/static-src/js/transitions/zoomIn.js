import {removeNode} from '../util/dom';
import {getFlipCoords} from '../util/transitions';

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

  const coords = getFlipCoords(first, last, {
    ease: Power4.easeOut,
  });
  tl.from(newEl, 1.5, coords);
  tl.set(oldEl.parentNode, {minHeight: 'auto'});
  tl.play();
}
