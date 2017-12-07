import {removeNode} from '../util/dom';
import {getFlipCoords} from '../util/transitions';

export default function zoomIn(oldEl, newEl, link) {
  const scrollAmount = window.pageYOffset;
  const headerHeight = 75;
  const tl = new TimelineLite({
    onComplete: () => {
      removeNode(oldEl);
      TweenLite.set(newEl, {clearProps: 'all'});
      TweenLite.set(newEl.parentNode, {clearProps: 'all'});
    },
  });

  tl.set(oldEl, {position: 'absolute', left: 0, right: 0});
  tl.set(oldEl.parentNode, {minHeight: '100vh'});
  tl.set(newEl, {
    transformOrigin: '0 0',
    maxHeight: '100vh',
    overflow: 'hidden',
    boxShadow: '0 0 0.5em 0.5em rgba(0, 0, 0, 0.1)',
  });

  tl.addLabel('start');
  tl.set(oldEl, {top: scrollAmount * -1 + headerHeight});
  tl.call(() => {
    window.scrollTo(0, 0);
  });

  const first = link.getBoundingClientRect();
  const last = newEl.getBoundingClientRect();
  const coords = getFlipCoords(first, last, {
    ease: Expo.easeInOut,
  });
  tl.from(newEl, 1, coords, 'start');
  tl.from(newEl, 0.5, {opacity: 0, ease: Power1.EaseOut}, 'start');

  tl.play();
}
